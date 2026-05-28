import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import Member from './Member';
import Board from './Board';
import Login from './Login';
import Logout from './Logout';
import BoardList from './BoardList';
import BoardAdd from './BoardAdd';
import BoardView from './BoardView';
import BoardDel from './BoardDel';

function App() {

  // 최상위 컴포넌트 > 현재 사용자가 인증? 익명?
  // - true(인증), false(익명)
  const [isAuth, setIsAuth] = useState(null); // null > 인증? 익명?
  
  const location = useLocation();

  const navStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '.5rem',
    marginBottom: '1rem'
  };

  // useEffect(() => {}, [URL]);
  useEffect(() => {

    // effect가 호출 > 서버에 요청 > 이 사람이 인증? 익명?
      let flag = true;

    async function auth() {
      
      const response = await fetch('http://localhost:8080/member', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if(response.ok){
        // 인증 사용자
        if(flag){setIsAuth(true);}
      } else {
        // 익명 사용자
        if(flag){setIsAuth(false);}
      }
    }

    auth();

    return() => {
      flag = false;
    }

  }, [location.pathname]);

  return (
    <>
      
      <h1>Project <small>Spring Boot + React</small></h1>

      <nav style={navStyle}>

        <Link to="/">[Home]</Link>

        {isAuth === true && <Link to="/member">[Member]</Link>}
        <Link to="/board">[Board]</Link>
        
        {isAuth === false && <Link to="/login">[Login]</Link>}
        {isAuth === true && <Link to="/logout">[Logout]</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/member" element={<Member />}></Route>
        <Route path="/board" element={<Board />}> 
          <Route index element={<BoardList />} />
          <Route path="add" element={<BoardAdd />} />
          <Route path="view/:seq" element={<BoardView />} />
          <Route path="del/:seq" element={<BoardDel />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
      
    </>
  );
}

export default App;