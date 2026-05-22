import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from 'react-router-dom';

//main19.jsx

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

function BoardList() {

  return (
    <>
      <table>
        <tr>
          <td>1</td>
          <td><Link to="view/1">게시판입니다.</Link></td>
          <td>홍길동</td>
          <td>2026.05.22</td>
        </tr>
        <tr>
          <td>2</td>
          <td><Link to="view/2">게시판입니다.</Link></td>
          <td>홍길동</td>
          <td>2026.05.22</td>
        </tr>
        <tr>
          <td>3</td>
          <td><Link to="view/3">게시판입니다.</Link></td>
          <td>홍길동</td>
          <td>2026.05.22</td>
        </tr>
      </table>
      <hr />
      <Link to="add"><button>글쓰기</button></Link>
    </>
  );
}

function BoardAdd() {
  
  return (
    <>
      <table>
        <tr>
          <th>제목</th>
          <td><input type="text" /></td>
        </tr>
        <tr>
          <th>내용</th>
          <td><textarea></textarea></td>
        </tr>
      </table>
    </>
  );
}

function BoardView() {

  const {seq} = useParams();
  
  return (
    <>
      <table>
        <tr>
          <th>번호</th>
          <td>{seq}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>게시판입니다.</td>
        </tr>
        <tr>
          <th>내용</th>
          <td>내용입니다.</td>
        </tr>
      </table>

    </>
  );
}

function Board() {

  return (
    <>
      <h3>게시판</h3>
      <p>이 게시판은 올해까지만 운영합니다.</p>

      {/* 목록보기, 글쓰기, 상세보기 */}
      {/* 자리맡기 > Placeholder 역할 */}
      <Outlet />

    </>
  );
}

function App() {

  /*
  
    - 홈
    - 회원
    - 게시판(***)
      - 목록보기
      - 상세보기
      - 글쓰기
    
    계층 컴포넌트간의 URL 관리 + 라우팅
    > 중첩 <Route> + <Outlet>
    
  */

  return (
    <BrowserRouter>

      <h1>Project</h1>

      <nav>
        <Link to="/">홈</Link>
        |
        <Link to="/member">회원</Link>
        |
        <Link to="/board">게시판</Link>
      </nav>

      <hr />

      {/* 비추천 */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/add" element={<BoardAdd />} />
        <Route path="/board/view" element={<BoardView />} />
      </Routes> */}

      {/* 추천방식 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        {/* 중첩 라우팅 */}
        <Route path="/board" element={<Board />} >
          <Route index element={<BoardList />} />
          <Route path="add" element={<BoardAdd />} />
          <Route path="view/:seq" element={<BoardView />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);