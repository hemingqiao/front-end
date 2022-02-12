/**
 * 将一个非负数转为对应的进制
 * @param number 十进制下的表示
 * @param n 待转化的进制
 * @param m 返回的进制的位数
 * @returns {string} 返回n进制下m位的表示
 */
function mod(number, n, m) {
  let result = [];
  while (number) {
    result.push(number % n);
    number = Math.floor(number / n);
  }
  while (result.length < m) {
    result.push(0);
  }
  return result.reverse().join("");
}


console.log(mod(3327, 7, 8)); // 12462
console.log(3327..toString(7)); // 12462
console.log(mod(3327, 2, 8)); // 110011111111
console.log(3327..toString(2)); // 110011111111
console.log(mod(6, 7, 3)); // 006
console.log(mod(6, 9, 3)); // 006
console.log(mod(6, 2, 32)); // 00000000000000000000000000000110

/**
 * 返回一个数值的逆序数值表示（保留正负号，去掉先导的0）
 * @param number
 * @returns {number}
 */
function reverseNumber(number) {
  let negativeFlag = false;
  if (number < 0) {
    number = -number;
    negativeFlag = true;
  }

  let result = 0;
  while (number) {
    result = result * 10 + number % 10;
    number = Math.floor(number / 10);
  }
  if (negativeFlag) return -result;
  return result;
}

console.log(reverseNumber(-3800));
console.log(reverseNumber(85471));

/**
 * 反转数值，加了判断是否溢出的逻辑
 * @param number
 * @returns {number}
 */
function reverseNumberOpt(number) {
  let result = 0;
  while (number !== 0) {
    let y = number % 10;
    if (number < 0) {
      // 负数向上取整
      number = Math.ceil(number / 10);
    } else {
      // 正数向下取整
      number = Math.floor(number / 10);
    }
    result = result * 10 + y;
  }
  // result | 0 超过32位的整数转换结果不等于自身，可用作溢出判断
  return (result | 0) === result ? result : 0;
}

console.log(reverseNumberOpt(Number.MAX_SAFE_INTEGER)); // 这个数值会溢出
console.log(Number.MAX_SAFE_INTEGER);
console.log(reverseNumberOpt(-123));


/**
 * 参考：https://leetcode-cn.com/problems/reverse-integer/solution/wei-yun-suan-ji-jian-jie-fa-by-ijzqardmbd/
 * @param {number} x
 * @return {number}
 */
const reverseMath = function (x) {
  let result = 0;
  while (x !== 0) {
    let y = x % 10;
    // 通过 | 0 取整，无论正负，只移除小数点部分（正数向下取整，负数向上取整）。
    x = x / 10 | 0;
    result = result * 10 + y;
  }
  // result | 0 超过32位的整数转换结果不等于自身，可用作溢出判断
  return (result | 0) === result ? result : 0;
}
