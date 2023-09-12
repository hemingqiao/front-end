/*
编写一个函数，将对象数组 arr 转换为矩阵 m 。

arr 是一个由对象组成的数组或一个数组。数组中的每个项都可以包含深层嵌套的子数组和子对象。它还可以包含数字、字符串、布尔值和空值。

矩阵 m 的第一行应该是列名。如果没有嵌套，列名是对象中的唯一键。如果存在嵌套，列名是对象中相应路径，以点号 "." 分隔。

剩余的每一行对应 arr 中的一个对象。矩阵中的每个值对应对象中的一个值。如果给定对象在给定列中没有值，则应该包含空字符串 "" 。

矩阵中的列应按 字典升序 排列。
 */

const isObject = o => typeof o == "object" && o != null;

/**
 * @param {Array} arr
 * @return {Matrix}
 */
const jsonToMatrix = function(arr) {
    const keySet = new Set();
    const get = (obj, path, map) => {
        if (!isObject(obj)) {
            keySet.add(path);
            map.set(path, obj);
            return;
        }
        for (let k in obj)
            get(obj[k], path == "" ? `${k}` : `${path}.${k}`, map);
    };
    const n = arr.length, maps = [];
    for (let i = 0; i < n; i++) {
        maps.push(new Map());
        get(arr[i], "", maps[i]);
    }
    const res = [], allKeys = [...keySet].sort();
    res.push(allKeys);
    for (let i = 0; i < n; i++) {
        const t = [];
        for (let k of allKeys)
            t.push(maps[i].has(k) ? maps[i].get(k) : "");
        res.push(t);
    }
    return res;
};

const arr = [
    {"a": {"b": 1, "c": 2}},
    {"a": {"b": 3, "d": 4}}
];
console.log(jsonToMatrix(arr));
