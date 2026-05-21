# React 01 — JSX와 컴포넌트

JSX 문법, 함수형 컴포넌트, 표현식, 속성, 제어문 (main01~06)

---

## 1. JSX란?

**JSX (JavaScript XML)**: JavaScript 코드 영역에서 HTML을 직접 작성할 수 있게 해주는 React 전용 표현식

| 항목 | 설명 |
|------|------|
| **목적** | 리액트 엘리먼트를 생성하는 React만의 표현식 |
| **기반** | XML 문법 → HTML보다 엄격함 |
| **필수 여부** | 사실상 필수 (없으면 React.createElement 직접 작성) |

### JSX를 쓰는 이유

- ✅ 컴포넌트 재사용
- ✅ JavaScript 텍스트 보간법 지원 (`{}`)
- ✅ 자동 XSS 방어 (자동 이스케이프)
- ✅ 컴파일 시 타입 오류 체크
- ✅ 함수형 프로그래밍 방식 지원

```jsx
// JSX 없이 (React.createElement 직접 사용)
const app = React.createElement('h1', {}, "Hello JSX!!!");

// JSX 사용 (동일한 결과, 훨씬 직관적)
const app = <h1>Hello JSX!!</h1>;

createRoot(document.getElementById('root')).render(app);
```

---

## 2. JSX 문법 규칙

### 루트 태그 규칙

```jsx
// ❌ 에러 - 부모 요소 없이 여러 태그 나열 불가
const app = <h2>Hello</h2><p>안녕</p>;

// ✅ 하나의 부모로 감싸야 함
const app = <div><h2>Hello</h2><p>안녕</p></div>;
```

### Fragment — 불필요한 DOM 태그 없이 감싸기

| 방법 | 특징 |
|------|------|
| `<div>` | 실제 DOM에 div 태그가 생성됨 |
| `<>...</>` | import 불필요, **map()에서 key 사용 불가** |
| `<React.Fragment>` | import 필요, **map()에서 key 사용 가능** |

```jsx
// Short Fragment (대부분 상황에서 추천)
const app = (
  <>
    <h2>Hello JSX</h2>
    <p>안녕하세요.</p>
  </>
);

// React.Fragment (map()에서 key가 필요할 때)
const app = (
  <React.Fragment>
    <h2>Hello JSX</h2>
    <p>안녕하세요.</p>
  </React.Fragment>
);
```

---

## 3. 함수형 컴포넌트

**컴포넌트**: 데이터와 화면을 묶은 독립적이고 재사용 가능한 UI 조각

### 컴포넌트 필수 조건

| 조건 | 내용 |
|------|------|
| **형태** | 함수형(보편적) 또는 클래스형(레거시) |
| **이름** | 반드시 **대문자(PascalCase)** 로 시작 |
| **반환값** | JSX 또는 React.createElement |

```jsx
function My() {
  return (
    <>
      {/* JSX 내부 주석 방법 */}
      <h2>Hello</h2>
      <p>React</p>
    </>
  );
}

// <My /> 또는 <My></My> 두 가지 모두 가능
createRoot(document.getElementById('root')).render(<My />);
```

---

## 4. JSX 표현식 `{}`

JSX 내부의 `{}`는 순수 JavaScript 영역 — 값을 표현하는 모든 구문 사용 가능

```jsx
function My() {
  const name = '홍길동';
  const age = 20;
  const johnDoe = { name: '아무개', age: 22 };

  return (
    <>
      <div>이름: {name}, 나이: {age}살</div>
      <div>두 배 나이: {age * 2}살</div>
      <div>객체 접근: {johnDoe.name}, {johnDoe.age}살</div>
      <div>함수 호출: 1 + 1 = {sum(1, 1)}</div>
    </>
  );
}

function sum(a, b) { return a + b; }
```

---

## 5. JSX 속성 (Attribute)

### 속성 작성 규칙

| HTML 속성 | JSX 속성 | 비고 |
|-----------|----------|------|
| `class` | `className` | 예약어 충돌 방지 |
| `onclick` | `onClick` | camelCase |
| `style="color:red"` | `style={{ color: 'red' }}` | 반드시 객체로 |

```jsx
function My() {
  const myStyle = {
    color: 'blue',
    fontSize: '2em',       // camelCase
    'font-weight': 'bold'  // 문자열 키도 가능
  };

  return (
    <>
      {/* 동적 className */}
      <div className="one" title="풍선 도움말">Content</div>

      {/* 이벤트 핸들러 - camelCase */}
      <button onClick={() => alert('클릭!')}>버튼</button>

      {/* disabled 플래그 속성 */}
      <button disabled={false}>활성</button>
      <button disabled>비활성</button>

      {/* inline style - 반드시 객체로 */}
      <div style={myStyle}>Lorem ipsum...</div>
    </>
  );
}
```

---

## 6. JSX 제어문

JSX 내부에서 `if`문, `for`문 직접 사용 불가 → 아래 방법으로 해결

| 문제 | 해결 방법 |
|------|----------|
| **조건 처리** | 외부 if문 또는 내부 삼항 연산자 |
| **반복 처리** | 외부 for문 결과 배열 또는 내부 `map()` |

```jsx
function My() {
  const list = [
    { seq: 1, name: '강아지' },
    { seq: 2, name: '고양이' },
    { seq: 3, name: '거북이' }
  ];

  const dog = { name: '바둑이', gender: 'm' };

  // 조건 처리 - 외부 if문
  let genderText;
  if (dog.gender === 'm') {
    genderText = '남자';
  } else {
    genderText = '여자';
  }

  return (
    <>
      {/* 삼항 연산자 - JSX 내부 조건 처리 */}
      <div>{dog.gender === 'm' ? '남자' : '여자'}</div>
      <div>{genderText}</div>

      {/* map() - key는 고유한 값 사용 (PK 권장) */}
      <ul>
        {list.map(item => <li key={item.seq}>{item.name}</li>)}
      </ul>
    </>
  );
}
```

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **JSX** | HTML처럼 보이지만 JS, 반드시 루트 태그 하나 |
| **Fragment** | `<>` 단순 래퍼, `<React.Fragment>` key 사용 가능 |
| **컴포넌트** | 대문자 PascalCase, JSX 반환 필수 |
| **표현식** | `{}` 안은 순수 JS, if/for 직접 사용 불가 |
| **className** | HTML의 class → JSX에서는 className |
| **style** | 문자열 불가, 반드시 객체로 |
| **map()** | 반복 렌더링 시 key 필수 |

## 📌 자주 하는 실수

### ❌ 실수 1: 컴포넌트 이름을 소문자로 작성
```jsx
function myComponent() { return <div>내용</div>; }
<myComponent /> // ❌ HTML 태그로 인식됨

function MyComponent() { return <div>내용</div>; }
<MyComponent /> // ✅
```

### ❌ 실수 2: JSX에 style 문자열로 작성
```jsx
<div style="color: red; font-size: 2em;">내용</div>  // ❌ 오류
<div style={{ color: 'red', fontSize: '2em' }}>내용</div>  // ✅
```

### ❌ 실수 3: JSX 루트 태그 없이 여러 요소 반환
```jsx
// ❌
return (
  <h2>제목</h2>
  <p>내용</p>
);

// ✅
return (
  <>
    <h2>제목</h2>
    <p>내용</p>
  </>
);
```
