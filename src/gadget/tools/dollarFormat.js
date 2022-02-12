/* 将数值格式化为形如 $ 888,888.00 的格式 */

/**
 * 格式化数字为特定格式
 * 
 * @param {*} num 
 */
function format(num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, "$ ");
}

const num = 300000;
console.log(format(num));
const dot = 188888.156;
console.log(format(dot));

// log
// $ 300,000.00
// $ 188,888.16
