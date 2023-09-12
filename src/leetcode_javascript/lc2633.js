/*
现给定一个对象，返回该对象的有效 JSON 字符串。你可以假设这个对象只包括字符串、整数、数组、对象、布尔值和 null。返回的字符串不能包含额外的空格。键的返回顺序应该与 Object.keys() 的顺序相同。

请你在不使用内置方法 JSON.stringify 的前提下解决这个问题。
 */

/**
 * @param {any} object
 * @return {string}
 */
const jsonStringify = function(object) {
    if (typeof object == "string") return `"${object}"`;
    if (object == null || typeof object == "number" || typeof object == "boolean")
        return String(object);
    if (Array.isArray(object)) {
        return `[` + object.map(jsonStringify).join(",") + `]`;
    }
    return `{` + Object.keys(object).map(k => `"${k}":${jsonStringify(object[k])}`).join(",") + `}`;
};
