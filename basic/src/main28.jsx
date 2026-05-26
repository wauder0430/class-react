import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main28.jsx
/*

  브라우저 저장 공간
  1. Cookies
  
  2. LocalStorage
    - 영구 저장이 가능(하드 쿠키)
    - 쿠키처럼 문자열만 저장이 가능하다.
    - 객체는 저장 불가 > JSON으로 변환해서 저장
      - JSON.stringify(): 객체 > 문자열(JSON)
      - JSON.parse():     문자열(JSON) > 객체
    a. localStorage.setItem('키', 값) //저장하기
    b. localStorage.getItem('키')     //읽기
    c. localStorage.removeItem('키')  //삭제하기

  3. SessionStorage
    - 현재 접속중일 때만 저장(메모리 쿠키)


*/


function App() {

  const [text, setText] = useState('');

  function save() {
    localStorage.setItem('message', text);
    alert('저장 완료');
  }

  useEffect(() => {
    const message = localStorage.getItem('message');
    setText(message);
  }, []);

  return (
    <>
      <h2>Browser Web API</h2>
      <input type="text"
             value={text}
             onChange={e => setText(e.target.value)}
             />
      <button onClick={save}>저장하기</button>
    </>
  );
}
ㅈ
createRoot(document.getElementById('root')).render(<App />);