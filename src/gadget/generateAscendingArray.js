/* 尽量不适用循环语句，从给定的一个数，生成一个升序数组。如给定 5，返回 [1,2,3,4,5] */

const ge = n => Array.from(Array(n), (v, k) => k + 1);

/**
 * 不使用循环语句，就使用递归
 *
 * @param n
 * @returns {[]}
 */
function gene(n) {
  let result = [];

  (function fn() {
    result.unshift(n--);
    if (n) {
      fn();
    }
  })();

  return result;
}

console.log(ge(10));
console.log(gene(10));

// log
// [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]
// [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]


// 补充
function generate(n) {
  let ret = [];
  help(n);
  return ret;

  function help(n) {
    if (n) {
      help(n - 1);
      ret.push(n);
    }
  }
}


/**
 * 使用generator进行递归
 * @param n
 * @returns {any}
 */
function ascending(n) {
  return [...generate(n)];

  function* generate(n) {
    if (n > 0) {
      yield* generate(n - 1);
      yield n;
    }
  }
}

console.log(ascending(10));

// log
// [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]


/* 下面这种方法使用了循环语句，不过非常巧妙 */

Number.prototype[Symbol.iterator] = function* () {
  let times = this.valueOf();
  let i = 0;
  while (times--) {
    yield ++i;
  }
}

const generateArray = n => [...n];

console.log(generateArray(10));

// log
// [
//   1, 2, 3, 4,  5,
//   6, 7, 8, 9, 10
// ]


/*
modify at 2021.05.28

补充一道遇到的面试题：不适用循环，求解1 + 2 + ... + 100

不能使用循环，那就需要利用递归了
 */
function sum(n, ret = 0) {
  if (n <= 0) return ret;
  return sum(n - 1, ret + n);
}
