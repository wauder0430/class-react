# React 기초 학습 정리

React 입문 — JSX부터 useState 폼 제어까지 (main.jsx ~ main15.jsx)

---

## 1. JSX란? (main.jsx)

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

## 2. JSX 문법 규칙 (main02.jsx)

### 루트 태그 규칙

```jsx
// ❌ 에러 - 부모 요소 없이 여러 태그 나열 불가
const app = <h2>Hello</h2><p>안녕</p>;

// ✅ div로 감싸기
const app = <div><h2>Hello</h2><p>안녕</p></div>;
```

### Fragment — 불필요한 태그 없이 감싸기

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
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
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

## 3. 함수형 컴포넌트 (main03.jsx)

**컴포넌트**: 데이터와 화면을 묶은 독립적이고 재사용 가능한 UI 조각

### 컴포넌트 필수 조건

| 조건 | 내용 |
|------|------|
| **형태** | 함수형(보편적) 또는 클래스형(레거시) |
| **이름** | 반드시 **대문자(PascalCase)** 로 시작 |
| **반환값** | JSX 또는 React.createElement |

```jsx
// 함수형 컴포넌트
function My() {
  return (
    <>
      {/* JSX 내부 주석 방법 */}
      <h2>Hello</h2>
      <p>React</p>
    </>
  );
}

// 컴포넌트 렌더링 - <My /> 또는 <My></My>
createRoot(document.getElementById('root')).render(<My />);
```

---

## 4. JSX 표현식 `{}` (main04.jsx)

JSX 내부의 `{}`는 순수 JavaScript 영역 — 값을 표현하는 모든 구문 사용 가능

```jsx
function My() {
  const name = '홍길동';
  const age = 20;
  const johnDoe = { name: '아무개', age: 22 };

  return (
    <>
      <div>제 이름은 {name}이고 {age}살입니다.</div>
      <div>두 배 나이: {age * 2}살</div>
      <div>객체 접근: {johnDoe.name}, {johnDoe.age}살</div>
      <div>함수 호출: 1 + 1 = {sum(1, 1)}</div>
    </>
  );
}

function sum(a, b) { return a + b; }
```

---

## 5. JSX 속성 (main05.jsx)

### 속성 작성 규칙

| HTML 속성 | JSX 속성 | 비고 |
|-----------|----------|------|
| `class` | `className` | 예약어 충돌 방지 |
| `onclick` | `onClick` | camelCase |
| `style="color:red"` | `style={{ color: 'red' }}` | 반드시 객체로 |

```jsx
function My() {
  const a = 'one';
  const title = '풍선 도움말';
  const result = true;

  const myStyle = {
    color: 'blue',
    fontSize: '2em',       // camelCase
    'font-weight': 'bold'  // 문자열 키도 가능
  };

  return (
    <>
      {/* 동적 className */}
      <div className={a} title={title}>Content</div>

      {/* 이벤트 핸들러 */}
      <button onClick={m1}>버튼</button>
      <button onClick={() => alert('클릭!')}>버튼</button>

      {/* disabled 플래그 속성 */}
      <button disabled={result}>비활성</button>

      {/* inline style - 반드시 객체로 */}
      <div style={myStyle}>Lorem ipsum...</div>
    </>
  );
}
```

---

## 6. JSX 제어문 (main06.jsx)

JSX 내부에서는 `if`문, `for`문 직접 사용 불가 → 아래 방법으로 해결

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

  return (
    <>
      <h2>반복문</h2>
      <ul>
        {/* map() - key는 고유한 값 사용 (PK 권장) */}
        {list.map(item => <li key={item.seq}>{item.name}</li>)}
      </ul>
    </>
  );
}
```

---

## 7. 컴포넌트 분리 (main07.jsx / List.jsx / Item.jsx)

화면을 역할별로 컴포넌트로 쪼개고 `export/import`로 조합

```jsx
// Item.jsx - 조각 페이지
function Item() {
  return <li>아이템</li>;
}
export default Item;

// List.jsx - 조각 페이지 조합
import Item from './Item';

function List() {
  return (
    <>
      <h2>목록</h2>
      <ul>
        <Item />
        <Item />
        <Item />
      </ul>
    </>
  );
}
export default List;

