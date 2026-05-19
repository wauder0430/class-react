import { createRoot } from 'react-dom/client';
import React from 'react';

//main10.jsx
//- 이벤트 + 이벤트 객체

/*

    React Events
    - React는 HTML과 동일한 이벤트를 제공한다.
    - 이벤트 핸들러 > 캐멀 표기법 
        ex) onClick={이벤트 콜백 함수}

*/

function m1() {
    alert('클릭1');
}

function m2() {
    alert('클릭2');
}

/*
    리액트 이벤트 함수 > 이벤트 객체
    - 순수 자바 스크립트의 이벤트 객체가 아니다.
    - 리액트의 이벤트 객체는 순수 자바스크립트 이벤트 객체의 래핑 객체다.
    - 합성 이벤트(SyntheticEvent)
        - 내부 문제점 해결
        - 브라우저 호환성 유지 > 브라우저마다 event 객체가 조금씩 다르다.
                          > event의 사용법 통일  

*/

function m3(name, event) {
    alert(name);
    alert(event.type);
}

function My() {
    return (
        <>
            <h2>리액트 이벤트</h2>
            <button onClick={m1}>클릭</button>
            <button onClick={m2}>클릭</button>
            <button onClick={() => alert('클릭3')}>클릭</button>
            <button onClick={(event) => m3('홍길동', event)}>클릭</button>
        </>
    );
}

createRoot(document.getElementById('root')).render(<My/>);