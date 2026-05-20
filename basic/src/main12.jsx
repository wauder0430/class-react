import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main12.jsx
//- map()

//1. map() + 배열

// function My() {

//   const list = ['맑음', '흐림', '비', '우박', '눈'];
//   //Each child in a list should have a unique "key" prop.

//   return (
//     <>
//       <h2>map()</h2>
//       <ul>
//         {
//           list.map(item => <li>{item}</li>)
//         }
//       </ul>
//     </>
//   );
// }



//2. key > index 사용
//- React 경고 제거
//- 배열의 추가/삭제 > 인덱스 변경 > 리액트에게 혼란 발생 > 비추천
// function My() {

//   const list = ['맑음', '흐림', '비', '우박', '눈'];

//   return (
//     <>
//       <h2>map()</h2>
//       <ul>
//         {
//           list.map((item, index) => <li key={index}>{item}</li>)
//         }
//       </ul>
//     </>
//   );
// }



//3. 객체 배열 + PK
//- DB 데이터 기준
// function My() {

//   const list = [
//     { id: 1, state: '맑음'}, 
//     { id: 2, state: '흐림'}, 
//     { id: 3, state: '비'}, 
//     { id: 4, state: '우박'}, 
//     { id: 5, state: '눈'}
//   ];

//   return (
//     <>
//       <h2>map()</h2>
//       <ul>
//         {
//           list.map((item) => <li key={item.id}>{item.state}</li>)
//         }
//       </ul>
//     </>
//   );
// }

// 4.props로 전달하는 데이터 > key가 자동으로 안들어간다.
function Item(props) {
  return (
    <>
      <li>[{props.seq}]{props.name}({props.price.toLocaleString()}원)</li>
    </>
  )
}

function List() {

  const list = [
    { seq: 1, name: '마우스', price: 30000 },
    { seq: 2, name: '키보드', price: 50000 },
    { seq: 3, name: '모니터', price: 100000 }
  ];

  return (
    <>
      <h2>상품 목록</h2>
      <ul>
        {
          list.map(product => 
            <Item 
              key={product.seq}
              seq={product.seq}
              name={product.name} 
              price={product.price} 
            />
          )
        }
      </ul>
    </>
  )

}


createRoot(document.getElementById('root')).render(<List />);