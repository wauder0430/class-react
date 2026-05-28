import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function BoardView() {

  //- /board/view/20
  const {seq} = useParams();
  const [board, setBoard] = useState(null); //게시물

  useEffect(() => {

    const get = async () => {

      const response = await fetch(`http://localhost:8080/board/view?seq=${seq}`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {

        setBoard(data.board);

      } else {
        //상세 보기 실패
      }

    };

    get();

  }, [seq]);

  if (board === null) {
    return <p>조회 중..</p>;
  }

  return ( 
    <>
      <h3>상세보기</h3>
      
      <form>
        <table className="vertical">
          <tbody>
            <tr>
              <th>번호</th>
              <td>{board.seq}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{board.name}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{board.subject}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{board.content}</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{board.regdate}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <Link to={`/board/del/${seq}`}><button type="button">삭제하기</button></Link>
        </div>
      </form>
    </>
  );
}

export default BoardView;