/*
给定一个嵌套的数组，完成以下反转：
[1, [2, [3, [4, 5, 6]]]] // [6, [5, [4, [3, 2, 1]]]]
 */

const arr = [1, [2, [3, [4, 5, 6]]]];

/**
 * 直接在传入的原数组中做反转
 */
function deepReverse0(source) {
    const flatted = source.flat(Infinity);
    let p = 0;
    const dfs = (node) => {
        for (let i = node.length - 1; i >= 0; i--) {
            if (Array.isArray(node[i])) dfs(node[i]);
            else node[i] = flatted[p++];
        }
    };
    dfs(source);
    return source;
}

/**
 * 根据传入的数组结构创建一个新的数组
 */
function deepReverse1(source) {
    const flatted = source.flat(Infinity);
    let p = flatted.length - 1;
    const dfs = (node) => {
        const res = [];
        for (let x of node) {
            if (Array.isArray(x)) res.push(dfs(x));
            else res.push(flatted[p--]);
        }
        return res;
    };
    return dfs(source);
}

// console.log(deepReverse0(arr));
console.log(deepReverse1(arr));
