import { createRoot } from 'react-dom/client'
import React from 'react';


// main02.jsx
// 한줄 태그 vs 여러줄 태그 작성하기

// 1.한 줄 태그
// const app = <h2>Hello JXS!!</h2>;

// const app = <h2>Hello JSX</h2><p>안녕하세요</p>;
// *** JSX 식에는 부모 요소가 하나 있어야 합니다.



// 2. 여러 줄 태그
//const app = <div><h2>Hello JSX</h2><p>안녕하세요.</p></div>
// const app = <div>
//                 <h2>Hello JSX</h2>
//                 <p>안녕하세요.</p>
//             </div>;

// - <></>: Fragment, Short Fragment
// - <React.Fragment></React.Fragment>
//          - 불필요한 루트 태그를 대신하기 위해 사용
// const app = <>
//                 <h2>Hello JSX</h2>
//                 <p>안녕하세요.</p>
//             </>

// const app = <React.Fragment>
//                 <h2>Hello JSX</h2>
//                 <p>안녕하세요.</p>
//             </React.Fragment>

// - React 공식: "JSX elemnets must be wrapped in a single parent element"


// 에러 발생 > 래퍼 요소 없음
// const app = 
//     (
//     <h2>Hello JSX</h2>
//     <ul>
//         <li>Item 1</li>
//         <li>Item 2</li>
//         <li>Item 3</li>
//     </ul>
//     );



// 1. <div>
// const app = 
//     (
//     <div>
//         <h2>Hello JSX</h2>
//         <ul>
//             <li>Item 1</li>
//             <li>Item 2</li>
//             <li>Item 3</li>
//         </ul>
//     </div>
//     );


// 2. <>
// - 대부분 상황에서 추천
// - import없이 사용 가능
// - key를 지원하지 않아서 > map() 에서 사용 불가능(루프 불가능)***
// const app = 
//     (
//     <>
//         <h2>Hello JSX</h2>
//         <ul>
//             <li>Item 1</li>
//             <li>Item 2</li>
//             <li>Item 3</li>
//         </ul>
//     </>
//     );


// 3. <React.Fragment>
// - import없이 사용 불가능
// - key 지원 > map()에서 사용 가능(루프 가능)
const app = 
    (
    <React.Fragment>
        <h2>Hello JSX</h2>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </React.Fragment>
    );



createRoot(document.getElementById('root')).render(app);