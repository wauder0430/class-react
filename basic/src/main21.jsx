import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from 'react-router-dom';

// main21.jsx
/* 
  useEffect + 의존성 배열
    - useEffect(() => {}, [의존성 배열])
    - [의존성 배열] 역할: 이 배열의 값이 변경될 때만 useEffect를 호출
    1.[]
    2.[값]

*/

// 1. 의존성 배열이 없을 때(main20.jsx)
// function App() {

//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     console.log('렌더링 발생');
//   });

//   return (
//     <>
//       <h2>Hooks <small>useEffect</small></h2>
//       <div>count: {count}</div>
//       <button onClick={() => setCount(count + 1)}>카운트 증가</button>
//       <hr />
//       <input type="text" vlaue={text} onChange={(e) => setText(e.target.value)}/>
//     </>
//   );
// }

// 2. 의존성 배열 사용
// - [] 빈 배열 사용
// - App() 컴포넌트가 처음 렌더링 될때만 실행 > 그 이후 렌더링에는 실행 안함
// - 생성자 역할, onload 이벤트 역할 
// - 초기 설정, 최초 데이터 로딩 등.. 작업
// function App() {

//   const [count, setCount] = useState(0);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     console.log('렌더링 발생');
//   }, []);

//   return (
//     <>
//       <h2>Hooks <small>useEffect</small></h2>
//       <div>count: {count}</div>
//       <button onClick={() => setCount(count + 1)}>카운트 증가</button>
//       <hr />
//       <input type="text" vlaue={text} onChange={(e) => setText(e.target.value)}/>
//     </>
//   );
// }


// 3. 의존성 배열 사용
// - [값]: 이 값이 변경될 때만 useEffect 호출
function App() {

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('렌더링 발생');
  }, [count, text]);

  return (
    <>
      <h2>Hooks <small>useEffect</small></h2>
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <hr />
      <input type="text" vlaue={text} onChange={(e) => setText(e.target.value)}/>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);