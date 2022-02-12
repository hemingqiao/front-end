/* 判断类型的小工具 */

const utils = {};
const types = [
  "Boolean", "Number", "String", "Symbol", "Array", "Date", "Null", "Undefined", "Function",
  "RegExp", "Object", "Error", "BigInt"
];

types.forEach(type => {
  utils["is" + type] = function (obj) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
  };
});

console.log(utils.isArray([32, 1024])); // true
console.log(utils.isNull(null)); // true
console.log(utils);