// main07.jsx - 진입점
import List from './List';
createRoot(document.getElementById('root')).render(<List />);
```

---

## 8. Props (main08.jsx)

**Props (Properties)**: 부모 컴포넌트가 자식 컴포넌트에 전달하는 데이터

| 특징 | 설명 |
|------|------|
| **전달 방향** | 부모 → 자식 (단방향) |
| **수정 가능 여부** | 읽기 전용 (자식이 직접 수정 불가) |
| **전달 방식** | 컴포넌트 태그의 속성 형태 |

```jsx
// props 기본 사용
function Student(props) {
  return <div>저는 {props.name}입니다. {props.age}살</div>;
}

// 구조 분해 할당으로 받기 (권장)
function Student({ name, age = 30, color = '검정' }) {
  return (
    <>
      <div>저는 {name}입니다.</div>
      <div>나이: {age}세</div>
      <div>색상: {color}</div>
    </>
  );
}

// 부모에서 전달하는 방법들
function My() {
  const hong = { name: '홍길동', age: 20, color: '파랑' };

  return (
    <>
      {/* 1. 개별 속성 전달 */}
      <Student name={hong.name} age={hong.age} color={hong.color} />

      {/* 2. Spread Operator (여러 필드일 때 권장) */}
      <Student {...hong} />

      {/* 3. 객체 자체 전달 */}
      <Student info={hong} />

      {/* 4. 기본값 적용 (name만 전달, age/color는 기본값 사용) */}
      <Student name="호호호" />
    </>
  );
}
```

---

## 9. props.children (main09.jsx)

컴포넌트 태그 사이에 넣은 JSX를 자식 컴포넌트 내부에서 `{props.children}`으로 출력

- ✅ 컴포넌트마다 내부 구조가 달라야 할 때 사용
- ✅ 레이아웃/카드/패널 같은 래퍼 컴포넌트에 유용

```jsx
function Product(props) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px' }}>
      <h3>{props.name}</h3>
      {/* 태그 사이의 내용이 여기에 들어옴 */}
      <div>{props.children}</div>
    </div>
  );
}

function List() {
  return (
    <>
      {/* children: 가격/색상 정보 */}
      <Product name="마우스">
        <p>가격: 30,000원</p>
        <p>색상: 빨강</p>
        <button>구매하기</button>
      </Product>

      {/* children: 이미지와 설명 */}
      <Product name="노트북">
        <img src="https://picsum.photos/150" />
        <p>특별 상품 20% 할인 중</p>
      </Product>
    </>
  );
}
```

---

## 10. 이벤트 (main10.jsx)

**합성 이벤트 (SyntheticEvent)**: React가 브라우저 호환성을 위해 래핑한 이벤트 객체

| HTML 이벤트 | React 이벤트 |
|------------|-------------|
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |
| `onmousedown` | `onMouseDown` |

```jsx
function m1() { alert('클릭1'); }

function m3(name, event) {
  alert(name);
  alert(event.type); // 합성 이벤트 객체
}

function My() {
  return (
    <>
      {/* 함수 참조 */}
      <button onClick={m1}>클릭</button>

      {/* 인라인 화살표 함수 */}
      <button onClick={() => alert('클릭')}>클릭</button>

      {/* 이벤트 객체 + 인수 전달 */}
      <button onClick={(event) => m3('홍길동', event)}>클릭</button>
    </>
  );
}
```

---

## 11. 조건부 렌더링 (main11.jsx)

| 방법 | 위치 | 특징 |
|------|------|------|
| **if문** | JSX 외부 | 복잡한 분기에 적합 |
| **삼항 연산자** | JSX 내부 | 참/거짓 두 경우 모두 렌더링 |
| **&& 연산자** | JSX 내부 | 값이 있을 때만 렌더링 (null 체크에 유용) |

```jsx
// 1. 외부 if문
function User({ isLogin }) {
  if (isLogin) {
    return <button>로그아웃</button>;
  }
  return <button>로그인</button>;
}

// 2. 삼항 연산자
function User({ isLogin }) {
  return (
    <>
      {isLogin ? <button>로그아웃</button> : <button>로그인</button>}
    </>
  );
}

