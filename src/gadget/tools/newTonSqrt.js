/** 牛顿迭代法求解非负数平方根 **/

/**
 * 返回非负数的平方根
 * @param n
 * @returns {number}
 */
function sqrt(n) {
  let x0 = n;
  let temp = -1;
  while (Math.abs(x0 * x0 - n) > Number.EPSILON) {
    temp = (x0 + n / x0) / 2;
    // 如果在某次循环过后，两次循环中得到的解（x）的值相同，便可以认为得到了精确的解，break掉循环
    if (x0 === temp) break;
    x0 = temp;
  }
  return x0;
}

// test
console.log(sqrt(0)); // 0
console.log(sqrt(1)); // 1
console.log(sqrt(64)); // 8
console.log(sqrt(99980001)); // 9999
console.log(`sqrt(0.5): ${sqrt(0.5)}`);                      // sqrt(0.5): 0.7071067811865475
console.log(`Math.sqrt(0.5): ${Math.sqrt(0.5)}`);       // Math.sqrt(0.5): 0.7071067811865476
console.log(`sqrt(633.5): ${sqrt(633.5)}`);                // sqrt(633.5): 25.16942589730644
console.log(`Math.sqrt(633.5): ${Math.sqrt(633.5)}`); // Math.sqrt(633.5): 25.16942589730644


/*
理论基础：牛顿迭代法
参考：https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E6%B3%95
参考：https://baike.baidu.com/item/%E7%89%9B%E9%A1%BF%E8%BF%AD%E4%BB%A3%E6%B3%95
 */
