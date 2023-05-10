/*! *****************************************************************************
@author Heming
founded at 2020-12-03 21:30:22
created by WebStorm
description: 简单模拟JSON.stringify方法和JSON.parse

关于JSON.parse，参考：
https://github.com/douglascrockford/JSON-js
https://juejin.cn/post/6844903568919527432
***************************************************************************** */

function jsonStringify(obj) {
    if (obj === undefined || typeof obj === "function") return undefined;
    if (obj === null) return "null";
    if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
    if (typeof obj === "string") return '"' + obj + '"';

    if (Array.isArray(obj)) {
        return '[' + obj.reduce((init, val) => {
            // 数组内部的undefined和function会被处理为null
            if (val === undefined || typeof val === "function") val = null;
            init.push(jsonStringify(val));
            return init;
        }, []).join(",") + ']';
    }
    if (typeof obj === "object") {
        return '{' + Object.keys(obj).reduce((acc, key) => {
            // 对象内部属性值如果为undefined或者为function，则会跳过这个属性
            if (obj[key] === undefined || typeof obj[key] === "function") return acc;
            acc.push(jsonStringify(key) + ':' + jsonStringify(obj[key]));
            return acc;
        }, []).join(",") + '}';
    }
    return '{}'; // default case
}

let a = {
    b: null,
    c: [32, 64, 1024, "pc", {d: "m1x"}, undefined, function () {
    }],
    e: {
        f: null,
        g: undefined,
        h: function () {
            console.log("foo");
        }
    },
    i: {
        j: null, k: undefined, l: function () {
        }
    },
    j: true,
    k: false
};

console.log(JSON.stringify(a));
console.log(jsonStringify(a));


// leetcode 中的 JavaScript 专题中有实现 JSON.stringify 的题目
// 并且该题约束少（只需要考虑 字符串、整数、布尔值、数组、对象和 null）
// @see https://leetcode.cn/problems/convert-object-to-json-string/

/**
 * @param {any} object
 * @return {string}
 */
const jsonStringify = function(object) {
    if (typeof object === "string") return `"${object}"`;
    if (typeof object === "number" || typeof object === "boolean") return String(object);
    if (object === null) return "null";
    if (Array.isArray(object))
        return "[" + object.map(v => jsonStringify(v)).join(",") + "]";
    return "{" + Object.keys(object).map(
        k => `${jsonStringify(k)}:${jsonStringify(object[k])}`
    ).join(",") + "}";
};