// 3. && 연산자 (단축 평가) - 값이 존재할 때만 렌더링
function UserProfile({ name, email, isAuthenticated }) {
  return (
    <>
      <p>이름: {name}</p>

      {/* email이 있을 때만 렌더링 */}
      {email && <p>이메일: {email}</p>}

      {/* 로그인 상태일 때만 버튼 렌더링 */}
      {isAuthenticated && <button>회원 페이지 이동</button>}
    </>
  );
}
```

> ⚠️ `&&` 연산자: `null`, `undefined`, `false`는 렌더링 안됨 / `0`은 렌더링됨 주의

---

## 12. map() + key (main12.jsx)

| key 방법 | 권장 여부 | 이유 |
|----------|----------|------|
| **index 사용** | ⚠️ 비추천 | 추가/삭제 시 index 변경 → React 혼란 |
| **고유 id (PK)** | ✅ 권장 | DB 데이터 기준, 안정적 |

```jsx
function Item({ seq, name, price }) {
  return <li>[{seq}] {name} ({price.toLocaleString()}원)</li>;
}

function List() {
  const list = [
    { seq: 1, name: '마우스', price: 30000 },
    { seq: 2, name: '키보드', price: 50000 },
    { seq: 3, name: '모니터', price: 100000 }
  ];

  return (
    <ul>
      {list.map(product => (
        // key는 컴포넌트에 넘길 때 자동으로 들어가지 않음 → 별도 지정 필요
        <Item
          key={product.seq}
          seq={product.seq}
          name={product.name}
          price={product.price}
        />
      ))}
    </ul>
  );
}
```

---

## 13. useState + 제어 컴포넌트 (main13.jsx)

**제어 컴포넌트 (Controlled Component)**: 입력값을 React state가 관리하는 방식

| 방식 | 입력값 주인 | 특징 |
|------|-----------|------|
| **비제어 컴포넌트** | DOM (화면) | HTML 기본 방식 |
| **제어 컴포넌트** | React state | React가 관리, 실시간 반응 가능 |

```jsx
import { useState } from 'react';

function My() {
  // useState: [현재값, 변경함수] 배열 반환
  // state를 변경하면 React가 화면을 자동으로 다시 렌더링
  const [text, setText] = useState('초깃값');

  const isValid = text.length > 5;

  function handleChange(e) {
    setText(e.target.value); // Setter로만 변경해야 화면 갱신됨
  }

  function send(e) {
    e.preventDefault(); // form 기본 submit 방지
    alert(text);        // fetch/axios로 서버 전송
  }

  return (
    <form onSubmit={send}>
      <input
        type="text"
        value={text}      {/* state와 입력값 연결 */}
        onChange={handleChange}
      />
      {!isValid && <p>6자 이상 입력하세요.</p>}
      <div>현재 입력값: {text}</div>
      <button type="submit">보내기</button>
    </form>
  );
}
```

> 💡 **React는 SPA**: `<form>` 기본 제출 방식(MPA) 대신 비동기 통신(fetch/axios) 사용

---

## 14. 폼 컨트롤 (main14.jsx)

`input`, `textarea`, `select` 모두 `value` + `onChange`로 state와 연결

### 여러 컨트롤을 객체 state 하나로 관리

```jsx
function My() {
  const [form, setForm] = useState({
    name: '',
    intro: '',
    gender: ''
  });

  // 하나의 핸들러로 모든 컨트롤 처리 (name 속성 활용)
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    // state 직접 수정 금지 → Spread로 복사 후 해당 키만 변경
    setForm(prevForm => ({
      ...prevForm,
      [key]: value    // 계산된 속성명 활용
    }));
  }

  return (
    <form>
      <input  type="text"     name="name"   value={form.name}   onChange={handleChange} />
      <textarea               name="intro"  value={form.intro}  onChange={handleChange} />
      <select                 name="gender" value={form.gender} onChange={handleChange}>
        <option value="m">남자</option>
        <option value="f">여자</option>
      </select>
    </form>
  );
}
```

---

## 15. 체크박스 (main15.jsx)

`checkbox`, `radio`는 `value` 대신 **`checked`** + `onChange`로 state 연결

```jsx
function My() {
  const [form, setForm] = useState({
    agree: false,
    email: false
  });

  function handleChange(e) {
    const key = e.target.name;
    const checked = e.target.checked; // value가 아닌 checked 사용

    setForm(prevForm => ({
      ...prevForm,
      [key]: checked
    }));
  }

  return (
    <>
      <label>
        <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
        약관에 동의합니다.
      </label>
      <label>
        <input type="checkbox" name="email" checked={form.email} onChange={handleChange} />
        이메일 수신에 동의합니다.
      </label>

      <p>{form.agree ? '약관 동의함' : '약관 동의 안함'}</p>
      <p>{form.email ? '수신 동의함' : '수신 동의 안함'}</p>
    </>
  );
}
```

---

## 📚 학습 순서

### 1️⃣ JSX 기초 (main01~02)
- React.createElement vs JSX
- 루트 태그 규칙
- Fragment 세 가지 방법

### 2️⃣ 컴포넌트 + 표현식 (main03~04)
- 함수형 컴포넌트 구조
- JSX 내 `{}` 표현식 활용

### 3️⃣ JSX 속성 + 제어문 (main05~06)
- className, style 객체, 이벤트 camelCase
- 삼항 연산자, map() 반복

### 4️⃣ 컴포넌트 분리 + Props (main07~09)
- export / import 구조 분리
- 단방향 데이터 흐름
- props.children 레이아웃 패턴

### 5️⃣ 이벤트 + 조건부 렌더링 (main10~11)
- SyntheticEvent 이해
- if문 / 삼항 / && 세 가지 패턴

### 6️⃣ map() + key (main12)
- 고유 key의 중요성
- Props 컴포넌트에 key 직접 지정

### 7️⃣ useState + 제어 컴포넌트 (main13~15)
- useState 훅 기본 사용
- 단일 state vs 객체 state
- input / textarea / select / checkbox

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **JSX** | HTML처럼 보이지만 JS, 반드시 루트 태그 하나 |
| **Fragment** | `<>` 단순 래퍼, `<React.Fragment>` key 사용 가능 |
| **컴포넌트** | 대문자 PascalCase, JSX 반환 |
| **표현식** | `{}` 안은 순수 JS, if/for 직접 사용 불가 |
| **Props** | 부모→자식 단방향, 읽기 전용, 구조 분해 권장 |
| **props.children** | 태그 사이 내용 → 내부에서 출력 |
| **이벤트** | camelCase, SyntheticEvent 래핑 객체 |
| **조건부 렌더링** | &&는 null 체크용, 삼항은 양쪽 모두 렌더링 |
| **key** | map()에서 PK 사용, index는 비추천 |
| **useState** | Setter로만 변경, 직접 수정하면 화면 갱신 안됨 |
| **제어 컴포넌트** | `value` + `onChange`로 state 연결 |
| **checkbox** | `checked` + `onChange`로 연결 |

---

## 📌 자주 하는 실수

### ❌ 실수 1: state 직접 수정
```jsx
// 잘못된 예
const [user, setUser] = useState({ name: '철수' });
user.name = '영희'; // ❌ 화면이 갱신되지 않음

