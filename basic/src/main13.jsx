import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main13.jsx
/*
  React Form
  - HTML처럼 React도 폼 + 하위 요소를 통해서 사용자와 상호 작용을 한다.
  - <form>, <input>, <button> 등 그대로 사용

  ***** "입력값을 누가 가지고 있는가?"
  - 컨트롤(화면) vs 리액트

  1. 전통적인 HTML 방식
    - basic > "ex13.html"

  2. 리액트 방식 > Controlled Component(제어 컴포넌트)
    - basic > "main13.jsx"

*/

// function My() {

//   let txt1, txt2;

//   txt1 = '홍길동';

//   function m1(e) {
//     //console.log('m1');    
//     txt2 = e.target.value;

//   }

//   return (
//     <>
//       <h2>제어 컴포넌트</h2>
//       <form>
//         <input 
//           type="text" 
//           onChange={m1}
//         />
//         <hr />
//         <div>초기값: {txt1} </div>
//         <div>현재 입력값: {txt2}</div>
//       </form>
//     </>
//   );
// }

// Hook
// - 특정 함수들
// - 리액트 컴포넌트: 클래스 > 함수형

// Controlled Component
// - Hook > 배열 반환
// function My() {

//   // useState > state 값의 역할
//   // - 컨트롤의 값을 매핑하는 역할
//   // 1. setState() 호출될 때 > 리액트가 화면을 갱신시킨다.
//   // 2. state 변경할 때 > 리액트가 갱신 안한다.

//   // useState훅
//   // - 배열(0: 변수, 1: 함수)
//   // - 이 변수는 수정을 하면 화면이 갱신된다. (*******)
//   //  - 이 변수를 수정하는 유일한 방법은 Setter
//   //  - Setter를 안쓰고 이 변수를 직접 수정하면 화면 갱신이 안된다. > 이 변수 필요없음
//   const [text, setText] = useState(''); // text == state(상태값)

//   function m1(e) {

//     // text = e.target.value;
//     setText(e.target.value);

//   }

//   return (
//     <>
//       <h2>제어 컴포넌트</h2>
//       <form>
//         <input 
//           type="text" 
//           onChange={m1}
//         />
//         <hr />
//         <div>현재 입력값: {text}</div>
//       </form>
//     </>
//   );
// }

/*
  리액트 > SPA(Single Page Application)

  리액트에서의 데이터 전송
  1. 기존 <form> 방식을 사용 안한다.(MPA)
  2. 비동기 통신을 사용한다. (ajax, fetch, )


*/

// function My() {

//   const [text, setText] = useState('');

//   function m1(e) {
//     setText(e.target.value);
//   }

//   function send(e) {
//     e.preventDefault();

//     // ajax > 서버로 전송
//     alert(text);
//   }

//   return (
//     <>
//       <h2>제어 컴포넌트</h2>
//       <form onSubmit={send}>
//         <input 
//           type="text" 
//           onChange={m1}
//         />
//         <hr />
//         <div>현재 입력값: {text}</div>
//         <hr />
//         <button type="submit">보내기</button>
//       </form>
//     </>
//   );
// }


// 유효성 검사 + 제출
// - 리액트 > state 값을 setState()을 사용해서 변경 > 렌더링을 다시 한다. 
// > 기존 컴포넌트를 버리고 > 컴포넌트를 새로 만든다.
function My() {

  // 보관되는 장소가 컴포넌트 내부가 아니라 외부에 리액트가 따로 관리한다.
  const [text, setText] = useState('초깃값'); 

  const isValid = text.length > 5;

  function m1(e) {
    setText(e.target.value);
  }

  function send(e) {
    e.preventDefault();

    alert(text); // 전송하기
  }

  return (
    <>
      <h2>제어 컴포넌트</h2>
      <form onSubmit={send}>
        <input 
          type="text" 
          onChange={m1}
          value={text}
        />
        <hr />
        {!isValid &&
          <p>6자 이상을 입력하세요.</p>
        }
        <hr />
        <div>현재 입력값: {text}</div>
        <hr />
        <button type="submit">보내기</button>
      </form>
    </>
  );
}

createRoot(document.getElementById('root')).render(<My />);