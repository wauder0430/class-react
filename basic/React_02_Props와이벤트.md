# React 02 — Props, 이벤트, 조건부 렌더링

컴포넌트 분리, Props, props.children, 이벤트, 조건부 렌더링, map()+key (main07~12)

---

## 1. 컴포넌트 분리

화면을 역할별로 컴포넌트로 쪼개고 `export/import`로 조합

```jsx
// Item.jsx - 조각 페이지 (가장 작은 단위)
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

// main.jsx - 진입점
import List from './List';
createRoot(document.getElementById('root')).render(<List />);
```

---

## 2. Props

**Props (Properties)**: 부모 컴포넌트가 자식 컴포넌트에 전달하는 데이터

| 특징 | 설명 |
|------|------|
| **전달 방향** | 부모 → 자식 (단방향) |
| **수정 가능 여부** | 읽기 전용 (자식이 직접 수정 불가) |
| **전달 방식** | 컴포넌트 태그의 속성 형태 |

```jsx
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

function My() {
  const hong = { name: '홍길동', age: 20, color: '파랑' };

  return (
    <>
      {/* 1. 개별 속성 전달 (가장 명시적) */}
      <Student name={hong.name} age={hong.age} color={hong.color} />

      {/* 2. Spread Operator (여러 필드일 때 권장) */}
      <Student {...hong} />

      {/* 3. 객체 자체 전달 */}
      <Student info={hong} />

      {/* 4. 기본값 적용 (age, color는 기본값 사용) */}
      <Student name="호호호" />
    </>
  );
}
```

### Rest로 나머지 props 받기

```jsx
function Student({ name, ...etc }) {
  return (
    <>
      <div>이름: {name}</div>
      <div>나이: {etc.age}</div>
      <div>색상: {etc.color}</div>
    </>
  );
}
```

---

## 3. props.children

컴포넌트 태그 사이에 넣은 JSX를 자식 컴포넌트 내부에서 `{props.children}`으로 출력

- ✅ 컴포넌트마다 내부 구조가 달라야 할 때
- ✅ 레이아웃 / 카드 / 패널 같은 래퍼 컴포넌트

```jsx
function Product(props) {
  const cardStyle = {
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '200px'
  };

  return (
    <div style={cardStyle}>
      <h3>{props.name}</h3>
      {/* 태그 사이의 내용이 여기에 들어옴 */}
      <div>{props.children}</div>
    </div>
  );
}

function List() {
  return (
    <>
      {/* children: 가격/색상 + 버튼 */}
      <Product name="마우스">
        <p>가격: 30,000원</p>
        <p>색상: 빨강</p>
        <button>구매하기</button>
      </Product>

      {/* children: 이미지와 설명 (다른 내부 구조) */}
      <Product name="노트북">
        <img src="https://picsum.photos/150" />
        <p>특별 상품 20% 할인 중</p>
      </Product>
    </>
  );
}
```

---

## 4. 이벤트

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
  alert(event.type); // 합성 이벤트 객체의 type
}

function My() {
  return (
    <>
      {/* 함수 참조 전달 */}
      <button onClick={m1}>클릭</button>

      {/* 인라인 화살표 함수 */}
      <button onClick={() => alert('클릭')}>클릭</button>

      {/* 이벤트 객체 + 인수 함께 전달 */}
      <button onClick={(event) => m3('홍길동', event)}>클릭</button>
    </>
  );
}
```

> ⚠️ `onClick={m1()}` — 괄호를 붙이면 렌더링 시 즉시 실행됨. 반드시 참조(`onClick={m1}`) 또는 화살표 함수로 전달

---

## 5. 조건부 렌더링

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

## 6. map() + key

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
        // key는 props로 자동 전달되지 않음 → 별도 지정 필수
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

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **컴포넌트 분리** | export default → import로 조합 |
| **Props** | 부모→자식 단방향, 읽기 전용, 구조 분해 권장 |
| **props 전달** | 개별 / Spread(`{...obj}`) / 객체 통째로 |
| **props.children** | 태그 사이 내용 → 래퍼 컴포넌트에서 활용 |
| **이벤트** | camelCase, SyntheticEvent 래핑 객체 |
| **조건부 렌더링** | `&&`는 null 체크용, 삼항은 양쪽 모두 렌더링 |
| **key** | map()에서 PK 사용, index는 비추천 |

## 📌 자주 하는 실수

### ❌ 실수 1: onClick에 괄호 붙이기
```jsx
<button onClick={m1()}>클릭</button>   // ❌ 렌더링 시 즉시 실행
<button onClick={m1}>클릭</button>     // ✅ 클릭 시 실행
<button onClick={() => m1()}>클릭</button>  // ✅ 클릭 시 실행
```

### ❌ 실수 2: map()에서 key 빠뜨리기
```jsx
list.map(item => <li>{item.name}</li>)           // ❌ React 경고 발생
list.map(item => <li key={item.id}>{item.name}</li>)  // ✅
```

### ❌ 실수 3: && 연산자에서 0 렌더링
```jsx
// count가 0이면 '0'이 화면에 출력됨 (Falsy지만 렌더링됨)
{count && <p>항목이 {count}개 있습니다.</p>}

// 명시적으로 boolean 변환
{count > 0 && <p>항목이 {count}개 있습니다.</p>}  // ✅
```
