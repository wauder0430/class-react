import { Outlet } from "react-router-dom";

function Board() {
  return ( 
    <>
      <h2>게시판</h2>
      
      <Outlet />
    </>
  );
}

export default Board;