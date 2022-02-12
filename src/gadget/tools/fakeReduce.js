/*! *****************************************************************************
@author Heming
founded at 2020-12-05 15:02:09
created by WebStorm
description: 模拟实现Array.prototype.reduce
***************************************************************************** */

// Array.prototype.fakeReduce = function (callbackfn, initValue) {
//   let len = this.length;
//
//   let res;
//   if (initValue !== undefined) {
//     res = initValue;
//     for (let i = 0; i < len; i++) {
//       res = callbackfn.call(null, res, this[i], i, this);
//     }
//   } else {
//     res = this[0];
//     for (let i = 1; i < len; i++) {
//       res = callbackfn.call(null, res, this[i], i, this);
//     }
//   }
//   return res;
// }

/**
 * 重构版
 * @param {function} callbackfn
 * @param initValue
 * @return {*}
 */
Array.prototype.fakeReduce = function (callbackfn, initValue) {
  let len = this.length;
  let hasInitValue = false;

  let res = this[0];
  if (arguments.length === 2) {
    res = initValue;
    hasInitValue = true;
  }
  for (let i = hasInitValue ? 0 : 1; i < len; i++) {
    res = callbackfn(res, this[i], i, this);
  }
  return res;
}

/**
 * 再重构
 * @param callbackfn
 * @param initValue
 * @return {*}
 */
Array.prototype.fakeReduce1 = function (callbackfn, initValue) {
  let len = this.length;
  let start = 0;

  let res = this[0];
  if (arguments.length === 2) {
    res = initValue;
    start = 1;
  }
  for (let i = start; i < len; i++) {
    res = callbackfn(res, this[i], i, this);
  }
  return res;
}


// for test

// let arr = [1, 2, 3, 4, 5];
// let res = arr.fakeReduce((prev, cur, idx, array) => {
//   console.log(prev, cur, idx, array);
//   return prev + cur;
// });
// console.log(res);
//
// let res1 = arr.reduce((prev, cur, idx, array) => {
//   console.log(prev, cur, idx, array);
//   return prev + cur;
// });
// console.log(res1);

// let arr = [1, 2, 3, 4, 5];
// let sum = arr.fakeReduce((prev, cur, index, arr) => {
//   console.log(prev, cur, index, arr);
//   return prev * cur;
// }, 100);
//
// console.log(sum);



// const fn1 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("fn1");
//       resolve(1);
//     }, 2000);
//   });
// }
//
// const fn2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("fn2");
//       resolve(2);
//     }, 1000);
//   });
// }
//
// const pArr = [fn1, fn2];
// const execute = (array, value) => {
//   // cur是一个函数，会返回一个代表异步操作的promise实例
//   array.reduce((prev, cur) => prev.then(cur), Promise.resolve(value));
//   // array.fakeReduce((prev, cur) => prev.then(cur), Promise.resolve(value));
// }
//
// execute(pArr, 32);


/**
 * 简单实现同值比较算法（NaN和NaN相等，+0和-0不等）
 * @param a
 * @param b
 * @return {boolean}
 */
function equal(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  return a !== a && b !== b;
}

// for test
console.log(equal(NaN, NaN));
console.log(equal(+0, -0));
console.log(equal(+0, 0));
console.log(equal(-0, 0));
console.log(`Object.is: `);
console.log(Object.is(NaN, NaN));
console.log(Object.is(+0, -0));
console.log(Object.is(+0, 0));
console.log(Object.is(-0, 0));
