import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react'

//main27.jsx
/*

  리액트 + 데이터
  1. 더미 데이터
  2. 실제 데이터 > REST API 통신
    - 비동기 통신
      a. ajax(XMLHttpRequest)
      b. fetch(Promise를 쓰게 편하게)
      c. axios(추가 자바스크립트 라이브러리)
      d. 기타

*/

//가짜 서버 함수
//- 네트워크 상황 > 서버가 응답을 하는데 2초 정도 걸리는 상황
function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {id: 1, name: '강아지'},
        {id: 2, name: '고양이'},
        {id: 3, name: '병아리'}
      ]);
    }, 2000);
  });
}

// function App() {

//   const [list, setList] = useState([]);

//   async function load() {
//     //이 처리 > Ajax or Fetch or Axios
//     const data = await fakeFetch();
//     setList(data);
//   }

//   return (
//     <>
//       <h2>데이터 관리</h2>
//       <button onClick={load}>데이터 불러오기</button>
//       <ul>
//         {
//           list.map(item => <li key={item.id}>{item.name}</li>)
//         }
//       </ul>
//     </>
//   );
// }





// function App() {

//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   async function load() {
//     setLoading(true);

//     const data = await fakeFetch();
//     setList(data);

//     setLoading(false);
//   }

//   return (
//     <>
//       <h2>데이터 관리</h2>
//       <button onClick={load}>데이터 불러오기</button>
//       {loading && <div>불러오는 중..</div>}
//       <ul>
//         {
//           list.map(item => <li key={item.id}>{item.name}</li>)
//         }
//       </ul>
//     </>
//   );
// }






//페이지가 뜰 때 + 자동으로 데이터 가져오기
//- ex) 게시판 목록보기, 상세보기 등

//useEffect > 컴포넌트가 그려진 직 후 발생
//1. useEffect(함수) : 매번 렌더링때마다 호출, 잘 안씀
//2. useEffect(함수, [의존성 배열]) : 배열에 변경이 생길때만 호출. 조건부
//3. useEffect(함수, []) : 첫 렌더링에만 호출


//예) 게시판 목록보기
function App() {

  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await fakeFetch();
      setList(data);
      console.log(new Date());
    }
    load();
  }, []);
 
  return (
    <>
      <h2>데이터 관리</h2>
      <ul>
        {
          list.map(item => <li key={item.id}>{item.name}</li>)
        }
      </ul>
      <hr />
      <button onClick={e => setCount(count + 1)}>카운트 증가하기</button>
      <div>count: {count}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);