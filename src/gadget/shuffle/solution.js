/*! *****************************************************************************
@author Heming
founded at 2021-06-26 09:54:53
created by WebStorm
description: 洗牌算法

一个元素m被放入第i个位置的概率P = 前i-1个位置选择元素时没有选中m的概率 * 第i个位置选中m的概率

参考：https://github.com/ccforward/cc/issues/44
参考：https://blog.csdn.net/qq_26399665/article/details/79831490

***************************************************************************** */

const arr = [1, 2, 3, 4, 5];
const arrCopy = arr.slice();

// O(n^2)
function shuffle1(arr) {
    let res = [];
    while (arr.length) {
        let r = Math.random() * arr.length | 0;
        res.push(arr[r]);
        arr.splice(r, 1);
    }
    return res;
}

console.log(shuffle1(arr));

function shuffle2(arr) {
    let n = arr.length;
    while (n) {
        let r = Math.random() * n-- | 0;
        [arr[r], arr[n]] = [arr[n], arr[r]];
    }
    return arr;
}

console.log(shuffle2(arrCopy));
