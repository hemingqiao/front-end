/*! *****************************************************************************
@author Heming
founded at 2021-10-10 17:59:02
created by WebStorm
description: 分班算法，较小的数在两边，较大的数在中间
***************************************************************************** */

/**
 * 分班算法
 *
 * @param {T[]} arr
 * @return {T[]}
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * console.log(shuffle(arr)); // [1, 4, 5, 8, 9, 10, 7, 6, 3, 2]
 *
 * @see https://keqingrong.cn/blog/2020-12-20-beyond-the-shuffle/
 */
function shuffle(arr) {
    arr = arr.slice();
    arr.sort((a, b) => a - b);
    const order = [0, 1, 1, 0];
    const left = [], right = [];
    let p = 0, i = 0;
    while (i < arr.length) {
        if (!order[p]) left.push(arr[i++]);
        else right.unshift(arr[i++]);
        p = (p + 1) % order.length;
    }
    return left.concat(right);
}

const ascendingArray = n => Array.from(Array(n), (_, i) => i + 1);

const test = ascendingArray(10);
console.log(test);
console.log(shuffle(test));
