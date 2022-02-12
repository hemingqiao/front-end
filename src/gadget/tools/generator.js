/*! *****************************************************************************
@author Heming
founded at 2021-01-29 17:17:33
created by WebStorm
description: 将一个整数拆分，正序和倒序
***************************************************************************** */

/**
 * 正序拆分整数数组
 * @param number
 * @return {Generator<Generator<*, void, any>|number|*, void, *>}
 */
function* getDigit(number) {
  if (number > 0) {
    yield* getDigit(number / 10 | 0);
    yield number % 10;
  }
}

console.log([...getDigit(123456789)]);

/**
 * 倒序拆分整数数组
 * @param number
 * @return {Generator<number, void, *>}
 */
function* getDigit1(number) {
  while (number) {
    yield number % 10;
    number = number / 10 | 0;
  }
}

console.log([...getDigit1(123456789)]);

function* traverse(root) {
  if (!root) return;
  yield* traverse(root.left);
  yield root.val;
  yield* traverse(root.right);
}
