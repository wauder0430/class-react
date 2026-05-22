import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from 'react-router-dom';


// main20.jsx

/*
  useEffect
  - Side Effect를 처리하는 훅
  - Side Effect 
    - console.log() 등

  - 컴포넌트 역할: 화면 그리는 일
    > 그리기를 마친 후 추가 작업 필요 > useEffect
  
  기본 형태
  useEffet(() => {
    // 컴포넌트 렌더링이 끝난 후(***) 실행할 코드  
  });

*/

// function App() {

//   useEffect(() => {
//     console.log('App 컴포넌트 렌더링이 완료되었습니다.');
//   });

//   return (
//     <>
//       <h2>Hooks <small>useEffect</small></h2>
      
//     </>
//   );
// }


// state와 결합 + useEffect 
// - 버튼을 몇 번 클릭했는지 > 로그 기록
// function App() {

//   // ***** state를 Setter로 변경시키면 > 컴포넌트 리렌더링(다시 생성)
//   const [count, setCount] = useState(0);

//   // 컴포넌트 렌더링 발생 때마다 > 할일 > useEffect
//   // - 만약 내용 변화가 없는 컴포넌트가 있다면 > useEffect 쓸일 없음
//   // - useEffect 컴포넌트가 가지는 상태값(state)과 관련된 업무를 자주 함.
//   useEffect(() => {
//     console.log('App 컴포넌트 렌더링이 완료되었습니다.', count);
//   });

//   return (
//     <>
//       <h2>Hooks <small>useEffect</small></h2>
//       <div>카운트: {count}</div>
//       <button onClick={() => setCount(count + 1)}>증가</button>
//     </>
//   );
// }


function App() {

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('useEffect 연습 중');

  // 그 어떤 state가 변경되도 > 렌더링 발생 > 항상 useEffec 춸
  useEffect(() => {
    console.log('App 컴포넌트 렌더링이 완료되었습니다.');
    console.log('count', count);
    console.log('message', message);
  });

  return (
    <>
      <h2>Hooks <small>useEffect</small></h2>
      <div>카운트: {count}</div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <hr />
      <div>메시지: {message}</div>
      <button onClick={() => setMessage('메시지 변경')}>메시지 변경</button>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);