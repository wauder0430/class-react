import React from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main14.jsx

//1. <input>
//2. <textarea>
//3. <select>


// function My() {

//   const [content, setContent] = useState('');

//   function handleChange(e) {
//     setContent(e.target.value);
//   }

//   function send(e) {
//     e.preventDefault();
//     alert(content);
//   }

//   return (
//     <>
//       <h2>제어 컴포넌트 <small>textarea</small></h2>

//       <form onSubmit={send}>
//         <textarea 
//           value={content}
//           onChange={handleChange}
//           ></textarea>
//         <br />
//         <button>제출하기</button>
//       </form>

//       <hr />
      
//       <h3>현재 state값</h3>
//       <p>{content}</p>
      
//     </>
//   );
// }





// function My() {

//   const [content, setContent] = useState('blue');

//   function handleChange(e) {
//     setContent(e.target.value);
//   }

//   function send(e) {
//     e.preventDefault();
//     alert(content);
//   }

//   return (
//     <>
//       <h2>제어 컴포넌트 <small>textarea</small></h2>

//       <form onSubmit={send}>
//         <select value={content} onChange={handleChange}>
//           <option value="red">빨강</option>
//           <option value="yellow">노랑</option>
//           <option value="blue">파랑</option>
//           <option value="green">초록</option>
//           <option value="black">검정</option>
//         </select>
//         <br />
//         <button>제출하기</button>
//       </form>

//       <hr />
      
//       <h3>현재 state값</h3>
//       <p>{content}</p>
      
//     </>
//   );
// }




//<input> + <textarea> + <select> 

// function My() {

//   //1컨트롤 = 1State
//   const [name, setName] = useState('');
//   const [intro, setIntro] = useState('');
//   const [gender, setGender] = useState('');

//   function handleNameChange(e) {
//     setName(e.target.value);
//   }
  
//   function handleIntroChange(e) {
//     setIntro(e.target.value);
//   }
  
//   function handleGenderChange(e) {
//     setGender(e.target.value);
//   }

//   return (
//     <>
//       <h2>폼</h2>
//       <form>
//         <div>
//           <label>이름: </label>
//           <input 
//             type="text"
//             value={name}
//             onChange={handleNameChange}
//           />
//         </div>
//         <div>
//           <label>자기소개:</label>
//           <textarea
//             value={intro}
//             onChange={handleIntroChange}
//           ></textarea>
//         </div>
//         <div>
//           <label>성별:</label>
//           <select value={gender} onChange={handleGenderChange}>
//             <option value="m">남자</option>
//             <option value="f">여자</option>
//           </select>
//         </div>
//       </form>
//     </>
//   );
// }


function My() {

  const [form, setForm] = useState({
    name: '',
    intro: '',
    gender: ''
  });

  function handleChange(e) {

    const key = e.target.name;
    const value = e.target.value;

    // ***** state는 개발자가 직접 수정하면 안된다 > setter 사용
    // form.name = value;
    // form.intro = value;
    // form.gender = value;

    // prevForm: 수정된 전 상태의 state값 
    setForm(prevForm => ({
      ...prevForm,
      [key]: value
    }));

  }

  return (
    <>
      <h2>폼</h2>
      <form>
        <div>
          <label>이름: </label>
          <input 
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>자기소개:</label>
          <textarea
            value={form.intro} 
            name="intro"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>성별:</label>
          <select value={form.gender} 
            name="gender" onChange={handleChange}>
            <option value="m">남자</option>
            <option value="f">여자</option>
          </select>
        </div>
      </form>
    </>
  );
}




createRoot(document.getElementById('root')).render(<My />);