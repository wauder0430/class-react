# ES6 학습 정리

JavaScript ES6(ES2015) 핵심 문법 정리 — React 수업 전 기초 다지기

---

## 1. 변수 선언 (let / const)

**ES6 이전**: `var`만 사용 (함수 스코프, 호이스팅 문제)  
**ES6 이후**: `let`(재할당 가능), `const`(재할당 불가) 도입

| 키워드 | 스코프 | 재선언 | 재할당 | 호이스팅 |
|--------|--------|--------|--------|----------|
| **var** | 함수 스코프 | ✅ | ✅ | ✅ (undefined) |
| **let** | 블록 스코프 | ❌ | ✅ | ❌ (TDZ) |
| **const** | 블록 스코프 | ❌ | ❌ | ❌ (TDZ) |

```javascript
// var - 블록 무시, 중복 선언 허용 (문제 발생 가능)
var x = 1;
var x = 2; // 재선언 가능 → 버그 위험

// let - 블록 스코프, 재할당 가능
let count = 0;
count = 1; // OK

// const - 블록 스코프, 재할당 불가
const MAX = 100;
// MAX = 200; // ❌ TypeError

// 단, 객체/배열은 내부 값 변경 가능
const user = { name: '철수' };
user.name = '영희'; // ✅ OK (참조는 변하지 않음)
```

### var vs let/const 차이

```javascript
// var 문제 - 블록을 벗어나도 살아있음
for (var i = 0; i < 3; i++) {}
console.log(i); // 3 (블록 밖에서도 접근됨)

// let 해결
for (let j = 0; j < 3; j++) {}
// console.log(j); // ❌ ReferenceError
```

### 권장 사항

- ✅ 기본적으로 `const` 사용
- ✅ 재할당이 필요한 경우에만 `let` 사용
- ❌ `var`는 사용하지 않음

---

## 2. 화살표 함수 (Arrow Function)

함수 표현식을 간결하게 작성하는 문법, `this` 바인딩 방식이 다름

| 항목 | 일반 함수 | 화살표 함수 |
|------|-----------|------------|
| **문법** | `function() {}` | `() => {}` |
| **this** | 호출 방식에 따라 결정 | 선언 시점의 this 유지 |
| **arguments** | 사용 가능 | 사용 불가 |
| **생성자** | 사용 가능 | 사용 불가 |

```javascript
// 일반 함수
function add(a, b) {
  return a + b;
}

// 화살표 함수 - 기본
const add = (a, b) => {
  return a + b;
};

// 화살표 함수 - 한 줄 (return 생략)
const add = (a, b) => a + b;

// 매개변수 1개 - 괄호 생략 가능
const double = n => n * 2;

// 매개변수 없음
const greet = () => 'Hello!';

// 객체 반환 시 괄호로 감싸야 함
const getUser = () => ({ name: '철수', age: 20 });
```

### this 바인딩 차이

```javascript
// 일반 함수 - this가 달라짐 (문제)
function Timer() {
  this.count = 0;
  setInterval(function () {
    this.count++; // this가 window를 가리킴 → 버그
    console.log(this.count); // NaN
  }, 1000);
}

// 화살표 함수 - this가 유지됨 (해결)
function Timer() {
  this.count = 0;
  setInterval(() => {
    this.count++; // this가 Timer 인스턴스를 가리킴
    console.log(this.count); // 1, 2, 3...
  }, 1000);
}
```

---

## 3. 템플릿 리터럴 (Template Literal)

