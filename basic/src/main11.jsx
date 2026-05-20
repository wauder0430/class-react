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

//             <User isLogin={false} />

//         </>
//     );

// }






//삼항 영산자
//
// function User(props) {

//     const isLogin = props.isLogin;

//     // return (
//     //     <>
//     //         {isLogin ? <div>참</div> : <div>거짓</div>}
//     //     </>
//     // );
//     return (
//         <>
//             <h2>로그인 상태</h2>
//             {
//                 isLogin 
//                     ? <button>로그아웃</button>
//                     : <button>로그인</button>
//             }
//         </>
//     );

// }

// function My() {

//     return (
//         <>
//             <h2>조건부 렌더링 <small>if문</small></h2>

//             <User isLogin={false} />

//         </>
//     );

// }








/*
function test() {

    let n = -10;

    //단축 평가

    // if (n < 0 || console.log('확인')) {
    //     console.log('참');
    // }

    if (n > 0 && console.log('확인')) {
        console.log('참');
    }

}

test();
*/

//&& 연산자 (단축 평가)
//- 값이 null? > 조건부 렌더링 > 값 null, undefined, 0, 등..  Truthy, Falsy
//- 값이 존재하면 우측 항 실행
//  - 조건이 참이면 우측 항 반환
//  - 조건이 거짓이면 아무것도 출력 안함
//- 값의 null 유무에 따른 조건부 렌더링(*******)

// function Restult(props) {
//     return (
//         <>
//             {/* {props.name != null ? <div>저는 {props.name}입니다.</div>: ''} */}

//             {props.name && <div>저는 {props.name}입니다.</div>}
//         </>
//     );
// }


// function My() {
//     return (
//         <>
//             <h2>조건부 렌더링</h2>
//             <Restult name="홍길동" />
//             <Restult name="아무개" />
//             <Restult />
//         </>
//     );
// }


function UserProfile(props) {
    return (
        <>
            <h3>회원 정보</h3>

            <p>이름: {props.name}</p>

            {props.email &&
                <p>이메일: {props.email}</p>
            }

            {props.isAuthendicated &&
                <button>회원 페이지 이동하기</button>
            }
        </>
    );
}


function My() {
    return (
        <>
            <h2>조건부 렌더링</h2>

            <UserProfile name="홍길동" email="hong@gmail.com"
                isAuthendicated={true} />

            <hr></hr>

            <UserProfile name="아무개"
                isAuthendicated={false} />
        </>
    );
}



createRoot(document.getElementById('root')).render(<My />);



