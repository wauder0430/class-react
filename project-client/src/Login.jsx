import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // function send(event) {
  //   event.preventDefault();
  // }

  const send = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      // 서버에 로그인 요청 비동기로
      const response = await fetch('http://localhost:8080/loginok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if(response.ok) {
        // Home으로 이동
        // location.href='/' > mpa일때
        navigate('/');

      } else {
        // 실패메시지
        setMessage('로그인 실패');
        return;
      }

    } catch (error) {
      setMessage('서버 연결 실패');
    }
  }

  return ( 
    <>
      <h2>로그인</h2>

      <form onSubmit={send}>
        <table className="vertical content">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input 
                  name="username"
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="short"
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input 
                  name="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="short"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>

      {message && <div>{message}</div>}
    
    </>

  );
}

export default Login;