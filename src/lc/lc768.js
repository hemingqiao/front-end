/**
 * @param {number[]} a
 * @return {number}
 */
const maxChunksToSorted = function(a) {
    let b = a.slice();
    a.sort((num1, num2) => num1 - num2);
    let res = 0;
    let map = new Map();
    for (let i = 0, s = 0; i < a.length; i++) {
        if (map.get(a[i]) == 1) s--; // 如果 a[i] 已经出现过，减去 a[i] 会导致非零元素减 1
        if (!map.has(a[i])) s++; // 如果 a[i] 没有出现过，减去 a[i] 会导致非零元素加 1
        map.set(a[i], (map.get(a[i]) || 0) - 1);
        if (map.get(b[i]) == -1) s--; // 如果 b[i]已经出现过，加上 b[i] 会导致非零元素减 1
        if (!map.has(b[i])) s++; // 如果 b[i]没有出现过，加上 b[i] 会导致非零元素加 1
        map.set(b[i], (map.get(b[i]) || 0) + 1);
        if (s == 0) ++res;
    }
    return res;
};

// 用前缀和判断两个集合是否相同
/**
 * @param {number[]} a
 * @return {number}
 */
const maxChunksToSorted = function(a) {
    let b = a.slice();
    a.sort((num1, num2) => num1 - num2);
    let res = 0;
    for (let i = 0, s1 = 0, s2 = 0; i < a.length; i++) {
        s1 += a[i], s2 += b[i];
        if (s1 == s2) ++res;
    }
    return res;
};