// 올바른 예
setUser(prev => ({ ...prev, name: '영희' })); // ✅ 화면 갱신됨
```

### ❌ 실수 2: 컴포넌트 이름을 소문자로 작성
```jsx
// 잘못된 예
function myComponent() { return <div>내용</div>; }
<myComponent /> // ❌ HTML 태그로 인식됨

// 올바른 예
function MyComponent() { return <div>내용</div>; }
<MyComponent /> // ✅
```

### ❌ 실수 3: JSX에 style 문자열로 작성
```jsx
// 잘못된 예
<div style="color: red; font-size: 2em;">내용</div> // ❌ 오류

// 올바른 예
<div style={{ color: 'red', fontSize: '2em' }}>내용</div> // ✅
```

### ❌ 실수 4: map()에서 key 빠뜨리기
```jsx
// 잘못된 예
list.map(item => <li>{item.name}</li>) // ❌ React 경고 발생

// 올바른 예
list.map(item => <li key={item.id}>{item.name}</li>) // ✅
```

### ❌ 실수 5: 체크박스에 value 연결
```jsx
// 잘못된 예
<input type="checkbox" value={checked} onChange={...} /> // ❌ 동작 안함

// 올바른 예
<input type="checkbox" checked={checked} onChange={...} /> // ✅
```

### ❌ 실수 6: async 없이 form 제출
```jsx
// 잘못된 예 - form의 기본 동작으로 페이지가 새로고침됨
function send() { fetch('/api', ...) }

// 올바른 예
function send(e) {
  e.preventDefault(); // ✅ 기본 submit 동작 방지
  fetch('/api', ...)
}
```

---

## 📖 참고 자료

- **React 공식 문서**: https://react.dev
- **React 한국어 문서**: https://ko.react.dev
- **Vite 공식 문서**: https://vitejs.dev
- **MDN JSX 소개**: https://developer.mozilla.org/ko/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
