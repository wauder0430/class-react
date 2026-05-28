# React 상태관리 심화 정리

상태 끌어올리기 + 배열/객체 state + 불변성 + 비동기 데이터 + LocalStorage (main24 ~ main28)

---

## 1. 상태 끌어올리기 — Lifting State Up (main24)

**여러 컴포넌트가 같은 state를 공유해야 할 때** → 공통 부모 컴포넌트로 state를 올려서 관리

| 방법 | 문제점 |
|------|--------|
| 각 자식이 state 개별 관리 | 컴포넌트끼리 값이 따로 놀음 |
| **부모가 state 보유 + props로 전달** | ✅ 일관성 유지 |

```jsx
// ❌ 문제 상황: 두 컴포넌트가 각자 state 관리 → 값이 다름
function BoxA() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>BoxA: {count}</button>;
}
function BoxB() {
  const [count, setCount] = useState(0); // BoxA와 별개의 state
  return <button onClick={() => setCount(count + 1)}>BoxB: {count}</button>;
}
```

```jsx
// ✅ 해결: 부모가 state를 보유, 자식은 props로 받아서 사용
function BoxA({ count, onIncrease }) {
  return (
    <>
      <div>BoxA count: {count}</div>
      {/* 자식은 props.count를 직접 수정 못함 → 부모의 함수 호출 */}
      <button onClick={() => onIncrease(count + 1)}>증가</button>
    </>
  );
}

function BoxB({ count, onIncrease }) {
  return (
    <>
      <div>BoxB count: {count}</div>
      <button onClick={() => onIncrease(count + 1)}>증가</button>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0); // 부모가 state 보유

  return (
    <>
      {/* props로 state와 setter 전달 */}
      <BoxA count={count} onIncrease={setCount} />
      <BoxB count={count} onIncrease={setCount} />
    </>
  );
}
```

> 💡 **결론**: 공유 state는 공통 부모가 보유 → 자식은 props로 받고, setter도 props로 받아 호출

---

## 2. 배열 state — 추가 / 삭제 / 수정 (main25)

배열 state는 `push()`, `splice()` 등 **기존 배열 직접 수정 금지** → 항상 새 배열 반환

| 작업 | 금지 (기존 배열 수정) | 권장 (새 배열 반환) |
|------|---------------------|------------------|
| **추가** | `list.push(item)` ❌ | `[...list, item]` ✅ |
| **삭제** | `list.splice(i, 1)` ❌ | `list.filter(...)` ✅ |
| **수정** | `list[i].name = 'x'` ❌ | `list.map(...)` ✅ |

