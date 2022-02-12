/* 记录一下常见的正则表达式 */

function isValidNumber(str) {
  // 需要排除掉012这种情况，同时0-9不能排除掉
  const regexp = /^[+-]?(0|[1-9]\d*(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
  // const regexp = /^[+-]?(0|[1-9]\d*|[1-9]\d*\.\d*|\.\d+)([eE][+-]?\d+)?$/;
  return regexp.test(str);
}

for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
  "1.3e2", "1E-4", "1e+12", "0"]) {
  console.log(`${str}: ${isValidNumber(str)}`);
}

for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
  ".5.", "1f5", ".", "012"]) {
  console.log(`${str}: ${isValidNumber(str)}`);
}

// log
// 1: true
// -1: true
// +15: true
// 1.55: true
// .5: true
// 5.: true
// 1.3e2: true
// 1E-4: true
// 1e+12: true
// 0: true
// 1a: false
// +-1: false
// 1.2.3: false
// 1+1: false
// 1e4.5: false
// .5.: false
// 1f5: false
//   .: false
// 012: false
