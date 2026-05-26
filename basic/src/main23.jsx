import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useRef } from 'react'

//main23.jsx
/*
  useRef Hook
  - 값을 저장하는 Hook
  - useState와 유사한 성질
    - useState > 변화가 생기면 렌더링 발생O(컴포넌트 X > O)
    - useRef > 변화가 생겨도 렌더링 발생X

  useState + useRef
  - 전역 변수 역할 

*/

// 리액트의 화면 출력
// - 컴포넌트 단위
// - ***** 화면에 변경 사항 발생 > 이미 화면에 출력된 컴포넌트의 내용은 수정이 불가능
//   > 컴포넌트를 다시 그리기(렌더링)
// - 컴포넌트의 변화?? > state(화면에 출력하는 용도) > state를 감시
//   > state 변화 발생 > 컴포넌트 다시 그리기

// function App() {

//   const [count, setCount] = useState(0);

//   function m1() {
//     setCount(count + 1);
//   }

//   // 문제점
//   // 1.1 일반 변수를 로딩 시 > 화면 출력 성공
//   // 1.2 일반 변수의 변화 > 리액트는 감시하지 않음 > 렌더링 안함(*****)

//   // 2.1 일반 변수는 컴포넌트의 지역 변수
//   // 2.2 state의 변화 > 렌더링 발생 > 현재 컴포넌트 소멸(지역변수 같이 소멸) > 새로 생성 
//   // 2.3 일반 변수는 렌더링에 의해서 예기치 않게 초기화가 될 가능성 다분
//   // 2.4 아래 용도로 일반 변수를 사용하는 건 비추천 > 상태 관리가 안됨    
//   let num = 0;

//   function m2() {
//     num = num + 1;
//   }

//   return (
//     <>
//       <h2>useRef</h2>
//       <div>count: {count}</div>
//       <div>num: {num}</div>
//       <button onClick={m1}>증가</button>
//       <button onClick={m2}>증가</button>
      
//     </>
//   );
// }

// function App() {

//   // useState
//   // - state 변경 발생O > 렌더링 발생O
  
//   // useRef
//   // - ref 변경 발생O > 렌더링 발생X
//   // - 스스로의 변화에는 렌더링을 못한다.
//   // - 하지만 외부 변화에는 같이 렌더링 된다.
//   // - 전역 변수 역할

//   // 정리
//   // 1. 일반 변수 > 렌더링 반응(초기화)
//   // 2. state   > 렌더링 반응(유지) + 스스로 변화(렌더링 발생함)
//   // 3. ref     > 렌더링 반응(유지) + 스스로 변화(렌더링 발생안함)

//   // const [num, setNum] = useState(0);
//   const num = useRef(0);
//   const [num2, setNum2] = useState(0);

//   function m1() {
//     num.current = num.current + 1;
//   }

//   function m2() {
//     setNum2(num2 + 1);
//   }

//   return (
//     <>
//       <h2>useRef</h2>
//       <div>num: {num.current}</div>
//       <button onClick={m1}>증가</button>
//       <div>num2: {num2}</div>
//       <button onClick={m2}>증가</button>
//     </>
//   );
// }


// 가장 많이 활용되는 useRef 사례
// - DOM 요소를 저장하는 용도
function App() {

  const [name, setName] = useState('');
  const input = useRef(null);

  function m1() {
    // document.getElementId('txt1').focus();
    input.current.focus();
  }

  function m2() {
    // input.current.value = ''; // DOM을 조작해서 수정 > 권장X
    setName(''); // state 통해서 관리 > 권장O

  }

  return (
    <>
      <h2>useRef + DOM Element</h2>
      <div>
        이름: <input type="text" value={name} ref={input} onChange={(e) => setName(e.target.value)} />
      </div>
      <hr />
      <button onClick={m1}>이름 포커스</button>
      <button onClick={m2}>이름 초기화</button>
      <hr />
      <div>이름: {name}</div>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />);