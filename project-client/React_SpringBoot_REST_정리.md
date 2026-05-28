# Spring Boot REST + React 연동 정리

Spring Boot REST API 서버 + React 클라이언트 SPA 구성 — 세션 기반 인증 + 게시판 CRUD

---

## 1. 프로젝트 구조

```
[project-server]  Spring Boot (포트 8080)
  └─ REST API 서버 역할
  └─ DB: Oracle + JPA
  └─ 인증: Spring Security (세션 방식)

[project-client]  React + Vite (포트 5173)
  └─ SPA 클라이언트 역할
  └─ fetch로 서버에 비동기 요청
  └─ react-router-dom으로 페이지 라우팅
```

| 구분 | 기존 MPA 방식 | 현재 SPA 방식 |
|------|------------|-------------|
| **클라이언트** | Thymeleaf / JSP | React |
| **서버 컨트롤러** | `@Controller` + View 반환 | `@RestController` + JSON 반환 |
| **페이지 이동** | 서버 redirect | React Router 컴포넌트 교체 |
| **데이터 전송** | 폼 submit (MPA) | fetch / axios (비동기) |
| **로그인** | 스프링 시큐리티 폼 로그인 | JSON POST + 세션 쿠키 |

---

## 2. 서버 — 프로젝트 설정

### build.gradle 의존성

```
- Spring Web
- Oracle Driver
- Spring Data JPA
- Lombok
- Spring Security
- Spring Boot DevTools
```

### application.yml (공통 설정)

```yaml
spring:
  application:
    name: project-server
  profiles:
    active: dev        # application-dev.yml 활성화

  jpa:
    database: oracle
    hibernate:
      ddl-auto: none   # 테이블 자동 생성 없음 → script.sql로 직접 생성
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: true
```

### application-dev.yml (개발 환경)

```yaml
spring:
  datasource:
    driver-class-name: oracle.jdbc.OracleDriver
    url: jdbc:oracle:thin:@localhost:1521/XE
    username: springboot
    password: java1234
```

---

## 3. 서버 — DB 설계 (script.sql)

```sql
-- 회원 테이블
CREATE TABLE tblUser (
    username VARCHAR2(50)  PRIMARY KEY,  -- 아이디
    password VARCHAR2(100) NOT NULL,     -- BCrypt 암호화 암호
    role     VARCHAR2(50)  NOT NULL,     -- ROLE_MEMBER / ROLE_ADMIN
    name     VARCHAR2(50)  NOT NULL,     -- 이름
    email    VARCHAR2(100) NOT NULL      -- 이메일
);

-- 게시판 테이블
CREATE TABLE tblBoard (
    seq      NUMBER        PRIMARY KEY,
    subject  VARCHAR2(500) NOT NULL,
    content  VARCHAR2(4000) NOT NULL,
    regdate  DATE DEFAULT SYSDATE NOT NULL,
    username VARCHAR2(50)  NOT NULL REFERENCES tblUser(username)  -- FK
);

CREATE SEQUENCE seqBoard;
```

---

## 4. 서버 — Entity / DTO / Repository

### Entity

```java
// User.java
@Entity @Table(name = "tblUser")
@Getter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @Column(length = 50)
    private String username;
    private String password; // BCrypt 암호화 저장
    private String role;     // ROLE_MEMBER / ROLE_ADMIN
    private String name;
    private String email;
}

// Board.java
@Entity @Table(name = "tblBoard")
@Getter @NoArgsConstructor @AllArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seqBoard")
    @SequenceGenerator(name = "seqBoard", sequenceName = "seqBoard", allocationSize = 1)
    private Long seq;

    @Column(nullable = false, length = 500)
    private String subject;

    @Column(nullable = false, length = 4000)
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime regdate;

    // FK → 부모 엔티티 직접 참조 (JPA 방식)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", nullable = false)
    private User user;
}
```

### DTO

```java
// BoardDto.java - Entity ↔ DTO 변환 담당
public class BoardDto {
    private Long seq;
    private String subject;
    private String content;
    private LocalDateTime regdate;
    private String username;

    // Entity → DTO
    public static BoardDto fromEntity(Board board) { ... }

    // DTO → Entity (글쓰기 요청 처리 시 사용)
    public Board toEntity() { ... }
}
```

### Repository

```java
// JpaRepository 상속만으로 CRUD + 페이징 자동 제공
public interface UserRepository  extends JpaRepository<User, String> {}
public interface BoardRepository extends JpaRepository<Board, Long> {}
```

---

## 5. 서버 — Spring Security 설정 (SecurityConfig.java)

