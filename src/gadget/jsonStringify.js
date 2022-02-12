/*! *****************************************************************************
@author Heming
founded at 2020-12-03 21:30:22
created by WebStorm
description: 简单模拟JSON.stringify方法和JSON.parse

关于JSON.parse，参考：
https://github.com/douglascrockford/JSON-js
https://juejin.cn/post/6844903568919527432
***************************************************************************** */

/**
 * 简单模拟实现JSON.stringify方法（不完全）
 * @param {any} obj
 * @return {string}
 */
function jsonStringify(obj) {
  let regexp = /undefined|function/;
  // 如果obj为undefined或者function，直接返回undefined
  if (regexp.test(typeof obj)) {
    return "undefined";
  }

  if (obj === null) {
    return "null";
  } else if (typeof obj === "object") {
    let isArray = Array.isArray(obj);
    let res = [];
    let keys = Object.keys(obj)
    for (let key of keys) {
      let v = obj[key];

      // 特判undefined和function
      if (regexp.test(typeof v)) {
        if (isArray) {
          // 数组中的undefined和function在转为JSON时会被视为null
          res.push("null");
        }
        // 而在对象中，值为null或者function的属性在转JSON时会被直接忽略，所以在此不做处理
        continue;
      }

      if (v === null) {
        v = "null";
      } else if (typeof v === "object") {
        v = jsonStringify(v);
      } else {
        // 值为数字或者布尔类型时不拼双引号
        if (typeof v === "number" || typeof v === "boolean") {
          v = String(v);
        } else {
          v = '"' + String(v) + '"';
        }
      }
      // 处理其他非object类型值，同时将上面得到的结果推入数组中
      res.push((isArray ? "" : '"' + key + '":') + String(v));
    }
    // 根据原对象是否为数组拼接[]或者{}
    return (isArray ? "[" : "{") + String(res) + (isArray ? "]" : "}");
  } else {
    // 处理obj为其他非object类型的值的情况
    return String(obj);
  }
}


function jsonParse(json) {
  return eval("(" + json + ")");
}



// for test
console.log(JSON.stringify({c: null, d: {e: 32}}));
// console.log(JSON.stringify(logEach));
let res = jsonStringify({c: null, d: {e: 32}});
console.log(res);
const foo = () => "foo";
console.log(jsonStringify([null, undefined, foo]));
console.log(JSON.stringify([null, undefined, foo]));
console.log(jsonStringify(new Date()));
let a = {
  b: null,
  c: [32, 64, 1024, "pc", {d: "m1x"}],
  e: {
    f: null,
    g: undefined,
    h: function () {
      console.log("foo");
    }
  },
  i: {j: null, k: undefined, l: function (){}},
  j: true,
  k: false
};

let a1 = {
  b: null,
  c: [32, 64, 1024, "pc", {d: "m1x"}],
};

console.log(JSON.stringify(a));
let res1 = jsonStringify(a);
console.log(res1);


console.log(jsonStringify({
  "a": 1,
  "b": true,
  "c": null,
  "d": [1, 2, {"x": 5, "y": 6, "z": {"i": "foobar", "j": 3.45}}]
}));

console.log(jsonStringify([1, 2, 3, 4, 5]));
console.log(jsonStringify({"a": 1}));



// another version
function jsonStringify1(obj) {
  if (obj === undefined || typeof obj === "function") return undefined;
  if (obj === null) return "null";
  if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
  if (typeof obj === "string") return '"' + obj + '"';

  if (Array.isArray(obj)) {
    return '[' + obj.reduce((init, val) => {
      // 数组内部的undefined和function会被处理为null
      if (val === undefined || typeof val === "function") val = null;
      init.push(jsonStringify1(val));
      return init;
    }, []).join(",") + ']';
  }
  if (typeof obj === "object") {
    return '{' + Object.keys(obj).reduce((acc, key) => {
      // 对象内部属性值如果为undefined或者为function，则会跳过这个属性
      if (obj[key] === undefined || typeof obj[key] === "function") return acc;
      acc.push(jsonStringify1(key) + ':' + jsonStringify1(obj[key]));
      return acc;
    }, []).join(",") + '}';
  }
  return '{}'; // default case
}

let a = {
  b: null,
  c: [32, 64, 1024, "pc", {d: "m1x"}, undefined, function (){}],
  e: {
    f: null,
    g: undefined,
    h: function () {
      console.log("foo");
    }
  },
  i: {j: null, k: undefined, l: function (){}},
  j: true,
  k: false
};

console.log(JSON.stringify(a));
console.log(jsonStringify1(a));

// @see D:\20_webstorm\atools\jsonStringify1.js

