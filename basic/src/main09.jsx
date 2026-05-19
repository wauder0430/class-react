import { createRoot } from 'react-dom/client';
import React from 'react';

//main09.jsx
//- props.children


//모든 <Son>이 내부 구조가 같지 않을때 > Son마다 내부 구조를 다르게 만들어야 할때
// function Son(props) {
//     return (
//         <>
//             <div>
//                 <h3>아들</h3>
//                 {props.children}
//             </div>
//         </>
//     );
// }

// function Daughter(props) {
//     return (
//         <>
//             <div>
//                 <h3>딸</h3>
//                 {props.children}
//             </div>
//         </>
//     );
// }


// //모든 <Dog>이 같은 구조를 가져야될 때
// function Dog(props) {
//     return (
//         <>
//             <div>
//                 <h3>강아지</h3>
//                 <ul>
//                     <li>{props.age}</li>
//                     <li>{props.school}</li>
//                     <li>{props.char}</li>
//                 </ul>
//             </div>
//         </>
//     );
// }

// function Parent() {

//     return (
//         <>
//             <h2>자식들</h2>
//             <Son>
//                 <ul>
//                     <li>5살</li>
//                     <li>유치원 다님</li>
//                     <li>잘 까붐</li>
//                 </ul>
//             </Son>
//             <Daughter>
//                 <ul>
//                     <li>6살</li>
//                     <li>유치원 다님</li>
//                     <li>얌전함</li>
//                 </ul>
//             </Daughter>
//             <Dog age={3} school="강아지 학교" char="맨날 잠" />
//             <Son>
//                 <div>아들내미입니다.</div>
//             </Son>
//         </>
//     );

// }




//쇼핑몰
//- 상품 목록 
//- 특별 상품

//상품
function Product(props) {

    const productStyle = {
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        width: '200px'
    };

    return (
        <>
            <div style={productStyle}>
                <h3>{props.name}</h3>
                <div>{props.children}</div>
            </div>
        </>
    );

}

//상품 목록
function List() {

    const list = [
        {
            seq: 1,
            name: '마우스',
            price: 30000,
            color: '빨강'
        },
        {
            seq: 2,
            name: '키보드',
            price: 50000,
            color: '노랑'
        },
        {
            seq: 3,
            name: '모니터',
            price: 100000,
            color: '파랑'
        }
    ];

    return (
        <>
            <h2>판매 목록</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {
                    list.map(pd => {
                        return (
                            <Product key={pd.seq} name={pd.name}>
                                <p>가격: {pd.price.toLocaleString()}원</p>
                                <p>색상: {pd.color}</p>
                                <button>구매하기</button>
                            </Product>
                        );
                    })
                }
            </div>

            <hr />

            <h2>특별 상품</h2>

            <Product name="노트북">
                {/* <img src="https://placehold.co/150" /> */}
                <img src="https://picsum.photos/150" />
                <p>특별 상품입니다. 오늘부터 7일간 20% 할인 행상 중..</p>
            </Product>

        </>
    );

}

createRoot(document.getElementById('root')).render(<List />);