백틱(`` ` ``)을 사용해 문자열 안에 변수나 표현식을 삽입하는 문법

```javascript
const name = '철수';
const age = 20;

// 기존 방식
const msg1 = '이름: ' + name + ', 나이: ' + age + '살';

// 템플릿 리터럴
const msg2 = `이름: ${name}, 나이: ${age}살`;

// 표현식 삽입
const result = `10 + 20 = ${10 + 20}`;

// 함수 호출
const upper = `이름: ${name.toUpperCase()}`;

// 여러 줄 문자열
const html = `
  <div>
    <h1>${name}</h1>
    <p>${age}살</p>
  </div>
`;
```

### 태그드 템플릿 리터럴

```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<b>${values[i]}</b>` : '');
  }, '');
}

const name = '철수';
const age = 20;
const result = highlight`이름은 ${name}이고 나이는 ${age}살입니다.`;
// "이름은 <b>철수</b>이고 나이는 <b>20</b>살입니다."
```

---

## 4. 구조 분해 할당 (Destructuring)

배열이나 객체에서 값을 꺼내 변수에 쉽게 할당하는 문법

### 배열 구조 분해

```javascript
const arr = [1, 2, 3];

// 기존 방식
const a = arr[0];
const b = arr[1];

// 구조 분해
const [x, y, z] = arr;

// 일부 건너뛰기
const [first, , third] = arr; // 1, 3

// 기본값 설정
const [p = 10, q = 20] = [1]; // p=1, q=20

// 값 교환
let m = 1, n = 2;
[m, n] = [n, m]; // m=2, n=1
```

### 객체 구조 분해

```javascript
const user = { name: '철수', age: 20, city: '서울' };

// 기존 방식
const name = user.name;
const age = user.age;

// 구조 분해
const { name, age } = user;

// 변수명 변경
const { name: userName, age: userAge } = user;

// 기본값 설정
const { name, job = '학생' } = user; // job은 없으므로 '학생'

// 함수 매개변수에서 구조 분해
function greet({ name, age }) {
  console.log(`${name}님은 ${age}살입니다.`);
}
greet(user);
```

### 중첩 구조 분해

```javascript
const data = {
  user: {
    profile: {
      name: '철수',
      age: 20
    }
  }
};

const { user: { profile: { name, age } } } = data;
```

---

## 5. 스프레드 / 나머지 연산자 (Spread / Rest)

`...` 문법을 사용하는 두 가지 역할

| 연산자 | 위치 | 역할 |
|--------|------|------|
| **Spread** | 우항 (값 펼치기) | 배열/객체를 펼쳐서 전달 |
| **Rest** | 좌항 (값 모으기) | 나머지 요소를 배열로 수집 |

### Spread 연산자

```javascript
// 배열 복사 / 합치기
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]

// 배열 복사 (깊은 복사 아님)
const copy = [...arr1];

// 객체 복사 / 병합
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // {a:1, b:2, c:3, d:4}

// 객체 속성 덮어쓰기
const updated = { ...obj1, b: 99 }; // {a:1, b:99}

// 함수 인수로 배열 전달
function sum(x, y, z) { return x + y + z; }
const nums = [1, 2, 3];
sum(...nums); // 6
```

### Rest 연산자

```javascript
// 함수 매개변수
function total(first, second, ...rest) {
  console.log(first);  // 1
  console.log(second); // 2
  console.log(rest);   // [3, 4, 5]
}
total(1, 2, 3, 4, 5);

// 배열 구조 분해에서 나머지
const [head, ...tail] = [1, 2, 3, 4];
// head = 1, tail = [2, 3, 4]

// 객체 구조 분해에서 나머지
const { name, ...others } = { name: '철수', age: 20, city: '서울' };
// name = '철수', others = { age: 20, city: '서울' }
```

---

## 6. 기본값 매개변수 (Default Parameters)

함수 매개변수에 기본값을 지정하는 문법

```javascript
// 기존 방식
function greet(name) {
  name = name || '손님';
  return `안녕하세요, ${name}!`;
}

// ES6 기본값 매개변수
function greet(name = '손님') {
  return `안녕하세요, ${name}!`;
}

greet('철수'); // '안녕하세요, 철수!'
greet();       // '안녕하세요, 손님!'
greet(undefined); // '안녕하세요, 손님!' (undefined만 기본값 사용)
greet(null);   // '안녕하세요, null!' (null은 기본값 미적용)

// 다른 매개변수를 참조 가능
function createUser(name, role = 'user', id = `${name}_${role}`) {
  return { name, role, id };
}
```

---

## 7. 단축 속성명 / 계산된 속성명

### 단축 속성명 (Shorthand Property)

```javascript
const name = '철수';
const age = 20;

// 기존 방식
const user = { name: name, age: age };

// 단축 속성명 - 변수명과 키가 같을 때 생략
const user = { name, age };

// 메서드 단축
const obj = {
  // 기존
  greet: function() { return 'Hello'; },
  // 단축
  greet() { return 'Hello'; }
};
```

### 계산된 속성명 (Computed Property)

```javascript
const key = 'name';
const idx = 1;

const user = {
  [key]: '철수',          // name: '철수'
  [`item_${idx}`]: 100   // item_1: 100
};

// 동적 키 활용 예시
function setProperty(obj, key, value) {
  return { ...obj, [key]: value };
}
```

---

## 8. 클래스 (Class)

기존 프로토타입 기반 상속을 클래스 문법으로 표현

```javascript
// ES6 클래스
class Animal {
  // 생성자
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  // 인스턴스 메서드
  speak() {
    return `${this.name}이(가) ${this.sound} 합니다.`;
  }

  // 정적 메서드 (인스턴스 없이 호출)
  static create(name, sound) {
    return new Animal(name, sound);
  }

  // getter
  get info() {
    return `[${this.name}]`;
  }
}

// 상속
class Dog extends Animal {
  constructor(name) {
    super(name, '멍멍'); // 부모 constructor 호출 필수
    this.type = '강아지';
  }

  // 메서드 오버라이드
  speak() {
    return `${super.speak()} 꼬리를 흔듭니다.`;
  }
}

const dog = new Dog('바둑이');
console.log(dog.speak()); // '바둑이이(가) 멍멍 합니다. 꼬리를 흔듭니다.'
console.log(dog instanceof Animal); // true
```

---

## 9. 모듈 (Module - import / export)

파일 단위로 코드를 분리하고 가져다 쓰는 문법

| 구분 | 문법 | 특징 |
|------|------|------|
| **named export** | `export const x = 1` | 여러 개 가능, 이름 그대로 |
| **default export** | `export default x` | 파일당 하나, 이름 변경 가능 |

### 내보내기 (export)

```javascript
// math.js

// Named export - 여러 개 가능
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// 한 번에 내보내기
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
export { multiply, divide };

// Default export - 파일당 하나
export default class Calculator { ... }
```

### 가져오기 (import)

```javascript
// 개별 import
import { PI, add } from './math.js';

// 이름 변경
import { add as sum } from './math.js';

// 전체 import
import * as Math from './math.js';
Math.add(1, 2);

// default import (이름 자유롭게 지정)
import Calculator from './math.js';

// named + default 함께
import Calculator, { PI, add } from './math.js';
```

---

## 10. 프로미스 / async-await (Promise / async-await)

비동기 처리를 위한 문법

### Promise

```javascript
// Promise 생성
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: '성공 데이터' });
    } else {
      reject(new Error('에러 발생'));
    }
  }, 1000);
});

// Promise 사용
fetchData
  .then(result => console.log(result.data))
  .catch(error => console.error(error.message))
  .finally(() => console.log('완료'));

// Promise 체이닝
fetch('/api/users')
  .then(res => res.json())
  .then(users => users.filter(u => u.active))
  .then(active => console.log(active))
  .catch(err => console.error(err));

// Promise.all - 여러 프로미스 병렬 처리
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
```

### async / await

```javascript
// async 함수는 항상 Promise를 반환
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error('서버 에러');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('에러:', error.message);
    throw error;
  }
}

// 사용
const user = await getUser(1);

// 병렬 처리
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}
```

---

## 11. Map / Set

### Map

키-값 쌍을 저장하는 자료구조 (키로 모든 타입 사용 가능)

```javascript
const map = new Map();

// 추가
map.set('name', '철수');
map.set(1, 'number key');
map.set(true, 'boolean key');

// 조회
map.get('name');   // '철수'
map.has('name');   // true
map.size;          // 3

// 삭제
map.delete('name');
map.clear();

// 이터레이션
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// 객체로부터 생성
const user = new Map(Object.entries({ name: '철수', age: 20 }));
```

### Set

중복을 허용하지 않는 값의 집합

```javascript
const set = new Set([1, 2, 3, 2, 1]);
console.log(set); // Set {1, 2, 3} — 중복 제거

// 추가 / 삭제 / 확인
set.add(4);
set.delete(1);
set.has(2); // true
set.size;   // 3

// 배열 중복 제거
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// 교집합 / 합집합 / 차집합
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

const union = new Set([...a, ...b]);        // {1,2,3,4}
const intersection = new Set([...a].filter(x => b.has(x))); // {2,3}
const difference = new Set([...a].filter(x => !b.has(x)));  // {1}
```

---

## 12. 심볼 / 이터레이터 / 제너레이터

### Symbol

유일한 식별자를 만드는 원시 타입

```javascript
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2); // false — 항상 유일

// 객체 키로 활용 (충돌 방지)
const KEY = Symbol('key');
const obj = { [KEY]: '비밀값' };
console.log(obj[KEY]); // '비밀값'
```

### 이터레이터 / 제너레이터

```javascript
// 제너레이터 - yield로 값을 하나씩 반환
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const gen = range(1, 5);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

// for...of 사용 가능
for (const n of range(1, 5)) {
  console.log(n); // 1 2 3 4 5
}

// 무한 시퀀스
function* infinite() {
  let n = 0;
  while (true) yield n++;
}
```

---

## 📚 학습 순서

### 1️⃣ let / const (변수 선언)
- var의 문제점 이해
- 블록 스코프 개념
- const 우선 사용 습관

### 2️⃣ 화살표 함수 (Arrow Function)
- 간결한 함수 표현
- this 바인딩 이해
- 콜백 함수에서의 활용

### 3️⃣ 템플릿 리터럴
- 문자열 보간
- 여러 줄 문자열
- 표현식 삽입

### 4️⃣ 구조 분해 할당 (Destructuring)
- 배열/객체에서 값 추출
- 기본값 설정
- 함수 매개변수 활용

### 5️⃣ Spread / Rest 연산자
- 배열/객체 복사 및 병합
- 나머지 매개변수
- 불변성 유지 패턴

### 6️⃣ 클래스 (Class)
- 생성자와 메서드
- 상속 (extends / super)
- getter / setter

### 7️⃣ 모듈 (import / export)
- named export vs default export
- 모듈 분리 설계
- React에서의 활용 준비

### 8️⃣ Promise / async-await
- 콜백 지옥 탈출
- 비동기 흐름 제어
- 에러 처리 패턴

---

## 🔑 핵심 정리

| 항목 | 핵심 포인트 |
|------|-----------|
| **let / const** | 블록 스코프, const 기본 사용 |
| **화살표 함수** | 간결한 문법, this가 상위 스코프 |
| **템플릿 리터럴** | 백틱 + ${}, 여러 줄 가능 |
| **구조 분해** | 배열/객체에서 변수 한 번에 추출 |
| **Spread/Rest** | `...`으로 펼치기/모으기 |
| **클래스** | 프로토타입의 문법적 설탕 |
| **모듈** | export/import로 파일 분리 |
| **async/await** | Promise를 동기처럼 작성 |
| **Map/Set** | 유연한 키/중복 없는 집합 |

---

## 📌 자주 하는 실수

### ❌ 실수 1: const 객체 재할당 시도
```javascript
// 잘못된 예
const user = { name: '철수' };
user = { name: '영희' }; // ❌ TypeError: Assignment to constant variable

// 올바른 예 - 속성 변경은 가능
const user = { name: '철수' };
user.name = '영희'; // ✅ OK
```

### ❌ 실수 2: 화살표 함수에서 this 혼동
```javascript
// 잘못된 예 - 메서드에 화살표 함수 사용
const obj = {
  name: '철수',
  greet: () => `안녕, 나는 ${this.name}` // this가 window → undefined
};

// 올바른 예 - 메서드는 일반 함수로
const obj = {
  name: '철수',
  greet() { return `안녕, 나는 ${this.name}`; } // ✅ '철수'
};
```

### ❌ 실수 3: 구조 분해 기본값을 null로 테스트
```javascript
// 잘못된 예
const { name = '손님' } = { name: null };
console.log(name); // null (기본값이 적용되지 않음)

// 기본값은 undefined일 때만 적용됨
const { name = '손님' } = { name: undefined };
console.log(name); // '손님' ✅
```

### ❌ 실수 4: async 없이 await 사용
```javascript
// 잘못된 예
function loadData() {
  const data = await fetch('/api'); // ❌ SyntaxError
}

// 올바른 예
async function loadData() {
  const data = await fetch('/api'); // ✅
}
```

### ❌ 실수 5: Spread로 깊은 복사 착각
```javascript
// 잘못된 예 - 중첩 객체는 여전히 참조 공유
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };
copy.nested.b = 99;
console.log(original.nested.b); // 99 (원본도 변경됨!)

// 올바른 예 - 깊은 복사
const deepCopy = JSON.parse(JSON.stringify(original));
// 또는 structuredClone(original) 사용
```

---

## 📖 참고 자료

- **MDN Web Docs (ES6)**: https://developer.mozilla.org/ko/docs/Web/JavaScript
- **ES6 Features**: https://es6-features.org
- **JavaScript.info**: https://ko.javascript.info
- **Babel REPL (ES6 → ES5 변환 확인)**: https://babeljs.io/repl
