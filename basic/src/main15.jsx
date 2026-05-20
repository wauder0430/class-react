import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main15.jsx
/*
  React Form
  - input, textarea, select > value와 state를 연결
  - checkbox, radio > checked와 state를 연결

*/

// function My() {

//   const [checked, setChecked] = useState(false);

//   function handleChange(e) {
//     setChecked(e.target.checked)
//   }

//   function send(e){
//     alert('전송됨');
//   }

//   return (
//     <>
//       <h2>폼 <small>체크박스</small></h2>
//       <div>
//         <input 
//           type="checkbox"
//           checked={checked}
//           onChange={handleChange}
//         />
//         &nbsp;
//         동의합니다.
//         <br />
//         <button disabled={!checked} onClick={send}>제출하기</button>
//       </div>
//       <hr />
//       <h3>현재 state값</h3>
//       {/* 
//         리액트에서 아래의 값을 화면에 출력 안해준다.
//         - boolean
//         - null
//         - undefined
//       */}
//       <p>{checked.toString()}</p>
//       <p>{String(checked)}</p>
//       <p>{checked ? '동의함' : '동의하지않음'}</p>
//     </>
//   );
// }


// 여러개의 체크박스
function My() {

  const [form, setForm] = useState({
    agree: false,
    email: false
  })

  function handleChange(e) {
    const key = e.target.name;
    const checked = e.target.checked

    setForm(prevForm => ({
      ...prevForm,
      [key]: checked
    }));
  }

  return (
    <>
      <h2>폼 <small>체크박스</small></h2>
      <div>
        <label>
        <input 
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
        />
        &nbsp;
        약관에 동의합니다.
        </label>
      </div>
      <div>
        <label>
        <input 
          type="checkbox"
          name="email"
          checked={form.email}
          onChange={handleChange}
        />
        &nbsp;
        이메일 수신에 동의합니다.
        </label>
      </div>
      <hr />
      <h3>현재 state값</h3>
      <p>{form.agree ? '약관 동의함' : '약관 동의 안함'}</p>
      <p>{form.email ? '수신 동의함' : '수신 동의 안함'}</p>
    </>
  );
}


createRoot(document.getElementById('root')).render(<My />);