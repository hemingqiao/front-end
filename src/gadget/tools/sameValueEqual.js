/*! *****************************************************************************
@author Heming
founded at 2020-12-07 22:09:36
created by WebStorm
description: js中新增的同值比较算法
内置实现：Object.is等
参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
***************************************************************************** */

// polyfill
if (!Object.is) {
  Object.is = function (value1, value2) {
    if (value1 === value2) {
      // 判断 +0 != -0
      return value1 !== 0 || 1 / value1 === 1 / value2;
    }
    // 判断 NaN == NaN
    return value1 !== value1 && value2 !== value2;
  };
}
