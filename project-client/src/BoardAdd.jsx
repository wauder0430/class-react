import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardAdd() {

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const navigte = useNavigate();
  
  const send = async (event) => {
    
    event.preventDefault();
    setMessage('');

    try {
      
      const response = await fetch('http://localhost:8080/board/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          subject,
          content
        })
      });

      const data = await response.json();

      //ok(200), created(201)
      if (response.ok) {
        navigte('/board'); //목록보기
      } else {
        setMessage('글쓰기 실패');
      }

    } catch (error) {
      setMessage('서버 연결 실패');
    }

  };

  return ( 
    <>
      <h3>글쓰기</h3>
      
      <form onSubmit={send}>
        <table className="vertical">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input 
                  tyep="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                  className="full" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                  className="full"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">글쓰기</button>
        </div>
      </form>
    </>
  );
}

export default BoardAdd;


/*
let name = '홍길동';
let age = 20;

const o1 = {
  name: name,
  age: age
}

const o2 = {
  name,
  age
}
*/