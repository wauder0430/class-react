# React 03 — useState와 폼 제어

useState 훅, 제어 컴포넌트, 폼 컨트롤, 체크박스 (main13~15)

---

## 1. useState

**Hook**: 리액트 컴포넌트에서 상태(state)와 생명주기 기능을 함수형으로 사용하게 해주는 특수 함수

| 항목 | 설명 |
|------|------|
| **반환값** | `[현재값, setter함수]` 배열 |
| **화면 갱신** | setter 호출 시 React가 자동으로 다시 렌더링 |
| **직접 수정** | 금지 — setter를 쓰지 않으면 화면이 갱신되지 않음 |
| **저장 위치** | 컴포넌트 외부 (React가 별도 관리) |

```jsx
import { useState } from 'react';

function My() {
  // useState('초깃값') → [현재값, setter]
  const [text, setText] = useState('초깃값');

  return (
    <>
      <div>현재 값: {text}</div>
      <button onClick={() => setText('변경됨')}>변경</button>
    </>
  );
}
```

---

## 2. 제어 컴포넌트 (Controlled Component)

**"입력값을 누가 가지고 있는가?"**

| 방식 | 입력값 주인 | 특징 |
|------|-----------|------|
| **비제어 컴포넌트** | DOM (화면) | HTML 기본 방식 |
| **제어 컴포넌트** | React state | React가 관리, 실시간 반응 가능 |

```jsx
function My() {
  const [text, setText] = useState('초깃값');

  const isValid = text.length > 5; // 실시간 유효성 검사

  function handleChange(e) {
    setText(e.target.value); // 입력할 때마다 state 갱신
  }

  function send(e) {
    e.preventDefault(); // form 기본 submit(페이지 이동) 방지
    alert(text);        // fetch/axios로 서버 전송
  }

  return (
    <form onSubmit={send}>
      {/* value로 state와 연결 */}
      <input
        type="text"
        value={text}
        onChange={handleChange}
      />
      {!isValid && <p>6자 이상 입력하세요.</p>}
      <div>현재 입력값: {text}</div>
      <button type="submit">보내기</button>
    </form>
  );
}
```

> 💡 **React는 SPA**: `<form>` 기본 제출(MPA, 페이지 이동) 대신 `e.preventDefault()` 후 비동기 통신(fetch/axios) 사용

---

## 3. 폼 컨트롤 — input / textarea / select

`input`, `textarea`, `select` 모두 동일하게 `value` + `onChange`로 state와 연결

### 각 컨트롤별 비교

| 컨트롤 | 연결 속성 | 비고 |
|--------|----------|------|
| `<input type="text">` | `value` | 기본 텍스트 입력 |
| `<textarea>` | `value` | HTML과 달리 닫는 태그 방식 동일 |
| `<select>` | `value` | option의 value와 매칭 |
| `<input type="checkbox">` | `checked` | boolean 값 사용 |

### 여러 컨트롤을 객체 state 하나로 관리

```jsx
function My() {
  // 여러 컨트롤을 객체 state 하나로 관리
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
      [key]: value  // 계산된 속성명 활용
    }));
  }

  return (
    <form>
      <div>
        <label>이름:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>자기소개:</label>
        <textarea
          name="intro"
          value={form.intro}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>성별:</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="m">남자</option>
          <option value="f">여자</option>
        </select>
      </div>
    </form>
  );
}
```

---

## 4. 체크박스 / 라디오

`checkbox`, `radio`는 `value` 대신 **`checked`** 속성으로 state와 연결

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
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
        />
        약관에 동의합니다.
      </label>

      <label>
        <input
          type="checkbox"
          name="email"
          checked={form.email}
          onChange={handleChange}
        />
        이메일 수신에 동의합니다.
      </label>

      <hr />
      <p>{form.agree ? '약관 동의함' : '약관 동의 안함'}</p>
      <p>{form.email ? '수신 동의함' : '수신 동의 안함'}</p>
    </>
  );
}
```

> ⚠️ React에서 boolean(`true/false`)은 화면에 출력되지 않음 → 출력하려면 `.toString()` 또는 삼항 연산자 사용

---

## 5. state 패턴 비교

### 단일 state vs 객체 state

```jsx
// 단일 state - 컨트롤이 1~2개일 때
const [name, setName] = useState('');
const [age, setAge] = useState(0);

// 객체 state - 컨트롤이 많을 때 (권장)
const [form, setForm] = useState({ name: '', age: 0 });

// 객체 state 업데이트 시 반드시 Spread 사용
setForm(prev => ({ ...prev, name: '홍길동' }));
```

### prevState 활용

```jsx
// 이전 state 값을 기반으로 변경할 때 prevState 사용
const [count, setCount] = useState(0);

// ❌ 비동기 문제 발생 가능
setCount(count + 1);

// ✅ 안전한 방법
setCount(prev => prev + 1);
```

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **useState** | `[값, setter]` 반환, setter로만 변경해야 화면 갱신 |
| **제어 컴포넌트** | `value` + `onChange`로 state와 연결 |
| **e.preventDefault()** | form 기본 제출(페이지 이동) 방지 필수 |
| **객체 state** | Spread로 복사 후 해당 키만 변경 |
| **단일 핸들러** | `name` 속성 + 계산된 속성명으로 여러 컨트롤 처리 |
| **checkbox** | `checked` + `onChange` (value 아님) |
| **boolean 출력** | 직접 출력 불가 → 삼항 연산자 사용 |

## 📌 자주 하는 실수

### ❌ 실수 1: state 직접 수정
```jsx
const [user, setUser] = useState({ name: '철수' });

user.name = '영희';  // ❌ 화면이 갱신되지 않음

setUser(prev => ({ ...prev, name: '영희' }));  // ✅ 화면 갱신됨
```

### ❌ 실수 2: form 기본 동작 미방지
```jsx
// ❌ submit 시 페이지가 새로고침됨
function send() { fetch('/api', ...) }
<form onSubmit={send}>

// ✅
function send(e) {
  e.preventDefault();
  fetch('/api', ...)
}
```

### ❌ 실수 3: 체크박스에 value 연결
```jsx
<input type="checkbox" value={checked} onChange={...} />   // ❌ 동작 안함
<input type="checkbox" checked={checked} onChange={...} /> // ✅
```

### ❌ 실수 4: 객체 state 업데이트 시 Spread 누락
```jsx
const [form, setForm] = useState({ name: '', age: 0 });

// ❌ name만 남고 age는 사라짐
setForm({ name: '철수' });

// ✅ 기존 값 유지
setForm(prev => ({ ...prev, name: '철수' }));
```