React + REST API 방식에 맞게 기존 폼 로그인 방식에서 변경

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http.csrf(csrf -> csrf.disable());   // REST API → CSRF 비활성화
    http.cors(cors -> {});               // CORS 활성화 (아래 Bean 참조)
    http.formLogin(form -> form.disable()); // 폼 로그인 비활성화 (JSON 로그인 사용)

    // URL별 접근 권한
    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/", "/login", "/loginok").permitAll()   // 공개
        .requestMatchers("/board", "/board/list", "/board/view").permitAll()
        .requestMatchers("/member").hasAnyRole("MEMBER", "ADMIN") // 회원 전용
        .requestMatchers("/admin").hasRole("ADMIN")               // 관리자 전용
        .requestMatchers("/board/add", "/board/del").hasAnyRole("MEMBER", "ADMIN")
        .anyRequest().authenticated()
    );

    // 로그아웃: React에서 GET /logout 요청 시 세션 제거 + JSON 응답
    http.logout(logout -> logout
        .logoutUrl("/logout")
        .logoutSuccessHandler((req, res, auth) -> {
            res.setStatus(200);
            res.setContentType("application/json;charset=UTF-8");
            res.getWriter().print("{\"result\":\"logout\"}");
        })
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID")
    );

    // 인증 실패 → 401 JSON 응답 (기존 redirect 대신)
    http.exceptionHandling(e -> e
        .authenticationEntryPoint((req, res, ex) -> {
            res.setStatus(401);
            res.getWriter().print("{\"error\":\"unauthorized\"}");
        })
        // 권한 없음 → 403 JSON 응답
        .accessDeniedHandler((req, res, ex) -> {
            res.setStatus(403);
            res.getWriter().print("{\"error\":\"forbidden\"}");
        })
    );

    return http.build();
}
```

### CORS 설정 — React ↔ Spring Boot 연동의 핵심

```java
@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    // React 개발 서버 Origin 허용
    // credentials 사용 시 "*" 사용 불가 → 명시적으로 지정 필수
    config.setAllowedOrigins(List.of("http://localhost:5173"));

    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));

    // 쿠키/세션 포함 요청 허용
    // ← React fetch의 credentials: "include" 와 반드시 세트로 설정
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

---

## 6. 서버 — REST API 목록

### 회원 API (MemberController)

| 메서드 | URL | 인증 | 설명 |
|--------|-----|------|------|
| GET | `/` | 누구나 | 시작 페이지 확인 |
| GET | `/login` | 누구나 | 로그인 페이지 확인 |
| **POST** | `/loginok` | 누구나 | **JSON 로그인 처리** |
| GET | `/member` | MEMBER / ADMIN | 회원 전용 정보 |
| GET | `/admin` | ADMIN | 관리자 전용 |
| GET | `/logout` | 인증된 사용자 | 로그아웃 + 세션 제거 |

### 게시판 API (BoardController)

| 메서드 | URL | 인증 | 설명 |
|--------|-----|------|------|
| GET | `/board/list` | 누구나 | 게시글 전체 목록 (최신순) |
| GET | `/board/view?seq=1` | 누구나 | 게시글 상세보기 |
| **POST** | `/board/add` | MEMBER / ADMIN | 게시글 작성 |
| GET | `/board/delete?seq=1` | MEMBER / ADMIN | 게시글 삭제 |

---

## 7. 서버 — 컨트롤러 상세

### 로그인 처리 (POST /loginok)

```java
@PostMapping("/loginok")
public ResponseEntity<Map<String,Object>> loginok(
    @RequestBody LoginRequest loginRequest,
    HttpServletRequest request
) {
    User user = userRepository.findById(loginRequest.getUsername()).orElse(null);

    // 인증 실패 → 401
    if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("error", "bad_credentials"));
    }

    // 인증 객체 생성 + Spring Security 컨텍스트에 등록
    Authentication authentication = new UsernamePasswordAuthenticationToken(
        user.getUsername(), null,
        List.of(new SimpleGrantedAuthority(user.getRole()))
    );
    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
    securityContext.setAuthentication(authentication);
    SecurityContextHolder.setContext(securityContext);

    // 세션에 인증 정보 저장 → 이후 요청에서 JSESSIONID 쿠키로 인증 유지
    request.getSession(true).setAttribute(
        HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
        securityContext
    );

    return ResponseEntity.ok(Map.of(
        "result", "login",
        "username", user.getUsername(),
        "role", user.getRole()
    ));
}
```

### 게시글 목록 (GET /board/list)

```java
@GetMapping("/board/list")
public ResponseEntity<Map<String,Object>> list() {
    // 최신순 정렬 → Stream으로 Map 변환 (Entity 직접 노출 방지)
    List<Map<String,Object>> list = boardRepository
        .findAll(Sort.by(Sort.Direction.DESC, "seq"))
        .stream()
        .map(this::toResponse)
        .toList();

    return ResponseEntity.ok(Map.of("result", "ok", "list", list));
}
```