```jsx
function App() {
  const maxId = useRef(3); // 렌더링 없이 ID 카운터 관리

  const [list, setList] = useState([
    { id: 1, name: '강아지' },
    { id: 2, name: '고양이' },
    { id: 3, name: '병아리' }
  ]);
  const [text, setText] = useState('');

  // 추가 - Spread로 새 배열 생성
  function add() {
    if (text.trim() === '') return;
    maxId.current += 1;
    setList([...list, { id: maxId.current, name: text }]);
    setText('');
  }

  // 삭제 - filter로 새 배열 생성
  function del(id) {
    setList(list.filter(item => item.id !== id));
  }

  // 수정 - map으로 새 배열 생성
  function edit(id) {
    if (text.trim() === '') return;
    setList(list.map(item =>
      item.id === id ? { ...item, name: text } : item
    ));
    setText('');
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>추가</button>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.name}
            {/* onClick에 함수 참조가 아닌 화살표 함수 사용 (즉시 호출 방지) */}
            <button onClick={() => del(item.id)}>&times;</button>
            <button onClick={() => edit(item.id)}>수정</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

---

## 3. 불변성 — Immutability (main26)

**React는 state의 참조값(메모리 주소)이 바뀌는지 감시** → 같은 객체/배열이면 변경 감지 못함

| state 타입 | 직접 수정 | React 감지 | 렌더링 |
|-----------|----------|-----------|--------|
| `list.push(item)` | 배열 내용 변경 | 주소 동일 → ❌ 감지 못함 | ❌ |
| `setList([...list, item])` | 새 배열 생성 | 주소 변경 → ✅ 감지 | ✅ |

```jsx
function App() {
  const [user, setUser] = useState({
    name: '홍길동',
    age: 20,
    gender: 'm',
    address: '서울시',
    tel: '010'
  });

  // ❌ 잘못된 예 - 직접 수정 (주소값 그대로 → 감지 못함)
  function wrongEdit() {
    user.name = '아무개';
    setUser(user); // 같은 객체 참조 → 렌더링 안됨
  }

  // ✅ 올바른 예 - Spread로 새 객체 생성 (주소값 변경 → 감지됨)
  function editName() {
    setUser({
      ...user,        // 기존 속성 복사
      name: '아무개'  // 변경할 속성만 덮어씀
    });
  }

  function editMultiple() {
    setUser({
      ...user,
      age: 30,
      gender: 'f'
    });
  }

  return (
    <>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <button onClick={editName}>이름 수정</button>
      <button onClick={editMultiple}>나이/성별 수정</button>
    </>
  );
}
```

### 불변성 규칙 요약

- ✅ 배열: `[...list, item]`, `filter()`, `map()`
- ✅ 객체: `{ ...obj, key: value }`
- ❌ 금지: `push()`, `splice()`, `obj.key = value` 직접 수정

---

## 4. 비동기 데이터 — useEffect + fetch (main27)

**실제 데이터 통신**: REST API를 비동기로 호출해 state에 저장

| 통신 방법 | 설명 |
|----------|------|
| **ajax (XMLHttpRequest)** | 전통 방식 |
| **fetch** | Promise 기반, 브라우저 내장 |
| **axios** | 외부 라이브러리, 더 편리한 기능 제공 |

```jsx
function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 패턴 1: 버튼 클릭 시 데이터 로딩 + 로딩 상태 표시
  async function loadOnClick() {
    setLoading(true);
    const res = await fetch('/api/animals');
    const data = await res.json();
    setList(data);
    setLoading(false);
  }

  // 패턴 2: 페이지 진입 시 자동 데이터 로딩 (게시판 목록 등)
  // useEffect(fn, []) → 첫 렌더링에만 1회 실행
  useEffect(() => {
    async function load() {
      const res = await fetch('/api/animals');
      const data = await res.json();
      setList(data);
    }
    load(); // useEffect 내부에서 async 함수 정의 후 호출
  }, []); // ← [] 필수: 없으면 매 렌더링마다 fetch 호출됨

  return (
    <>
      {loading && <div>불러오는 중...</div>}
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </>
  );
}
```

### 데이터 로딩 패턴 정리

```jsx
// 게시판 목록보기 - 진입 시 자동 로딩
useEffect(() => {
  async function load() {
    const res = await fetch('/api/board');
    const data = await res.json();
    setList(data);
  }
  load();
}, []); // 마운트 시 1회

// 특정 ID 변경 시 재로딩 (상세보기 등)
useEffect(() => {
  async function load() {
    const res = await fetch(`/api/board/${id}`);
    const data = await res.json();
    setItem(data);
  }
  load();
}, [id]); // id 변경 시마다 재실행
```

---

## 5. 브라우저 저장소 — LocalStorage (main28)

**브라우저 저장소 종류**

| 저장소 | 지속성 | 특징 |
|--------|--------|------|
| **Cookie** | 만료일까지 | 서버 전송 가능, 용량 제한 |
| **LocalStorage** | 영구 | 하드 쿠키, 탭/창 닫아도 유지 |
| **SessionStorage** | 세션 종료까지 | 탭/창 닫으면 삭제 |

### LocalStorage API

```javascript
// 저장 (문자열만 저장 가능)
localStorage.setItem('key', 'value');

// 읽기
localStorage.getItem('key');

// 삭제
localStorage.removeItem('key');

