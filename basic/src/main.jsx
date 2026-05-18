import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';

/*

  // *.jsx == 자바스크립트 파일

  JSX, JavaScript XML
  - React로 HTML을 작성하는 기술
  - JSX 필수(X) > 필수(O)
  - JavaSciprt 코드 영역에서 HTML을 직접 사용할 수 있게 해준다. (***)

  JSX 이유
  1. 컴포넌트 재사용
  2. JavaScript 텍스트 보간법 지원
  3. 자동 XSS 방어(보안) > 자동 이스케이프
  4. 컴파일 시 타입 오류 체크
  5. 함수형 프로그래밍 방식 지원

*/

// 1. JSX 사용하지 않고 구현
// - 리액트 엘리먼트, React Element
//  - 리액트 환경에서의 태그 역할 > (렌더링) > 나중에 HTML 태그

// const app = React.createElement('h1', {}, "Hello JSX!!!");
// createRoot(document.getElementById('root')).render(app);

// 2. JSX 사용해서 구현
// - <h1>Hello JSX!!</h1>: 이 구문은 HTML처럼 보여도 HTML이 아니고 리액트가 
//   JavaScript 영역에서 HTML을 손쉽게 생성하기 위해서 만든 리액트 자체 표현식

// - JSX 목적 > 리액트 엘리먼트를 생성하는 리액트만의 표현식
// - JSX > XML 문법으로 기반으로 구현 > HTML보다 엄격함.
const app = <h1>Hello JSX!!</h1>;

createRoot(document.getElementById('root')).render(app);



