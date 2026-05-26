import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main24.jsx
/*

  Lifting State Up
  - 여러 컴포넌트가 같은 데이터를 같이 사용해야 하는 경우
  - 공통으로 사용하는 상태(state)를 부모 컴포넌트로 올려서 관리하는 방법

  - 결론: 공통으로 사용하는 상태(state)는 부모 컴포넌트가 가지고
        , 자식은 props로 받아서 사용한다.

*/


//문제 상황 > 두 카운트가 동일한 값으로 관리~
// function BoxA() {

//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h3>BoxA</h3>
//       <div>count: {count}</div>
//       <button onClick={e => setCount(count + 1)}>증가</button>
//     </>
//   );
// }

// function BoxB() {

//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h3>BoxB</h3>
//       <div>count: {count}</div>
//       <button onClick={e => setCount(count + 1)}>증가</button>
//     </>
//   );
// }

// function App() {

//   return (
//     <>
//       <h2>Lifting State Up</h2>
//       <BoxA />
//       <BoxB />
//     </>
//   );
// }






//상태 끌어올리기
// function BoxA(props) {

//   return (
//     <>
//       <h3>BoxA</h3>
//       <div>count: {props.count}</div>
//       {/* <button onClick={e => setCount(count + 1)}>증가</button> */}
//     </>
//   );
// }

// function BoxB(props) {

//   return (
//     <>
//       <h3>BoxB</h3>
//       <div>count: {props.count}</div>
//       {/* <button onClick={e => setCount(count + 1)}>증가</button> */}
//     </>
//   );
// }

// function App() {

//   const [count, setCount] = useState(0); //부모가 가진다.

//   return (
//     <>
//       <h2>Lifting State Up</h2>
//       <BoxA count={count} />
//       <BoxB count={count} />
//       <button onClick={e => setCount(count + 1)}>증가</button>
//     </>
//   );
// }






function BoxA(props) {

  return (
    <>
      <h3>BoxA</h3>
      <div>count: {props.count}</div>
      <button onClick={e => props.onIncrease(props.count + 1)}>증가</button>
    </>
  );
}

function BoxB(props) {

  return (
    <>
      <h3>BoxB</h3>
      <div>count: {props.count}</div>
      <button onClick={e => props.onIncrease(props.count + 1)}>증가</button>
    </>
  );
}

function App() {

  const [count, setCount] = useState(0); //부모가 가진다.

  return (
    <>
      <h2>Lifting State Up</h2>
      <BoxA count={count} onIncrease={setCount} />
      <BoxB count={count} onIncrease={setCount} />
    </>
  );
}


createRoot(document.getElementById('root')).render(<App />);