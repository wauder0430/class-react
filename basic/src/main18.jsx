import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';

//main18.jsx
/*

  MyBatis(복합) + JPA(단순)

  React 
  - 클라이언트 구축 기술
  - 스프링 부트(A)
    - RESTController(S) + React(C) = SPA

  JSP/Thymeleaf
  - 클라이언트 구축 기술
  - 스프링 부트(A)
    - Controller(S) + Thymeleaf(C) = MPA

  1. 컴포넌트(+JSX) + useState()
    - 화면 출력
  2. 라우트
    - 수많은 컴포넌트 > 페이지 역할(단위) > 관리/조작/이동 등
  3. 훅
    - 클래스 컴포넌트 > 함수형 컴포넌트

*/

// 라우팅: 브라우저의 요청 주소 > 어떤 컴포넌트를 출력할지 
// - 특정 주소(path) <- (매핑) -> 리액트 엘리먼트(컴포넌트)

function Home() {
  return (
    <>
      <h3>시작 페이지</h3>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
    </>
  ); 
}

function Member() {
  return (
    <>
      <h3>회원 페이지</h3>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
    </>
  ); 
}

function Admin() {
  return (
    <>
      <h3>관리자 페이지</h3>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p>
    </>
  ); 
}

// function App() {

//   return (
//     // BrowserRouter는 반드시 <Link>와 <Routes> 모두를 감싼다.
//     <BrowserRouter>

//       <h2>Route</h2>
      
//       시작 | 회원 | 관리자

//       <hr />

      {/* 콘텐츠(시작, 회원, 관리자) */}

      {/* <h3>시작 페이지</h3>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
      
      <h3>회원 페이지</h3>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
      import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom';

//main18.jsx
/*


  MyBatis(복합) + JPA(단순)


  React
  - 클라이언트 구축 기술
  - 스프링 부트(A)
    - RESTController(S) + React(C) = SPA
    - 모바일 페이지(기능이 적어.. 화면 작아서..)

  JSP/Thymeleaf
  - 클라이언트 구축 기술
  - 스프링 부트(A)
    - Controler(S) + Thymeleaf(C) = MPA


  프로젝트
  1. A
  2. B
  3. C
  4. D
  5. E


  React 수업
  1. 컴포넌트(+JSX) + useState()
    - 화면 출력
  2. 라우트
    - 수많은 컴포넌트 > 페이지 역할(단위) > 관리/조작/이동 등
  3. 훅
    - 클래스 컴포넌트 > 함수형 컴포넌트

*/


//라우팅: 브라우저의 요청 주소 > 어떤 컴포넌트를 출력할지
//- 특정 주소(path) <- (매핑) -> 리액트 엘리먼트(컴포넌트)

function Home() {

  return (
    <>
      <h3>시작 페이지</h3>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
    </>
  );
}

function Member() {

  return (
    <>
      <h3>회원 페이지</h3>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
    </>
  );
}

function Admin() {

  return (
    <>
      <h3>관리자 페이지</h3>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p>
    </>
  );
}

function NotFound() {

  return (
    <>
      <h3>404 Not found</h3>
      <p>페이지 없음.</p>
    </>
  );
}

function App() {

  return (
    // BrowserRouter는 반드시 <Link>,<Routes> 모두를 감싸는 컨테이너
    <BrowserRouter>

      <h2>Route</h2>
      
      {/* 메뉴 */}
      {/* 시작 | 회원 | 관리자 */}

      <nav>
        <Link to="/">시작</Link>
         | 
        <Link to="/member">회원</Link>
         | 
        <Link to="/admin">관리자</Link>
      </nav>

      <hr />

      {/* 콘텐츠(시작, 회원, 관리자) */}

      {/*       
      <h3>시작 페이지</h3>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>
      <p>시작 페이지입니다.</p>

      <h3>회원 페이지</h3>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>
      <p>회원 페이지입니다.</p>

      <h3>관리자 페이지</h3>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p> 
      */}


      {/* 어떤 특정 위치에 여러 컴포넌트 중 1개가 와야하는 상황 */}
      <Routes>
        {/* 컴포넌트 1개당 <Route> 1개 */}

        {/*  
          현재 App() > main.jsx > 시작 페이지

          <Routes>를 만나면
          - 최소 0개
          - 최대 1개의 <Route>를 렌더링(출력)한다
          - 선택 기준? > 브라우저의 URL == <Route path> 비교


          - http://localhost:5173/ >>> App() + Home() 호출
          - http://localhost:5173/member >>> App() + Member() 호출
        */}

        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
      /*
      <h3>관리자 페이지</h3>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p>
      <p>관리자 페이지입니다.</p> */

      {/* 어떤 특정 위치에 여러 컴포넌트 중 1개가 와야하는 상황 */}
      <Routes>
        {/* 컴포넌트 1개당 <Route> 1개 */}

        <Route path="/" element={<Home />}/>
        <Route path="/member" element={<Member />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>

  
}

createRoot(document.getElementById('root')).render(<App />);