/*! *****************************************************************************
@author Heming
founded at 2020-12-07 13:03:07
created by WebStorm
description: if语句的使用
***************************************************************************** */

const isLeapYear = function (year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  return year % 4 === 0;
}


// or
const isLeapYear1 = year => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;

/*
说明：
year % 4 === 0 && year % 100 !== 0 会排除掉一部分是闰年的情况：mod(400) === 0
所以要使用或运算将这一部分误判的情况给补回来。
 */

/*
13. 假设如下【重新定义】闰年，写出判断闰年的函数isLeapYear
- 4的倍数
- 100的倍数不是
- 400的倍数是
- 3200的倍数不是
 */

// 对于上面重新定义的闰年计算方法而言，同样可以有两种写法

// 1 从覆盖面最小的情况开始排除
const isLeapYearNew = function (year) {
  if (year % 3200 === 0) {
    return false;
  }
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  return year % 4 === 0;
}

// 同样地，因为第一个条件把mod(400) === 0 的情况给排除掉了，所以要补回来，同时第一个条件也把mod(3200) === 0 的情况给排除掉了
// 不过，这正是所需要的，所以不用把这部分情况给补回来
const isLeapYearNew1 = year => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;


/*! *****************************************************************************
@author Heming
founded at 2020-12-07 13:08:58
created by WebStorm
description: 还有一个类似的是fizzbuzz
题目描述：
写一个程序，输出从 1 到 n 数字的字符串表示。

1. 如果 n 是3的倍数，输出“Fizz”；

2. 如果 n 是5的倍数，输出“Buzz”；

3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/fizz-buzz

***************************************************************************** */

/**
 * 从覆盖面最小的情况开始排除
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  const res = [];
  while (n) {
    if (n % 3 === 0 && n % 5 === 0) {
      res.push("FizzBuzz");
    } else if (n % 5 === 0) {
      res.push("Buzz");
    } else if (n % 3 === 0) {
      res.push("Fizz");
    } else {
      res.push(n + "");
    }
    n--;
  }
  return res.reverse();
};

console.log(fizzBuzz(15));


const fizzBuzz1 = function (n) {
  const res = Array.from(Array(n), (v, k) => String(k + 1));
  for (let i = 0; i < res.length; i++) {
    let e = res[i]
    if (e % 3 === 0 && e % 5 === 0) {
      res[i] = "FizzBuzz";
    } else if (e % 5 === 0) {
      res[i] = "Buzz";
    } else if (e % 3 === 0) {
      res[i] = "Fizz";
    }
  }
  return res;
}

console.log(fizzBuzz1(15));

/**
 * mod(3)和mod(5)都等于0可以合并为mod(15) == 0
 * @param n
 * @return {string[]}
 */
const fizzBuzz2 = function (n) {
  const res = Array.from(Array(n), (v, k) => String(k + 1));
  for (let i = 0; i < res.length; i++) {
    let e = res[i]
    if (e % 15 === 0) {
      res[i] = "FizzBuzz";
    } else if (e % 5 === 0) {
      res[i] = "Buzz";
    } else if (e % 3 === 0) {
      res[i] = "Fizz";
    }
  }
  return res;
}
