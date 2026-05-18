import { createRoot } from 'react-dom/client'
import React from 'react';


//main04.jsx

// JSX 영역내에서의 표현식
// - JSX내에서는 {}(표현식)을 사용할 수 있다.
// - ${값}
// - th:text="${값}"
// - JSX의 강력한 기능 중 하나

// - {} 영역 내부는 > 순수한 JavaScript이다. (******)
// - {}: 값을 표현하는 모든 구문을 사용할 수 있다.

function My() {

    const name = '홍길동';
    const age = 20;

    const johnDoe = {
        name: '아무개',
        age: 22
    }

    return (
        <>
            <h2>JSX</h2>
            <div>제 이름은 홍길동이고 20살입니다.</div>
            <div>제 이름은 {name}이고 {age}살입니다.</div>
            <div>제 이름은 {name}이고 {age * 2}살입니다.</div>
            <div>제 이름은 {johnDoe.name}이고 {johnDoe.age}살입니다.</div>
            <div>1 + 1 = {sum(1,1)}</div>
        </>
    );

}

function sum(a,b){
    return a+b;
}

createRoot(document.getElementById('root')).render(<My></My>);