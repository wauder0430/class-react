import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useRef } from 'react'

//main25.jsx
/*

  여태의 수업 > 단일값 저장/관리 > state
  - const [count, setCount] = useState(0);
  - const [name, setName] = useState('홍길동');

  현재 수업 > 배열 > state
  - const [list, setList] = useState([]);

  이 후 state를 관리하는 방식(*****)

*/


// function App() {

//   //list = ['강아지', '고양이', '병아리'];
//   const [list, setList] = useState(['강아지', '고양이', '병아리']);

//   return (
//     <>
//       <h2>배열 state</h2>
//       <ul>
//         {
//           list.map((item, index) => <li key={index}>{item}</li>)
//         }
//       </ul>
//     </>
//   );
// }






// function App() {

//   //list = ['강아지', '고양이', '병아리'];
//   const [list, setList] = useState(['강아지', '고양이', '병아리']);
//   const [text, setText] = useState('');

//   // function add() {
//   //   if (text.trim() === '') return;

//   //   //Setter > 덮어쓰기
//   //   //setList(수정된 배열)
//   //   //setList([기존 배열 요소들, ])
//   //   //setList(['강아지', '고양이', '병아리', '호랑이']);
//   //   setList([...list, text]);
//   //   setText(''); //=텍스트 초기화
//   // }

//   function add() {
//     if (text.trim() === '') return;

//     //메모리의 배열 수정(O) > 화면에 다시 그리기(X) ?? setter 미사용
//     //직접 수정X
//     list.push(text);
//     //list[3] = text;

//     console.log(list);

//   }

//   return (
//     <>
//       <h2>배열 state</h2>
//       <input type="text" value={text} onChange={e => setText(e.target.value)} />
//       <button onClick={add}>추가하기</button>
//       <hr />
//       <ul>
//         {
//           list.map((item, index) => <li key={index}>{item}</li>)
//         }
//       </ul>
//     </>
//   );
// }





//배열 state > 모든 관리(추가,수정,삭제)
function App() {

  const maxId = useRef(3);

  const [list, setList] = useState([
    {id: 1, name: '강아지'},
    {id: 2, name: '고양이'},
    {id: 3, name: '병아리'}
  ]);
  const [text, setText] = useState('');

  function add() {
    if (text.trim() === '') return;

    maxId.current = maxId.current + 1;

    const newItem = {
      id: maxId.current,
      name: text
    };

    setList([...list, newItem]); //***
    setText('');

  }

  function del(id) {
    //console.log(list.filter(item => item.id !== id));
    setList(list.filter(item => item.id !== id));
  }

  function edit(id) {

    if (text.trim() === '') return;

    //['강아지', '고양이', '병아리']
    // console.log(list.map(item => {
    //   return item.id === id ? 
    //           {...item, name:text}
    //           : item
    // }));

    setList(list.map(item => {
      return item.id === id ? 
              {...item, name:text}
              : item
    }));

    setText('');

  }

  return (
    <>
      <h2>배열 state</h2>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>추가하기</button>
      <hr />
      <ul>
        {
          list.map((item) => 
              <li key={item.id}>
                {item.name}
                &nbsp;
                {/* del() 호출 시점이 다르다(***) */}
                {/* <button onClick={del(item.id)}>&times;</button> */}
                <button onClick={() => del(item.id)}>&times;</button>
                <button onClick={() => edit(item.id)}>=</button>
              </li>)
        }
      </ul>
    </>
  );
}


// 자바스크립트
// <button onclick="del(5);">버튼</button>





createRoot(document.getElementById('root')).render(<App />);