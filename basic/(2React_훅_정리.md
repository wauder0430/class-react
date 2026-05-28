# React 훅 정리

useEffect (Side Effect 처리) + useRef (값/DOM 참조) (main20 ~ main23)

---

## 1. useEffect — 기본 (main20)

**useEffect**: 컴포넌트 렌더링이 끝난 후 실행할 작업을 등록하는 훅 (Side Effect 처리)

| 컴포넌트 역할 | useEffect 역할 |
|--------------|---------------|
| 화면을 그리는 일 | 그리기 완료 후 추가 작업 |
| JSX 반환 | 데이터 로딩, 로깅, 타이머, 구독 등 |

```jsx
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('useEffect 연습 중');

  // 렌더링이 발생할 때마다 실행 (의존성 배열 없음)
  useEffect(() => {
    console.log('렌더링 완료');
    console.log('count:', count);
    console.log('message:', message);
  });

  return (
    <>
      <div>카운트: {count}</div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <div>메시지: {message}</div>
      <button onClick={() => setMessage('메시지 변경')}>메시지 변경</button>
    </>
  );
}
```

> 💡 **state를 Setter로 변경하면** → 컴포넌트 리렌더링 발생 → useEffect 재실행

---

## 2. useEffect — 의존성 배열 (main21)

두 번째 인수로 배열을 전달해 **언제 useEffect를 실행할지** 제어

| 형태 | 실행 시점 |
|------|----------|
| `useEffect(fn)` | 매번 렌더링 후 실행 |
| `useEffect(fn, [])` | **첫 렌더링에만** 실행 (생성자, onload 역할) |
| `useEffect(fn, [값])` | **해당 값이 변경될 때만** 실행 |

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 1. 의존성 배열 없음 → 모든 렌더링마다 실행
  useEffect(() => {
    console.log('매번 실행');
  });

  // 2. 빈 배열 [] → 첫 렌더링에만 실행 (초기 데이터 로딩에 사용)
  useEffect(() => {
    console.log('최초 1회만 실행');
    // fetch('/api/data') 등 초기 데이터 로딩
  }, []);

  // 3. [count, text] → count 또는 text가 변경될 때만 실행
  useEffect(() => {
    console.log('count 또는 text 변경 시 실행');
  }, [count, text]);

  return (
    <>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
    </>
  );
}
```

---

## 3. useEffect — cleanup (main22)

**cleanup**: effect가 다시 실행되기 전 또는 컴포넌트가 사라질 때 실행되는 정리 함수

- 타이머, 이벤트 리스너, 구독 등 **중첩되면 안 되는 작업** 제어에 필수

```jsx
useEffect(() => {
  // effect: 작업 시작
  console.log('effect 발생');

  return () => {
    // cleanup: 작업 정리 (다음 effect 실행 전 or 컴포넌트 소멸 시)
    console.log('cleanup 발생');
  };
}, [의존성]);
```

### 타이머 cleanup 예시

```jsx
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('effect: 타이머 시작');

    const id = setInterval(() => {
      console.log('1초마다 실행');
    }, 1000);

    return () => {
      console.log('cleanup: 타이머 정리');
      clearInterval(id); // ← 반드시 정리해야 타이머 중첩 방지
    };

  }, [count]); // count 변경 시마다 타이머 재시작

  return (
    <>
      <div>카운트: {count}</div>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </>
  );
}
```

### cleanup 실행 순서

```
1. 첫 렌더링 → effect 실행
2. state 변경 → 리렌더링
3. cleanup 실행 (이전 effect 정리)
4. 새 effect 실행
5. 컴포넌트 소멸 → cleanup 실행
```

> ⚠️ **StrictMode**: 개발 환경에서 effect를 의도적으로 2번 실행해 cleanup이 제대로 작동하는지 검증함

---

## 4. useRef (main23)

**useRef**: 렌더링을 발생시키지 않으면서 값을 유지하는 훅

### 변수 유형 비교

| 유형 | 렌더링 반응 | 값 유지 | 스스로 렌더링 발생 |
|------|------------|---------|-----------------|
| **일반 변수** | 리렌더링 시 초기화됨 | ❌ | ❌ |
| **state** | 유지됨 | ✅ | ✅ (Setter 호출 시) |
| **ref** | 유지됨 | ✅ | ❌ (화면 갱신 없음) |

```jsx
import { useState, useRef } from 'react';

