/*! *****************************************************************************
@author Heming
founded at 2021-01-18 19:21:47
created by WebStorm
description: IPV4格式的ip地址和整型进行转换
参考：https://blog.csdn.net/iceman1952/article/details/7757801?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
参考：https://www.cnblogs.com/whyoop/p/3140803.html
***************************************************************************** */


/**
 * 将整数转为IPV4格式地址
 * @param integer
 * @return {string}
 */
function integerToIPV4(integer) {
  if (integer > 0xFFFFFFFF || integer < 0) throw new Error("invalid integer");
  return Array(4).fill(0).map((_, idx) => integer >> (8 * (3 - idx)) & 0xFF).join(".");
}

console.log(integerToIPV4(4294967295)); // 255.255.255.255


/**
 * IPV4格式转为整型（为防止溢出，使用了BigInt类型）
 * @param ip
 * @return {bigint}
 */
function IPV4toInteger(ip) {
  const segments = ip.split(".").map(BigInt);
  let ret = BigInt(0);
  for (let seg of segments) {
    ret = (ret << BigInt(8)) | seg;
  }
  return ret;
}

console.log(IPV4toInteger("180.101.42.30")); // 3026528798n


/**
 * 高阶函数版本
 * @param ip
 * @return {*}
 */
function IPV4toInteger1(ip) {
  return ip.split(".").map(BigInt).reduce((acc, cur) => acc << BigInt(8) | cur, BigInt(0));
}

console.log(IPV4toInteger1("10.3.3.3")); // 167969539n


/**
 * 直接移位进行运算会导致溢出，先转为字符串求出最终结果后再解析为数值
 * @param ip
 * @return {number}
 * @constructor
 */
function IPV4toInteger2(ip) {
  const hex = ip.split(".").map(Number).map(val => (val > 15 ? "" : "0") + val.toString(16));
  return parseInt(hex.join(""), 16);
}

let res1 = IPV4toInteger2("180.101.42.30");
console.log(res1); // 3026528798


/**
 * 利用无符号右移处理溢出
 * @param ip
 * @return {*}
 */
function IPV4toInteger3(ip) {
  // 处理溢出，使用无符号右移运算符抹除符号位的影响
  return ip.split(".").map(Number).reduce((acc, cur) => acc << 8 | cur, 0) >>> 0;
}

console.log(IPV4toInteger3("180.101.42.30")); // 3026528798

// const numberToIP = number => {
//   let str = number.toString(2).padStart(32, "0");
//   return Array(4)
//     .fill(0)
//     .map((_, idx) => str.substring(idx * 8, (idx + 1) * 8))
//     .map(val => parseInt(val, 2))
//     .join(".");
// }
//

// console.log(numberToIP(167969539));
