import { createRoot } from 'react-dom/client'
import React from 'react';

// main06.jsx
// - JSX 내의 제어문
// - JSX 내에서는 if문, for문 등을 사용이 불가능하다.

// 위 문제점 해결
// 1. 외부에서 미리 해결
// 2. JSX 내에서 조건 처리를 직접하기 > 삼항 연산자
// function My() {

//     const dog = {
//         name: '강아지',
//         age: 2,
//         gender: 'm'
//     }

//     let gender;

//     if(dog.gender === 'm'){
//         gender = '남자';
//     } else {
//         gender = '여자';
//     }

//     return (
//         <>
//             <h2>JSX 제어문</h2>
//             <ul>
//                 <li>{dog.name}</li>
//                 <li>{dog.age}</li>
//                 <li>{dog.gender}</li>
//                 <li>{gender}</li>
//                 <li>{dog.gender==='m' ? '남자' : '여자'}</li>
//             </ul>
//         </>
//     )
// }

// JSX 내에서 for문 사용 불가
// 1. 외부에서 미리 작업
// 2. JSX 내부 > map(요소 => 반환값)
// function My() {

//     const list = ['강아지','고양이','토끼','거북이','곰'];

//     let content = [];

//     for(name of list) {
//         content.push(<li>{name}</li>);
//     }

//     return (
//         <>
//             <h2>반목문</h2>
//             <ul>
//                 {content}
//             </ul>
//         </>
//     );

// }

// function My() {

//     const list = ['강아지','고양이','토끼','거북이','곰'];

//     return (
//         <>
//             <h2>반목문</h2>
//             <ul>
//                 { 
//                     // list.map((item, index) => <li key={index}>{item}</li>)
//                     list.map((item, index) => <li key={item}>{item}</li>)
//                 }
//             </ul>
//         </>
//     );

// }


function My() {

    const list = [
        {
            seq: 1,
            name: '강아지'
        },
        {
            seq: 2,
            name: '고양이'
        },
        {
            seq: 3,
            name: '거북이'
        }
    ]

    return (
        <>
            <h2>반목문</h2>
            <ul>
                { 
                    list.map(item => <li key={item.seq}>{item.name}</li>)
                }
            </ul>
        </>
    );

}

createRoot(document.getElementById('root')).render(<My></My>);