import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react'

//main16.jsx
/*

  React Style
  
  [지역]
  1. 인라인 스타일
    - JSX 태그의 style 속성에 JavaScript 객체를 전달하는 방식
      - <div style={객체}>
      - 객체 = {color:'blue'}
      - <div style={{color:'blue'}}>
    - 간단한 스타일이나 일부 영역에서 간단하게 사용
    - 동적으로 적용

  [전역]
  2. 일반 CSS 파일
    - *.css 파일
    - import를 사용해서 적용

  [전역]
  3. CSS Module


  [확장]
  4. styled-components


*/



/*

  1. 인라인 스타일
    - 대부분속성: 속성="단일값"
    - style="color:blue;": HTML의 일반 속성과는 성질이 다르다.
    - JSX(자바스크립트 확장 문법) > style속성같은 구조화된 데이터 
      > 자바 스크립트 객체

*/
// function App() {

//   const style = {
//     color: 'blue',
//     'font-size': '2rem'
//   };

//   return (
//     <>
//       <h2>CSS <small>CSS Module</small></h2>
//       {/* <div style="color:blue;">내용입니다.</div> */}
//       <div style={style}>내용입니다.</div>
//       <div style={{color:'red'}}>내용입니다.</div>      
//     </>
//   );
// }



//2. 일반 CSS 파일
//- style1.css

// import './style1.css';

// function App() {

//   return (
//     <>
//       <h2 className="title">CSS <small>CSS Module</small></h2>
//       <p className="content">내용입니다.</p>
//     </>
//   );
// }



//2. 일반 CSS 파일의 문제점
//- 컴포넌트가 여러개일 때
  //- ComponentA.jsx
  //- ComponentB.jsx
  //- App.jsx
//- 외부 *.css는 그 어떤 컴포넌트에 적용하더라고 전역으로 적용된다.
//  > 모든 컴포넌트에 적용된다. > 리액트 구조(컴포넌트가 여러개 (jsx))
//  > 결국 1장 HTML페이지이다.(SPA)

// import ComponentA from './ComponentA';
// import ComponentB from './ComponentB';

// function App() {

//   return (
//     <>
//       <h2 className="mainTitle">React Style</h2>
//       <ComponentA />
//       <ComponentB />
//     </>
//   );
// }




//VS Code 단축키
//- Alt + 마우스
//- Ctrl + D
//- Alt + C: 대소문자 구분 On/Off

// - Conponent
// - Component
// - conponent
// - Component
// - Conponent
// - Conponent


//3. CSS Module
//- ComponentC.jsx
//- ComponentD.jsx
//- CSS 파일내에 클래스 선택자만 사용한다.(*****)

// import ComponentC from './ComponentC';
// import ComponentD from './ComponentD';

// function App() {

//   return (
//     <>
//       <h2>React CSS</h2>
//       <ComponentC />
//       <ComponentD />
//     </>
//   );
// }




// function App() {

//   return (
//     <>
//       <h2 >CSS-in-JS</h2>
//       <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi distinctio, qui eum magni recusandae repellat, enim quod suscipit officiis facere eaque ea esse incidunt? Ullam, atque. Placeat tempore dignissimos quam!</div>
//     </>
//   );
// }


//4. styled-componets
//- React CSS-in-JS
//- 라이브러리 설치
//  $ npm install styled-components


import styled, { createGlobalStyle } from 'styled-components';

//1. 변수명 == 대문자
const Header = styled.h2`
  color: tomato;
  font-size: 3rem;
`;

const Content = styled.div`
  color: dodgerblue;
  font-size: 16px;
  line-height: 1.5rem;
`;

const Button = styled.button`
  padding : 10px 20px;
  margin: 10px;
  border: none;
  boarder-radius: '5px';
  cursor: pointer;

  // 동ㅈ거 스타일 적용 + props 활용
  background-color: ${props => props.type === 'primary' ? 'tomato' : 'orange'}; 
  color: ${props => props.type === 'primary' ? 'white' : 'black'}
`;

// 상속
const TestButton = styled(Button)`
  box-shadow: 3px 3px 3px gray;
`;


const ToggleButton = styled.button`
  padding : 10px 20px;
  margin: 10px;
  border: none;
  boarder-radius: '5px';
  cursor: pointer;

  background-color: ${props => props.active ? 'blue' : 'gray'}; 
`;

function App() {

  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  return (
    <>
      <Header>CSS-in-JS</Header>
      <Content>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi distinctio, qui eum magni recusandae repellat, enim quod suscipit officiis facere eaque ea esse incidunt? Ullam, atque. Placeat tempore dignissimos quam!</Content>
      <Button type="primary">중요한 버튼</Button>
      <Button>일반 버튼</Button>
      <Button>일반 버튼</Button>
      <TestButton type="primary">테스트 버튼(중요)</TestButton>
      <TestButton>테스트 버튼(일반)</TestButton>
    
      <h3>state와 연동한 스타일 컴포넌트</h3>
      <ToggleButton active={active}>토글 버튼: {active ? '활성 상태' : '비활성 상태'}</ToggleButton>

      <button onClick={handleClick}>상태변경</button>
    </>
  );
}


createRoot(document.getElementById('root')).render(<App />);