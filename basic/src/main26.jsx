import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main26.jsx
/*

  React state 관리
  - 단일값(문자열,숫자) > 쉬움(setter 사용)
  - 배열 > setter 사용 > 기존 배열 수정? 새 배열?
    - push(), splice() 등 > 기존 배열 수정 > 사용 금지!!
    - spread, filter(), map() 등 > 새로운 배열 반환 > 사용 권장!!
  - 객체 > setter 사용 > 기존 객체 수정? 새 객체?

*/


//**** 리액트는 state의 값이 변경되는지 감시 > 변경 발생 > 렌더링
// function App() {

//   const [list, setList] = useState([
//     {seq: 1, name: '강아지'}, 
//     {seq: 2, name: '고양이'}, 
//     {seq: 3, name: '병아리'}
//   ]);

//   function add() {
//     //setList([]); //[] == new Array()
//     setList([...list, {seq: 4, name: '호랑이'}]);
//   }

//   // function add() {
    
//   //   list.push({seq: 4, name: '호랑이'});
//   //   //console.log(list);

//   //   //왜?? state에 변화가 발생했는데 렌더링 발생X???
//   //   //- 배열을 조작해도 > 참조 변수의 주소값은 변화가 없음
//   //   //  > 리액트 state의 변화가 없다고 판단 > 렌더링 안함(***)
//   //   setList(list);

//   // }

//   return (
//     <>
//       <h2>불변성</h2>
//       <ul>
//         {
//           list.map(item => <li key={item.seq}>{item.name}</li>)
//         }
//       </ul>
//       <hr />
//       <button onClick={add}>추가하기</button>
      
//     </>
//   );
// }



function App() {

  //user = { name: '홍길동', age: 20 };
  const [user, setUser] = useState({ 
    name: '홍길동', 
    age: 20,
    gender: 'm',
    address: '서울시',
    tel: '010'
  });

  // function edit() {
  //   user.name = '아무개';
  //   console.log(user);
  // }

  // function edit() {
  //   user.name = '아무개';
  //   setUser(user);
  // }

  function edit() {
    
    //기존 user 객체를 버리고 > 새 객체를 생성해야 한다.(*****)
    // > 그래서 메모리 주소가 바뀌니까 > 리액트 인식 가능
    
    //{} == new Object();
    // setUser({
    //   name: '아무개',
    //   age: user.age,
    //   // gender: user.gender,
    //   // address: user.address,
    //   // tel: user.tel
    // });

    setUser({
      ...user,
      name: '아무개'
    });

  }

  function edit2() {
    setUser({
      ...user,
      age: 30,
      gender: 'f'
    });
  }

  return (
    <>
      <h2>불변성</h2>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <p>성별: {user.gender}</p>
      <p>주소: {user.address}</p>
      <p>전화: {user.tel}</p>
      <button onClick={edit}>이름 수정하기</button>
      <button onClick={edit2}>나이 수정하기</button>
    </>
  );
}




createRoot(document.getElementById('root')).render(<App />);