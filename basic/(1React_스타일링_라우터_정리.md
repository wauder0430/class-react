# React 스타일링 + 라우터 정리

CSS 적용 4가지 방법 + React Router 기초 ~ 중첩 라우팅 (main16 ~ main19)

---

## 1. React CSS 스타일링 방법 (main16)

React에서 CSS를 적용하는 4가지 방법

| 방법 | 범위 | 특징 |
|------|------|------|
| **인라인 스타일** | 지역 | style 속성에 객체 전달, 동적 적용에 유용 |
| **일반 CSS 파일** | 전역 | `import './style.css'`, 모든 컴포넌트에 영향 |
| **CSS Module** | 지역 | `*.module.css`, 클래스명 자동 해싱으로 충돌 방지 |
| **styled-components** | 지역 | CSS-in-JS, 컴포넌트 단위로 스타일 캡슐화 |

### 1. 인라인 스타일

```jsx
function App() {
  const style = {
    color: 'blue',
    'font-size': '2rem'   // 또는 fontSize: '2rem'
  };

  return (
    <>
      <div style={style}>내용입니다.</div>
      <div style={{ color: 'red' }}>내용입니다.</div>
    </>
  );
}
```

### 2. 일반 CSS 파일의 문제점

```jsx
// 문제: 외부 .css 파일은 어떤 컴포넌트에 import하든 전역으로 적용됨
// → React는 SPA(1장 HTML) → 모든 컴포넌트에 동일한 CSS가 적용

import './style1.css';

function ComponentA() {
  return <div className="title">ComponentA</div>;
  // ComponentB에도 .title 스타일이 적용됨 → 충돌 위험!
}
```

### 3. CSS Module

```jsx
// ComponentC.module.css 파일 생성
// .title { color: tomato; }

import styles from './ComponentC.module.css';

function ComponentC() {
  // 빌드 시 .title → .ComponentC_title__abc123 처럼 고유하게 변환됨
  return <div className={styles.title}>ComponentC</div>;
}
// → 다른 컴포넌트의 .title과 절대 충돌하지 않음
```

### 4. styled-components (CSS-in-JS)

```bash
# 설치
npm install styled-components
```

```jsx
import styled from 'styled-components';

// 1. 스타일 컴포넌트 생성 (변수명은 반드시 대문자)
const Header = styled.h2`
  color: tomato;
  font-size: 3rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  /* props로 동적 스타일 */
  background-color: ${props => props.type === 'primary' ? 'tomato' : 'orange'};
  color: ${props => props.type === 'primary' ? 'white' : 'black'};
`;

// 2. 기존 스타일 컴포넌트 상속
const TestButton = styled(Button)`
  box-shadow: 3px 3px 3px gray;
`;

// 3. state와 연동한 동적 스타일
const ToggleButton = styled.button`
  background-color: ${props => props.active ? 'blue' : 'gray'};
`;

function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Header>CSS-in-JS</Header>
      <Button type="primary">중요한 버튼</Button>
      <Button>일반 버튼</Button>
      <TestButton type="primary">상속 버튼</TestButton>

      {/* state와 연동 */}
      <ToggleButton active={active}>
        {active ? '활성' : '비활성'}
      </ToggleButton>
      <button onClick={() => setActive(!active)}>상태변경</button>
    </>
  );
}
```

---

## 2. React Router — 기본 라우팅 (main17)

**React Router**: React SPA에서 URL에 따라 다른 컴포넌트를 보여주는 라이브러리

| 전통 방식 (JSP/Spring) | React Router 방식 |
|----------------------|------------------|
| URL 변경 → 서버 요청 → 새 HTML 로딩 | URL 변경 → 서버 요청 없음 → 컴포넌트 교체 |
| 새로고침 발생 | 새로고침 없음 |

```bash
# 설치
npm install react-router-dom
```

### 핵심 컴포넌트

| 컴포넌트 | 역할 |
|----------|------|
| `<BrowserRouter>` | 라우팅 시스템 전체 틀, `<Link>`와 `<Routes>` 모두 감싸야 함 |
| `<Routes>` | `<Route>` 목록의 컨테이너, 현재 URL과 일치하는 Route 1개만 렌더링 |
| `<Route>` | 특정 path와 컴포넌트를 1:1 매핑 |
| `<Link>` | 클릭 시 컴포넌트 교체 (새로고침 없음), `<a>` 태그 래핑 |
| `<NavLink>` | `<Link>` + 현재 활성 경로 스타일 적용 기능 |

```jsx
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';

function Home()    { return <h3>Home Page</h3>; }
function About()   { return <h3>About Page</h3>; }
function Contact() { return <h3>Contact Page</h3>; }
function NotFound(){ return <h3>404 Not Found</h3>; }

function App() {
  const activeStyle = { color: 'tomato', fontWeight: 'bold' };

  return (
    <BrowserRouter>
      <nav>
        {/* NavLink: 현재 활성 경로에 스타일 적용 */}
        <NavLink to="/"       style={({ isActive }) => isActive ? activeStyle : undefined}>Home</NavLink>
        <NavLink to="/about"  style={({ isActive }) => isActive ? activeStyle : undefined}>About</NavLink>
        <NavLink to="/contact"style={({ isActive }) => isActive ? activeStyle : undefined}>Contact</NavLink>
      </nav>
      <hr />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* path="*": 위 경로 모두 불일치 시 → Fallback Route */}
        <Route path="*"        element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### URL 파라미터 (useParams)

```jsx
// /user/1, /user/2 처럼 동적 경로 처리
function User() {
  const { id } = useParams(); // URL의 :id 값 추출

  // 실제 상황: id로 fetch API 호출 → DB에서 데이터 조회

  return <p>회원 번호: {id}</p>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Base />} />
        <Route path="/user/:id" element={<User />} />  {/* :id = URL 파라미터 */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 3. React Router — 중첩 라우팅 (main18 / main19)

### 기본 라우팅 복습 (main18)

```jsx
function App() {
  return (
    // BrowserRouter: <Link>와 <Routes> 모두 감싸는 컨테이너 (필수)
    <BrowserRouter>
      <nav>
        <Link to="/">시작</Link> | 
        <Link to="/member">회원</Link> | 
        <Link to="/admin">관리자</Link>
      </nav>
      <hr />
      {/* 
        <Routes>는 URL에 매칭되는 <Route> 최대 1개만 렌더링
        - http://localhost:5173/        → Home 컴포넌트
        - http://localhost:5173/member  → Member 컴포넌트
      */}
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/admin"  element={<Admin />} />
        <Route path="*"       element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 중첩 라우팅 + Outlet (main19)

계층 구조의 URL 관리 → 부모 Route 안에 자식 Route 중첩

```
/board          → BoardList (목록)
/board/add      → BoardAdd  (글쓰기)
/board/view/1   → BoardView (상세보기)
```

```jsx
import { Outlet } from 'react-router-dom';

// 부모 컴포넌트: 공통 레이아웃 + <Outlet>으로 자식 컴포넌트 위치 지정
function Board() {
  return (
    <>
      <h3>게시판</h3>
      <p>이 게시판은 올해까지만 운영합니다.</p>
      {/* <Outlet>: 자식 Route가 렌더링될 자리 */}
      <Outlet />
    </>
  );
}

function BoardView() {
  const { seq } = useParams(); // /board/view/:seq 에서 seq 추출
  return <p>게시글 번호: {seq}</p>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/member" element={<Member />} />

        {/* 중첩 라우팅 */}
        <Route path="/board" element={<Board />}>
          {/* index: /board 접근 시 기본으로 렌더링 */}
          <Route index          element={<BoardList />} />
          <Route path="add"     element={<BoardAdd />} />
          <Route path="view/:seq" element={<BoardView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

| 방식 | 권장 여부 |
|------|----------|
| 모든 경로를 flat하게 나열 (`/board`, `/board/add`, ...) | ⚠️ 비추천 |
| 중첩 Route + `<Outlet>` | ✅ 권장 |

---

## 📚 학습 순서

### 1️⃣ CSS 스타일링 (main16)
- 인라인 스타일 객체 작성법
- 일반 CSS 파일의 전역 오염 문제 이해
- CSS Module로 지역 스코프 해결
- styled-components 설치 및 동적 스타일

### 2️⃣ React Router 기초 (main17)
- BrowserRouter / Routes / Route / Link 구조 이해
- NavLink로 활성 메뉴 스타일 적용
- useParams로 URL 파라미터 추출
- path="*" Fallback Route

### 3️⃣ 라우터 심화 (main18~19)
- BrowserRouter 위치 규칙 재확인
- 중첩 Route 구조 설계
- Outlet으로 자식 컴포넌트 렌더링 위치 지정

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **인라인 스타일** | style 속성에 객체 전달, camelCase 사용 |
| **CSS Module** | `*.module.css` → 클래스명 자동 해싱, 충돌 방지 |
| **styled-components** | CSS-in-JS, props로 동적 스타일 가능 |
| **BrowserRouter** | Link와 Routes 모두 감싸야 함 |
| **Routes** | URL 일치하는 Route 1개만 렌더링 |
| **Link vs NavLink** | NavLink는 isActive로 활성 스타일 적용 가능 |
| **useParams** | `:id` 형태의 URL 파라미터 값 추출 |
| **중첩 Route** | 부모 Route 안에 자식 Route 중첩 + Outlet 필수 |
| **index Route** | 부모 path 접근 시 기본으로 렌더링되는 자식 Route |
| **path="*"** | 모든 경로 불일치 시 실행되는 Fallback Route |

---

## 📌 자주 하는 실수

### ❌ 실수 1: BrowserRouter 위치 오류
```jsx
// 잘못된 예 - Link가 BrowserRouter 밖에 있음
<Link to="/">홈</Link>
<BrowserRouter>
  <Routes>...</Routes>
</BrowserRouter>

// 올바른 예
<BrowserRouter>
  <Link to="/">홈</Link>
  <Routes>...</Routes>
</BrowserRouter>
```

### ❌ 실수 2: styled-components에 소문자 변수명 사용
```jsx
// 잘못된 예 - 소문자로 시작하면 HTML 태그로 인식
const myButton = styled.button`...`; // ❌

// 올바른 예
const MyButton = styled.button`...`; // ✅ PascalCase
```

### ❌ 실수 3: Outlet 없이 중첩 Route 사용
```jsx
// 잘못된 예 - 부모 컴포넌트에 <Outlet> 없으면 자식 Route가 렌더링 안됨
function Board() {
  return <h3>게시판</h3>; // ❌ Outlet 없음
}

// 올바른 예
function Board() {
  return (
    <>
      <h3>게시판</h3>
      <Outlet /> {/* ✅ 자식 Route 렌더링 위치 */}
    </>
  );
}
```

### ❌ 실수 4: Link 대신 a 태그 사용
```jsx
// 잘못된 예 - a 태그는 페이지 새로고침 발생
<a href="/about">About</a> // ❌

// 올바른 예
<Link to="/about">About</Link> // ✅ 새로고침 없이 컴포넌트 교체
```

---

## 📖 참고 자료

- **React Router 공식 문서**: https://reactrouter.com
- **styled-components 공식 문서**: https://styled-components.com
