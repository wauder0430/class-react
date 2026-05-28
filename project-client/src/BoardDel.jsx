import { Link, useNavigate, useParams } from "react-router-dom";

function BoardDel() {

  const {seq} = useParams();
  const navigate = useNavigate();

  const del = async () => {

    try {

      const response = await fetch(`http://localhost:8080/board/del?seq=${seq}`,{
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if(response.ok){
        navigate('/board');
        return;
      } else {
        // 삭제 실패
      }

    } catch (error) {
      // 삭제 실패
    }
  }

  return ( 
    <>
      <h3>삭제하기</h3>

      <div>
        <button type="button" onClick={del}>삭제하기</button>
        &nbsp;
        <Link to={`/board/view/${seq}`}><button type="button">취소하기</button></Link>
      </div>

    </>
  );
}

export default BoardDel;