### 게시글 작성 (POST /board/add)

```java
@PostMapping("/board/add")
public ResponseEntity<Map<String,Object>> add(
    @RequestBody BoardDto dto,
    Authentication authentication  // 인증된 사용자 정보
) {
    Board board = dto.toEntity();
    Board saved = boardRepository.save(board);

    // 201 Created 반환
    return ResponseEntity.status(HttpStatus.CREATED)
                         .body(Map.of("result", "ok", "board", toResponse(saved)));
}
```

### HTTP 상태 코드 정리

| 상태 코드 | 의미 | 사용 시점 |
|----------|------|---------|
| **200 OK** | 성공 | 일반 조회/처리 성공 |
| **201 Created** | 생성 성공 | POST로 새 리소스 생성 시 |
| **401 Unauthorized** | 인증 실패 | 로그인 실패, 미인증 접근 |
| **403 Forbidden** | 권한 없음 | 인증은 됐지만 권한 부족 |
| **404 Not Found** | 리소스 없음 | 없는 게시글 조회/삭제 시 |

---

## 8. REST API 테스트 (test.http)

```http
@host = http://localhost:8080

### 로그인
POST {{host}}/loginok
Content-Type: application/json

{ "username": "hong", "password": "1111" }

### 회원 전용 페이지 (로그인 후 쿠키 자동 포함)
GET {{host}}/member

### 게시글 목록
GET {{host}}/board/list

### 게시글 작성
POST {{host}}/board/add
Content-Type: application/json

{ "subject": "제목입니다.", "content": "내용입니다.", "username": "hong" }

### 게시글 상세보기
GET {{host}}/board/view?seq=1

### 게시글 삭제
GET {{host}}/board/delete?seq=3

### 로그아웃
GET {{host}}/logout
```

---

## 9. 클라이언트 — 프로젝트 설정

### package.json 주요 의존성

```json
{
  "dependencies": {
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-router-dom": "^7.x"
  }
}
```

### 진입점 구조

```jsx
// main.jsx - 앱 시작점
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// app.jsx - 라우터 + 전체 레이아웃
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Project <small>Spring Boot + React</small></h1>
      {/* 여기에 BrowserRouter + Routes 구성 예정 */}
    </>
  );
}
export default App;
```

---

## 10. 클라이언트 — fetch 통신 패턴

React에서 Spring Boot REST API를 호출하는 핵심 패턴들

### 기본 GET 요청

```jsx
async function loadList() {
  const res = await fetch('http://localhost:8080/board/list');
  const data = await res.json();
  setList(data.list);
}

useEffect(() => {
  loadList();
}, []);
```

### 로그인 — POST + JSON + credentials

```jsx
async function login(username, password) {
  const res = await fetch('http://localhost:8080/loginok', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),

    // ★ 세션 쿠키(JSESSIONID)를 자동으로 포함/저장
    // → SecurityConfig의 setAllowCredentials(true) 와 반드시 세트
    credentials: 'include'
  });

  const data = await res.json();

  if (res.ok) {
    // 로그인 성공 → { result: 'login', username: '...', role: '...' }
    console.log('로그인 성공:', data.username);
  } else {
    // 401 → { error: 'bad_credentials' }
    console.log('로그인 실패');
  }
}
```

### 인증이 필요한 요청 — credentials 포함

```jsx
// 로그인 후 JSESSIONID 쿠키가 자동으로 포함됨
async function loadMemberPage() {
  const res = await fetch('http://localhost:8080/member', {
    credentials: 'include'  // ★ 세션 쿠키 포함
  });

  if (res.status === 401) {
    // 인증 안된 상태 → 로그인 페이지로 이동
    navigate('/login');
    return;
  }

  const data = await res.json();
}
```

### 게시글 작성 — POST + JSON + 인증

```jsx
async function addBoard(subject, content, username) {
  const res = await fetch('http://localhost:8080/board/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, content, username }),
    credentials: 'include'
  });

  if (res.status === 201) {
    // 작성 성공
    navigate('/board');
  } else if (res.status === 401) {
    navigate('/login');
  }
}
```

### 로그아웃

```jsx
async function logout() {
  await fetch('http://localhost:8080/logout', {
    credentials: 'include'  // 세션 쿠키 포함해야 서버에서 세션 삭제 가능
  });
  // 로그아웃 후 홈으로 이동
  navigate('/');
}
```

---

## 11. 클라이언트 — 예상 라우팅 구조

