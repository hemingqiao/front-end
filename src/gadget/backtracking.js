/*! *****************************************************************************
@author Heming
founded at 2020-12-26 21:04:14
created by IntelliJ IDEA
description: eloquent js中作者给出的一个回溯算法。
给定某个值，找出从1开始，每次可以执行乘3或者加5的操作，使得等于给定的值。
***************************************************************************** */

function backtracking(target) {
  const table = [];
  dfs(1, target, "1");
  return table;

  function dfs(cur, tar, history) {
    if (cur >= tar) { // 递归结束条件，当前值大于等于目标值
      if (cur === tar) {
        table.push(history);
      }
      return;
    }
    dfs(cur * 3, tar, `${history} * 3`);
    dfs(cur + 5, tar, `(${history} + 5)`);
  }
}

console.log(backtracking(52));

// log
// [
//   '(((((1 * 3 * 3 * 3 + 5) + 5) + 5) + 5) + 5)',
//   '(((1 * 3 * 3 + 5) * 3 + 5) + 5)'
// ]

