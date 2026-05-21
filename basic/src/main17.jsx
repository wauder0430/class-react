import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';

//main17.jsx

/* 
  React Router
  - 리액트 앱에서 라우팅 기능을 제공하는 라이브러리
  - 리액트 SPA이다.
    - 페이지 개념이 없다.
    - 사용자 입장 > 페이지 있는게 훨씬 더 자연스럽다.
    - 가상으로 페이지가 있는것처럼 보이게 > 라우트

    전통적인 방식(JSP,Spring)
    - URL 변경 > 서버에게 새 페이지 요청 > 브라우저 새 HTML 로딩

    React Router 방식
      - 페이지 1장 > URL 변경 > 서버 요청(X) > 내부 컴포넌트를 교체(페이지가 바뀌는 느낌) + 새로고칭 없음

    설치
      - $ npm install react-router-dom

    
    라우트 컴포넌트
    1. <BrowserRouter>
      - 라우팅 시스템의 전체 틀

    2. <Routes>
      - <Route>의 부모 컨테이너
      - 여로 경로들을 모아놓은 리스트 

    3. <Route>
      - 특정 경로(path, URL)과 컴포넌트의 연결 (매핑)

    4. <Link>
      - 클릭시 페이지 이동하는 역할(새로고침 아님)
      - 컴포넌트 교체 
      - <a> 역할: 공식 문서(<a href> 래핑 객체)

*/

// ***** 페이지를 여러개 만드는 작업 == 라우팅 구현

/*
  기본 라우팅
  [URL/Path]  [이전 방식]     [리액트 라우팅]
  - /         index.jsp     Home 컴포넌트
  - /about    about.jsp     About 컴포넌트
  - /contact  contact.jsp   Contact 컴포넌트
*/


function Home() {

  return (
    <>
      <h3>Home Page</h3>
      <p>시작 페이지입니다.</p>
    </>
  );
}

function About() {

  return (
    <>
      <h3>About Page</h3>
      <p>소개 페이지입니다.</p>
    </>
  );
}

function Contact() {

  return (
    <>
      <h3>Contact Page</h3>
      <p>문의 페이지입니다.</p>
    </>
  );
}




// function App() {

//   return (
//     <>
//       <h2>사이트</h2>
//       3가지 페이지 중 1개만 보여주기
//     </>
//   );
// }


// function App() {

//   return (
//     <BrowserRouter>
//       <h2>00 사이트</h2>

//       {/* 
//         <Link> 컴포넌트의 역할
//         - 리액트에게 특정 path 전달하는 역할
//         - 전달된 path와 매핑한 컴포넌트를 화면에 렌더링하라고 시키는 역할

//         링크 클릭 > 물리적인 페이지는 변경 없음
//                 > 브라우저 주소창의 주소는 변경 됨
//                 > History API 기능
//       */}
//       <nav>
//         <Link to="/" >Home</Link>&nbsp;|&nbsp;
//         <Link to="/about" >About</Link>&nbsp;|&nbsp;
//         <Link to="/contact" >Contact</Link>
//       </nav>

//       <hr />

//       {/* 
//         <Route> 1개당 웹페이지 1개 > URL 1개 할당
//       */}
//       <Routes>
//         <Route path="/" element={<Home />}/>
//         <Route path="/about" element={<About />}/>
//         <Route path="/contact" element={<Contact />}/>
//       </Routes>
    
//     </BrowserRouter>
//   );
// }

function NotFound() {
  return (
    <>
      <h3>404 Not found</h3>
      <p>존재하지 않는 페이지입니다.</p>
    </>
  );
}


// 기본 라우팅 + 404 처리
// - path="*"
//  - 위의 모든 경로와 매칭이 안되면 "*" 를 실행 > Fallback Route
// function App() {

//   return (
//     <BrowserRouter>
//       <h2>00 사이트</h2>

//       <nav>
//         <Link to="/" >Home</Link>&nbsp;|&nbsp;
//         <Link to="/about2" >About</Link>&nbsp;|&nbsp;
//         <Link to="/contact" >Contact</Link>
//       </nav>

//       <hr />

//       <Routes>
//         <Route path="/" element={<Home />}/>
//         <Route path="/about" element={<About />}/>
//         <Route path="/contact" element={<Contact />}/>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// <Link> vs <NavLink>
// - 스타일 적용
// function App() {

//   const activeStyle = {
//     color: 'tomato',
//     fontWeight: 'bold'
//   }

//   return (
//     <BrowserRouter>
//       <h2>00 사이트</h2>

//       <nav>
//         {/* <Link to="/" >Home</Link> */}
//         {/* isActive 역할: 리액트 현재 URL과 보고 있는 컴포넌트의 path를 비교 */}
//         <NavLink to="/" style={({isActive}) => isActive ? activeStyle : undefined}>Home</NavLink>
//         &nbsp;| &nbsp;
//         <NavLink to="/about" style={({isActive}) => isActive ? activeStyle : undefined}>About</NavLink>
//         &nbsp;| &nbsp;
//         <NavLink to="/contact" style={({isActive}) => isActive ? activeStyle : undefined}>Contact</NavLink>
//       </nav>

//       <hr />

//       <Routes>
//         <Route path="/" element={<Home />}/>
//         <Route path="/about" element={<About />}/>
//         <Route path="/contact" element={<Contact />}/>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



// URL 파라미터
// - /users?seq=1
// - /users/1
// - /users/2
// - /users/3

function Base() {

  return (
    <>
      <h3>유저 목록</h3>
      <ul>
        <li><Link to="/user/1">1번 회원</Link></li>
        <li><Link to="/user/2">2번 회원</Link></li>
        <li><Link to="/user/3">3번 회원</Link></li>
      </ul>
    </>
  );
}

function User() {
  
  const { id, name } = useParams();

  // 일반적 상황
  // 1. id만 넘기기
  // 2. id > ajax(fetch) > DB요청
  // 3. 나머지 정보 가져오기

  return (
    <>
      <h3>유저 정보</h3>
      <p>회원 번호: { id } </p>
      <p>회원 이름: { name } </p>
    </>
  );
}

function App() {

  return (
    <>
      <BrowserRouter>
        <h2>React Router <small>URL Parameter</small></h2>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Base />}></Route> {/*목록보기*/}
          <Route path="/user/:id" element={<User />}></Route> {/*세부보기*/}
        </Routes>

      </BrowserRouter>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);