// 객체 저장 → JSON으로 변환 필요
localStorage.setItem('user', JSON.stringify({ name: '홍길동' }));
const user = JSON.parse(localStorage.getItem('user'));
```

### React에서 LocalStorage 활용 패턴

```jsx
function App() {
  const [text, setText] = useState('');

  // 저장하기
  function save() {
    localStorage.setItem('message', text);
    alert('저장 완료');
  }

  // 첫 렌더링 시 저장된 값 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('message');
    if (saved) setText(saved); // null 체크 권장
  }, []);

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={save}>저장하기</button>
    </>
  );
}
```

---

## 📚 학습 순서

### 1️⃣ 상태 끌어올리기 (main24)
- 형제 컴포넌트 간 state 공유 필요성 이해
- 공통 부모로 state 이동
- Setter를 props로 전달하는 패턴

### 2️⃣ 배열 state CRUD (main25)
- 추가: `[...list, newItem]`
- 삭제: `filter()`
- 수정: `map()` + 조건부 Spread

### 3️⃣ 불변성 (main26)
- 참조값 변경이 렌더링의 핵심임을 이해
- 객체 state의 Spread 패턴

### 4️⃣ 비동기 데이터 로딩 (main27)
- useEffect + fetch 조합
- 빈 배열 `[]`로 최초 1회 로딩
- 로딩 상태 표시 패턴

### 5️⃣ LocalStorage (main28)
- 브라우저 저장소 종류와 차이
- setItem / getItem / JSON 변환
- useEffect `[]`에서 초기값 로딩

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **Lifting State Up** | 공유 state는 공통 부모가 보유, 자식은 props로 받음 |
| **배열 추가** | `setList([...list, newItem])` — Spread 사용 |
| **배열 삭제** | `setList(list.filter(item => item.id !== id))` |
| **배열 수정** | `setList(list.map(item => item.id === id ? {...item, ...} : item))` |
| **객체 수정** | `setUser({ ...user, name: '새이름' })` — Spread + 덮어쓰기 |
| **불변성 이유** | React는 참조값 변경으로 state 변화를 감지함 |
| **비동기 로딩** | `useEffect(() => { async function load(){}; load(); }, [])` |
| **LocalStorage** | 영구 저장, 문자열만 저장, 객체는 JSON 변환 필요 |

---

## 📌 자주 하는 실수

### ❌ 실수 1: 자식이 props를 직접 수정
```jsx
// 잘못된 예
function Child({ count }) {
  count = count + 1; // ❌ props는 읽기 전용
}

// 올바른 예 - 부모의 setter를 props로 받아서 호출
function Child({ count, onIncrease }) {
  return <button onClick={() => onIncrease(count + 1)}>증가</button>; // ✅
}
```

### ❌ 실수 2: 배열 state 직접 수정
```jsx
// 잘못된 예
function add() {
  list.push(newItem); // ❌ 참조값 동일 → 렌더링 안됨
  setList(list);
}

// 올바른 예
function add() {
  setList([...list, newItem]); // ✅ 새 배열 생성 → 렌더링됨
}
```

### ❌ 실수 3: onClick에 함수 즉시 호출
```jsx
// 잘못된 예 - 렌더링 시 del(item.id)가 바로 실행됨
<button onClick={del(item.id)}>삭제</button> // ❌

// 올바른 예 - 클릭 시에만 실행되도록 화살표 함수로 감쌈
<button onClick={() => del(item.id)}>삭제</button> // ✅
```

### ❌ 실수 4: useEffect 안에서 async 직접 사용
```jsx
// 잘못된 예
useEffect(async () => { // ❌
  const data = await fetch('/api');
}, []);

// 올바른 예
useEffect(() => {
  async function load() {
    const data = await fetch('/api');
  }
  load(); // ✅
}, []);
```

### ❌ 실수 5: LocalStorage에 객체를 그대로 저장
```jsx
// 잘못된 예
localStorage.setItem('user', { name: '홍길동' }); // ❌ "[object Object]" 저장됨

// 올바른 예
localStorage.setItem('user', JSON.stringify({ name: '홍길동' })); // ✅
const user = JSON.parse(localStorage.getItem('user')); // ✅
```

---

## 📖 참고 자료

- **React 공식 문서 — 상태 관리**: https://ko.react.dev/learn/managing-state
- **React 공식 문서 — Lifting State Up**: https://ko.react.dev/learn/sharing-state-between-components
- **MDN — localStorage**: https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage
- **MDN — fetch API**: https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
