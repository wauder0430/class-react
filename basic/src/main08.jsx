import { createRoot } from 'react-dom/client';
import React from 'react';

//React
//1. 컴포넌트 + JSX
//2. props

/*

main08.jsx
- props

Props
- Properties
- 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터
- 매개변수 역할(***)
- 컴포넌트 태그의 속성 형태로 전달된다.(***)
- 읽기 전용(Immutable): 자식 컴포넌트는 부모 컴포넌트가 
    전달한 props값을 직접(****) 수정할 수 없다.
- 단방향 전달: 항상 부모 > 자식(O)
               자식 > 부모(X)    

*/


// function m1(name) {
//     console.log('이름: ' + name);
// } 

// m1('홍길동')


//Item 역할
// function Student(props) {
//     return (
//         <div>저는 {props.name}입니다.</div>
//     );
// }

// //List 역할
// function My() {
//     return (
//         <>
//             <Student />
//             <Student name="강아지" />
//             <Student name="고양이" />
//         </>
//     );
// }


// function Student(name, age, color) {
// function Student(props) {
//     return (
//         <div>저는 {props.name}입니다. {props.age}, {props.color}</div>
//     );
// }

// //List 역할
// function My() {
//     return (
//         <>
//             <Student />
//             <Student name="강아지" age="3" color="검정" />
//             <Student name="고양이" age="2" color="하양" />
//         </>
//     );
// }




// function Student(props) {
//     return (
//         <div>저는 {props.name}입니다. {props.age}, {props.color}</div>
//     );
// }

// function My() {

//     //데이터셋
//     const list = [
//         { seq: 1, name: '강아지', age: 3, color: '검정'},
//         { seq: 2, name: '고양이', age: 2, color: '하양'},
//         { seq: 3, name: '거북이', age: 100, color: '노랑'}
//     ];

//     return (
//         <>
//             {
//                 list.map(item => <Student name={item.name} age={item.age} color={item.color} />)
//             }
//         </>
//     );
// }





// function Student(props) {
//     return (
//         <div>저는 {props.name}입니다. {props.age}, {props.color}</div>
//     );
// }

//구조분해 할당으로 props 받기
// function Student({ name, age, color }) {
//     return (
//         <div>저는 {name}입니다. {age}, {color}</div>
//     );
// }

// function My() {

//     //데이터셋
//     const list = [
//         { seq: 1, name: '강아지', age: 3, color: '검정'},
//         { seq: 2, name: '고양이', age: 2, color: '하양'},
//         { seq: 3, name: '거북이', age: 100, color: '노랑'}
//     ];

//     return (
//         <>
//             {
//                 list.map(item => <Student key={item.key} name={item.name} age={item.age} color={item.color} />)
//             }
//         </>
//     );
// }



// function Student(props) {
//     return (
//         // <div>저는 {props.name}입니다. {props.age}, {props.color}</div>
//         <div>저는 {props.info.name}입니다. {props.info.age}, {props.info.color}</div>
//     );
// }

// function My() {

//     const hong = {
//         name: '홍길동',
//         age: 20,
//         color: '파랑'
//     };
    
//     return (
//         <>
//             {/* 1. 개별 속성 전달(가장 명시적) */}
//             {/* <Student name={hong.name} age={hong.age} color={hong.color} /> */}

//             {/* 2. Spread Operator 사용(가장 권장 + 필드가 여러개일때) */}
//             {/* <Student {...hong} /> */}

//             {/* 3. 객체 자체를 전달 */}
//             <Student info={hong} />
 
//         </>
//     );
// }






// //일부 속성만 props로 받기
// function Student(props) {
//     return (
//         <div>저는 {props.name}입니다.</div>
//     );
// }

// function My() {

//     const hong = {
//         name: '홍길동',
//         age: 20,
//         color: '파랑'
//     };
    
//     return (
//         <>
//             <Student name={hong.name} />
//         </>
//     );
// }





//일부 속성만 props로 받기
// function Student({name}) {
//     return (
//         <div>저는 {name}입니다.</div>
//     );
// }

// function My() {

//     const hong = {
//         name: '홍길동',
//         age: 20,
//         color: '파랑'
//     };
    
//     return (
//         <>
//             <Student {...hong} />
//         </>
//     );
// }

// function Student(props) {

//     const {name} = props;

//     return (
//         <div>저는 {name}입니다.</div>
//     );
// }

// function My() {

//     const hong = {
//         name: '홍길동',
//         age: 20,
//         color: '파랑'
//     };
    
//     return (
//         <>
//             <Student {...hong} />
//         </>
//     );
// }



// function Student({name, ...etc}) {

//     return (
//         <>
//             <div>저는 {name}입니다.</div>
//             <div>나이는 {etc.age}세</div>
//             <div>색상은 {etc.color}</div>
//         </>
//     );
// }

// function My() {

//     const hong = {
//         name: '홍길동',
//         age: 20,
//         color: '파랑'
//     };
    
//     return (
//         <>
//             <Student {...hong} />
//         </>
//     );
// }



function Student({name, age = 30, color = '검정'}) {

    return (
        <>
            <div>저는 {name}입니다.</div>
            <div>나이는 {age}세</div>
            <div>색상은 {color}</div>
        </>
    );
}

function My() {

    const hong = {
        name: '홍길동',
        age: 20,
        color: '파랑'
    };
    
    return (
        <>
            <Student {...hong} />
            <Student name="호호호" />
        </>
    );
}




createRoot(document.getElementById('root')).render(<My/>);