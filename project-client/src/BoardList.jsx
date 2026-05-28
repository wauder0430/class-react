import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BoardList() {

  //가져온 게시물 목록
  const [boards, setBoards] = useState([]);

  useEffect(() => {

    const list = async () => {
      
      const response = await fetch('http://localhost:8080/board/list', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {

        //console.log(data.result);
        //console.log(data.list);
        setBoards(data.list);

      } else {
        //목록보기 실패
      }

    };

    list();

  }, []);

  return ( 
    <>
      <h3>목록보기</h3>
      
      <form>
        <table>
          <thead>
            <tr>
              <th style={{width: '50px'}}>번호</th>
              <th style={{width: 'auto'}}>제목</th>
              <th style={{width: '70px'}}>이름</th>
              <th style={{width: '110px'}}>날짜</th>
            </tr>
          </thead>
          <tbody>
            {
              boards.map(board => (
                <tr key={board.seq}>
                  <td>{board.seq}</td>
                  <td className="left">
                    <Link to={`view/${board.seq}`}>{board.subject}</Link>
                  </td>
                  <td>{board.name}</td>
                  <td>{board.regdate.substring(0, 10)}</td>
                </tr>
              ))
            }
            {boards.length === 0 &&
               <tr>
                <td colspan="4">게시물이 없습니다.</td>
               </tr>
            }
          </tbody>
        </table>
        <div>
          <Link to="add">
            <button type="button">글쓰기</button>
          </Link>
        </div>
      </form>

    </>
  );
}

export default BoardList;