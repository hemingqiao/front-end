/*! *****************************************************************************
@author Heming
founded at 2020-11-28 12:07:23
created by WebStorm
description: 深度对比两个对象内容是否相等
***************************************************************************** */

// update
/**
 * 返回两个对象深度比较的结果
 * @param {any} obj1
 * @param {any} obj2
 */
function deepEqual(obj1, obj2) {
  if (obj1 === null) {
    return obj2 === null;
  } else if (typeof obj1 === "object") {
    // 确保传递给_deepEqual()的两个参数均是非null的对象
    return typeof obj2 === "object" && _deepEqual(obj1, obj2);
  } else {
    if (obj1 === obj2) {
      // 判断+0和-0
      return obj1 !== 0 || 1 / obj1 === 1 / obj2;
    } else {
      // 判断NaN和NaN
      return obj1 !== obj1 && obj2 !== obj2;
    }
  }

  /**
   * 假定传入的两个参数o1和o2都是非null的对象
   * @param {any} o1
   * @param {any} o2
   * @return {boolean}
   */
  function _deepEqual(o1, o2) {
    const {toString} = Object.prototype;
    if (toString.call(o1) !== toString.call(o2)) {
      // 如果不做此步判断，会对[1, 2]和{0: 1, 1: 2, length: 2}这两个对象返回true，产生误判
      return false;
    }
    // 获取对象自身的所有属性（包括不可枚举属性和Symbol属性）
    const keysA = Reflect.ownKeys(o1);
    const keysB = Reflect.ownKeys(o2);

    // 如果两者的属性个数不同，直接返回false
    if (keysA.length !== keysB.length) {
      return false;
    }

    // 如果一个对象拥有另一个对象所没有的属性，直接返回false
    for (let key of keysA) {
      if (!keysB.includes(key)) {
        return false;
      }
    }

    // 逐一判断对应的属性是否相同（内容）
    for (let key of keysA) {
      // 特判null
      if (o1[key] === null) {
        if (o2[key] !== null) {
          return false;
        }
        break; // o1[key]和o2[key]均为null时本轮比较为true，进行下一轮比较
      }

      if (typeof o1[key] === "object") {
        if (typeof o2[key] !== "object") {
          return false;
        }

        // 如果两者都是对象，递归调用进行深度比较
        // 要确保传递给_deepEqual方法的参数是非null的对象，否则Reflect.ownKeys会抛出错误
        if (!_deepEqual(o1[key], o2[key])) {
          return false;
        }
      } else {
        if (o1[key] !== o2[key]) {
          return false;
        }
      }
    }

    return true;
  }
}

// for test
let obj = {here: {is: "an"}, object: 2};
let objCopy = Object.assign({}, obj);
console.log("deep equal obj and objCopy", deepEqual(obj, objCopy));
// → deep equal obj and objCopy true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

let oo = {
  a: 1,
  b: {
    c: [32, 1024],
    d: {
      foo: "bar"
    }
  },
  e: undefined, f: null
};

let bb = {
  a: 1,
  b: {
    c: [32, 1024],
    d: {
      foo: "bar"
    }
  },
  e: undefined, f: null
};

let r = deepEqual(oo, bb)
console.log("deep equal:", r); // deep equal: true


// old version
/**
 * 深度比较（未考虑循环引用）
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function deepEqual(a, b) {
  return _deepEqual(a, b);


  function _deepEqual(obj1, obj2) {
    // 获取对象自身的所有属性（包括不可枚举属性和Symbol属性）
    let keysA = Reflect.ownKeys(obj1);
    let keysB = Reflect.ownKeys(obj2);

    // 如果两者的属性个数不同，直接返回false
    if (keysA.length !== keysB.length) {
      return false;
    }

    // 如果一个对象拥有另一个对象所没有的属性，直接返回false
    for (let key of keysA) {
      if (!keysB.includes(key)) {
        return false;
      }
    }

    // 逐一判断对应的属性是否相同（内容）
    for (let key of keysA) {
      if (obj1[key] === null) {
        if (obj2[key] !== null) return false;
      } else {
        if (typeof obj1[key] === "object") {
          if (typeof obj2[key] !== "object") {
            // 如果obj2[key]不是对象的话，直接返回false
            return false;
          }
          // 否则，递归的比较obj1[key]和obj2[key]内容是否相等
          if (!_deepEqual(obj1[key], obj2[key])) {
            return false;
          }
        } else if (typeof obj1[key] === "function") {
          // 函数可以不予考虑
          if (obj1[key].toString() !== obj2[key].toString()) {
            return false;
          }
        } else {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      }
    }

    return true;
  }
}

// let obj = {here: {is: "an"}, object: 2};
// console.log(deepEqual(obj, obj));
// let result = deepEqual(obj, {here: 1, object: 2});
// console.log(result);
// console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));

// test
let a = {
  b: 32,
  c: 1024,
  d: {
    e: [64, 1024],
    f: function () {
      console.log("f");
    }
  },
  g: null,
  h: undefined,
  // [Symbol("foo")]: "symbol",
  i: ["end"],
};

let b = {
  b: 32,
  c: 1024,
  d: {
    e: [64, 1024],
    f: function () {
      console.log("f");
    }
  },
  g: null,
  h: undefined,
  // [Symbol("foo")]: "symbol",
  i: ["end"],
};

// 循环引用
a.R = a;
b.R = b;

// let res = deepEqual(a, b)
// console.log(res);


/**
 * 深度比较（考虑循环引用？）
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function deepEqualOpt(a, b) {
  const map1 = new Map();
  const map2 = new Map();
  return _deepEqualOpt(a, b);


  function _deepEqualOpt(obj1, obj2) {
    if (map1.has(obj1) && map2.has(obj2)) {
      return map1.get(obj1) === map2.get(obj2);
    } else {
      map1.set(obj1, obj1);
      map2.set(obj2, obj2);
    }

    // 获取对象自身的所有属性（包括不可枚举属性和Symbol属性）
    let keysA = Reflect.ownKeys(obj1);
    let keysB = Reflect.ownKeys(obj2);
    // let keysA = Object.keys(obj1);
    // let keysB = Object.keys(obj2);

    // 如果两者的属性个数不同，直接返回false
    if (keysA.length !== keysB.length) {
      return false;
    }

    // 如果一个对象拥有另一个对象所没有的属性，直接返回false
    for (let key of keysA) {
      if (!keysB.includes(key)) {
        return false;
      }
    }

    // 逐一判断对应的属性是否相同（内容）
    for (let key of keysA) {
      if (obj1[key] === null) {
        if (obj2[key] !== null) return false;
      } else {
        if (typeof obj1[key] === "object") {
          if (typeof obj2[key] !== "object") {
            // 如果obj2[key]不是对象的话，直接返回false
            return false;
          }
          // 否则，递归的比较obj1[key]和obj2[key]内容是否相等
          if (!_deepEqualOpt(obj1[key], obj2[key])) {
            return false;
          }
        } else if (typeof obj1[key] === "function") {
          // 函数可以不予考虑
          if (obj1[key].toString() !== obj2[key].toString()) {
            return false;
          }
        } else {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      }
    }

    return true;
  }
}

// test
let res = deepEqualOpt(a, b);
console.log(res);
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqualOpt(obj, obj));
let result = deepEqualOpt(obj, {here: 1, object: 2});
console.log(result);
console.log(deepEqualOpt(obj, {here: {is: "an"}, object: 2}));