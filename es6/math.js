//math.js

/*
    내보내기 방식
    - named export
        1. 직접 내보내기
        2. 한번에 여러개 내보내기

    - default export
        1. 기본 내보내기


*/

// 1. 직접 내보내기
// - 선언하면서 동시에 내보내기
// - 내보내는 이름으로 불러들이기를 한다.
// export const PI = 3.14;

// const PI = 3.14;
// export {PI};



// 2. 한번에 여러개 내보내기
// const a = 10;
// const b = 20;
// export {a, b};


// 1. 기본 내보내기
// const PI = 3.14;
// //export {PI};
// export default PI;


// 모듈 > 내보내기 > 함수(***)
const sum = (a, b) => {
    return a + b;
}

const substract = (a, b) => {
    return a - b;
}

const multiple = (a, b) => {
    return a * b;
}

// export { sum, substract };
export default sum;
export {substract, multiple};