```jsx
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link> | 
        <Link to="/login">로그인</Link> | 
        <Link to="/member">회원</Link> | 
        <Link to="/board">게시판</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/member"     element={<Member />} />
        <Route path="/board"      element={<Board />}>
          <Route index            element={<BoardList />} />
          <Route path="add"       element={<BoardAdd />} />
          <Route path="view/:seq" element={<BoardView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 📚 전체 흐름 요약

```
[React 클라이언트]                    [Spring Boot 서버]

1. 로그인 폼 입력
   POST /loginok (JSON)  ──────────→  사용자 인증
   { username, password }             BCrypt 비교
                         ←──────────  200 OK + JSESSIONID 쿠키 발급
                                      { result: 'login', username, role }

2. 회원 전용 페이지 요청
   GET /member           ──────────→  JSESSIONID 검증
   (쿠키 자동 포함)                    Security 통과 여부 확인
                         ←──────────  200: { username, name, email }
                                      401: { error: 'unauthorized' }

3. 게시글 작성
   POST /board/add       ──────────→  인증 확인 + DB 저장
   (JSON + 쿠키)                      JPA save()
                         ←──────────  201 Created + 저장된 게시글

4. 로그아웃
   GET /logout           ──────────→  세션 무효화 + JSESSIONID 삭제
                         ←──────────  200 { result: 'logout' }
```

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **@RestController** | JSON 자동 반환, `@Controller` + `@ResponseBody` 합친 것 |
| **ResponseEntity** | 응답 데이터 + HTTP 상태 코드 함께 반환 |
| **CORS 설정** | `setAllowedOrigins(5173포트)` + `setAllowCredentials(true)` 필수 |
| **credentials: 'include'** | fetch에서 쿠키/세션 포함 요청, CORS 허용 Origin과 세트 |
| **JSON 로그인** | 폼 로그인 비활성화 + `@RequestBody`로 JSON 수신 + 직접 세션 저장 |
| **세션 기반 인증** | 로그인 후 JSESSIONID 쿠키로 이후 요청 인증 유지 |
| **401 처리** | authenticationEntryPoint → redirect 대신 JSON 응답 |
| **403 처리** | accessDeniedHandler → redirect 대신 JSON 응답 |
| **DTO 변환** | Entity 직접 노출 금지 → DTO/Map으로 변환 후 반환 |
| **불변성** | React state 수정 시 항상 새 객체/배열 생성 (Spread 활용) |

---

## 📌 자주 하는 실수

### ❌ 실수 1: fetch에 credentials 빠뜨리기
```jsx
// 잘못된 예 - 세션 쿠키가 포함되지 않아 401 발생
const res = await fetch('http://localhost:8080/member'); // ❌

// 올바른 예
const res = await fetch('http://localhost:8080/member', {
  credentials: 'include' // ✅ JSESSIONID 쿠키 자동 포함
});
```

### ❌ 실수 2: CORS 설정에서 AllowCredentials + "*" 조합
```java
// 잘못된 예 - credentials와 "*"는 함께 사용 불가
config.setAllowedOrigins(List.of("*")); // ❌ CORS 오류 발생
config.setAllowCredentials(true);

// 올바른 예
config.setAllowedOrigins(List.of("http://localhost:5173")); // ✅ 명시적 지정
config.setAllowCredentials(true);
```

### ❌ 실수 3: POST 요청에 Content-Type 누락
```jsx
// 잘못된 예 - Content-Type 없으면 서버가 JSON 파싱 못함
const res = await fetch('/loginok', {
  method: 'POST',
  body: JSON.stringify({ username, password }) // ❌ Content-Type 없음
});

// 올바른 예
const res = await fetch('/loginok', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }, // ✅
  body: JSON.stringify({ username, password }),
  credentials: 'include'
});
```

### ❌ 실수 4: 인증 실패를 HTTP 상태 코드로 구분하지 않음
```jsx
// 잘못된 예 - 모든 응답을 성공으로 처리
const data = await res.json(); // ❌ 401이어도 그냥 처리

// 올바른 예 - 상태 코드별 분기
if (res.status === 401) navigate('/login');
else if (res.status === 403) alert('권한이 없습니다.');
else if (res.ok) setData(data);
```

### ❌ 실수 5: useEffect 의존성 배열 누락으로 무한 fetch
```jsx
// 잘못된 예 - 매 렌더링마다 fetch 호출
useEffect(() => {
  fetch('/board/list').then(...);
}); // ❌ 의존성 배열 없음

// 올바른 예
useEffect(() => {
  fetch('/board/list').then(...);
}, []); // ✅ 최초 1회만
```

---

## 📖 참고 자료

- **Spring Boot 공식 문서**: https://spring.io/projects/spring-boot
- **Spring Security 공식 문서**: https://spring.io/projects/spring-security
- **React Router 공식 문서**: https://reactrouter.com
- **MDN — fetch API**: https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
- **MDN — CORS**: https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
