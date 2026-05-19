import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css';

// main05.jsx
// - JSX냉에서 속성 조작하기
// - JSX > 태그 > 속성

// 정적
// function My() {
//     return (
//         <>
//             <h2>JSX Attribute</h2>
//             <div className="one">Content</div>
//         </>
//     )
// }

// 동적
// function My() {

//     const a = 'one';
//     const title = '풍선 도움말';

//     return (
//         <>
//             <h2>JSX Attribute</h2>
//             <div className={a} title={title}>Content {a}</div>
//         </>
//     )
// }


// 이벤트 == HTML 속성
// - 기존의 HTML 이벤트 핸들러: onclick, onmousedown
// -> 캐멀 표기법
// function My() {

//     const a = 'one';
//     const title = '풍선 도움말';

//     return (
//         <>
//             <h2>JSX Attribute</h2>
//             <div className={a} title={title}>Content {a}</div>
//             <input type="button" value="버튼" onClick={m1} /> 
//             <input type="button" value="버튼" onClick={() => {alert('m2')}} /> 
//         </>
//     )
// }

// function m1() {
//     alert('m1');
// }


// Flag 타입 속성
// function My() {

//     const result = true;

//     return (
//         <>
//             <h2>JSX Attribute</h2>
//             <div className="one">Content</div>
//             <input type="button" value="버튼" onClick={() => {alert('m2')}} disabled /> 
//             <input type="button" value="버튼" onClick={() => {alert('m2')}} disabled={false} /> 
//             <input type="button" value="버튼" onClick={() => {alert('m2')}} disabled={result} /> 
//         </>
//     )
// }


// style 속성
// - 일반 속성처럼 문자열로 CSS작성을 하면 안된다.
// - 반드시 객체로만 값을 넣을 수 있다.
function My() {

    const myStyle = {
        color: 'blue',
        fontSize: '2em',
        'font-weight': 'bold'
    };

    return (
        <>
            <h2>JSX Inline Style</h2>
            <div style={myStyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus provident quibusdam animi officiis! Quas qui minima reprehenderit, sapiente facere vel expedita nesciunt! Eaque corrupti libero autem unde. Incidunt, quisquam doloremque!
            </div>
        </>
    )
}



createRoot(document.getElementById('root')).render(<My></My>);