import { createRoot } from 'react-dom/client';
import React from 'react';

//main11.jsx
//- 조건부 렌더링

/*

    JSX > 제어문 사용불가
        > 삼항 연산자 + map()

    
    조건부 렌더링 방법
    1. 외부 > if문
    2. 내부 > 삼항 연산자(Ternary, 3진법)
    3. 내부 > && 연산자(단축 평가)

*/

// 




// function User(props) {

//     const isLogin = props.isLogin;

//     if (isLogin) {
//         return (
//             <div>
//                 <h2>환영합니다.</h2>
//                 <p>로그인을 한 사람만 볼 수 있는 화면입니다.</p>
//                 <button>로그아웃</button>
//             </div>
//         );
//     } else {
//         return (
//             <div>
//                 <h2>로그인이 필요합니다.</h2>
//                 <p>서비스를 이용하려면 로그인하세요.</p>
//                 <button>로그인</button>
//             </div>
//         );
//     }
// }

// function My() {

//     return (
//         <>
//             <h2>조건부 렌더링 <small>if문</small></h2>
            
//             <User isLogin={false}></User>
//         </>
//     );

// }


// 삼항 연산자
//
function User(props) {

    const isLogin = props.isLogin;

    return (
        <>
            <h2>로그인 상태</h2>
            {
                isLogin 
                    ? <button>로그아웃</button> 
                    : <button>로그인</button>
            }
        </>
    )
}

function My() {

    return (
        <>
            <h2>조건부 렌더링 <small>if문</small></h2>
            
            <User isLogin={true}></User>
        </>
    );

}



createRoot(document.getElementById('root')).render(<My/>);