function App() {
  const num = useRef(0);      // ref: 변경해도 렌더링 안됨
  const [num2, setNum2] = useState(0); // state: 변경 시 렌더링

  function m1() {
    num.current = num.current + 1; // ref 값 변경 (화면 갱신 없음)
    console.log(num.current);
  }

  function m2() {
    setNum2(num2 + 1); // state 변경 (화면 갱신됨)
    // 이때 num.current 값도 함께 화면에 반영됨 (외부 렌더링에 편승)
  }

  return (
    <>
      <div>num(ref): {num.current}</div>
      <button onClick={m1}>ref 증가</button>
      <div>num2(state): {num2}</div>
      <button onClick={m2}>state 증가</button>
    </>
  );
}
```

### useRef 가장 많이 쓰는 용도 — DOM 요소 직접 참조

```jsx
function App() {
  const [name, setName] = useState('');
  const input = useRef(null); // DOM 요소 저장

  function focusInput() {
    // document.getElementById('txt1').focus() 대신 사용
    input.current.focus();
  }

  function clearInput() {
    // input.current.value = ''; // DOM 직접 조작 → 권장하지 않음
    setName(''); // state를 통한 초기화 → 권장
  }

  return (
    <>
      <input
        type="text"
        value={name}
        ref={input}           {/* ref 연결 */}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={focusInput}>포커스</button>
      <button onClick={clearInput}>초기화</button>
    </>
  );
}
```

---

## 📚 학습 순서

### 1️⃣ useEffect 기본 (main20)
- 렌더링 완료 후 실행되는 타이밍 이해
- state 변경 → 렌더링 → useEffect 재실행 흐름

### 2️⃣ useEffect 의존성 배열 (main21)
- 빈 배열 `[]` → 최초 1회 (데이터 로딩 패턴)
- 특정 state 감시 → 조건부 실행

### 3️⃣ useEffect cleanup (main22)
- 타이머/구독의 중첩 방지
- cleanup 실행 순서 이해
- StrictMode에서의 2회 실행 이해

### 4️⃣ useRef (main23)
- 일반 변수 / state / ref 차이 명확히 구분
- DOM 참조 패턴 (포커스, 스크롤 등)

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **useEffect 기본** | 렌더링 완료 후 실행, 의존성 배열 없으면 매번 실행 |
| **useEffect []** | 최초 1회만 실행 → 초기 데이터 로딩에 사용 |
| **useEffect [값]** | 해당 값 변경 시에만 실행 → 조건부 side effect |
| **cleanup** | return 함수로 등록, 타이머/구독 정리에 필수 |
| **useRef 값 저장** | `.current`로 접근, 변경해도 렌더링 미발생 |
| **useRef DOM 참조** | `ref={변수}`로 연결, `변수.current`로 DOM 접근 |
| **DOM 조작 규칙** | `ref.current.value = ''` 대신 state Setter 사용 권장 |

---

## 📌 자주 하는 실수

### ❌ 실수 1: useEffect 의존성 배열 누락으로 무한 루프
```jsx
// 잘못된 예 - effect 내에서 state 변경 + 의존성 배열 없음 → 무한 루프
useEffect(() => {
  setCount(count + 1); // ❌ 렌더링 → effect → 렌더링 → effect...
});

// 올바른 예
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // ✅ 최초 1회만
```

### ❌ 실수 2: cleanup에서 타이머 정리 누락
```jsx
// 잘못된 예 - 리렌더링될 때마다 타이머가 쌓임
useEffect(() => {
  setInterval(() => console.log('실행'), 1000); // ❌ cleanup 없음
}, [count]);

// 올바른 예
useEffect(() => {
  const id = setInterval(() => console.log('실행'), 1000);
  return () => clearInterval(id); // ✅ cleanup으로 이전 타이머 정리
}, [count]);
```

### ❌ 실수 3: ref로 화면에 출력되는 값 관리
```jsx
// 잘못된 예 - ref는 화면 갱신 안됨
const count = useRef(0);
return <div>카운트: {count.current}</div>; // ❌ 버튼 클릭해도 화면 안바뀜

// 올바른 예 - 화면에 보여줄 값은 state 사용
const [count, setCount] = useState(0);
return <div>카운트: {count}</div>; // ✅
```

### ❌ 실수 4: useEffect 안에서 async 직접 사용
```jsx
// 잘못된 예
useEffect(async () => {  // ❌ useEffect 콜백은 async 불가
  const data = await fetch('/api');
}, []);

// 올바른 예 - 내부에서 async 함수 정의 후 호출
useEffect(() => {
  async function load() {
    const data = await fetch('/api');
  }
  load(); // ✅
}, []);
```

---

## 📖 참고 자료

- **React 공식 Hooks 문서**: https://ko.react.dev/reference/react
- **useEffect 완벽 가이드**: https://overreacted.io/ko/a-complete-guide-to-useeffect
