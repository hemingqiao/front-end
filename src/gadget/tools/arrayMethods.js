/*! *****************************************************************************
@author Heming
founded at 2020-11-26 10:31:28
created by WebStorm
description: 模拟实现数组的一些方法
***************************************************************************** */


Array.prototype.unshift = function (e) {
  for(let i = this.length - 1; i >= 0; i--) {
    this[i + 1] = this[i];
  }
  this[0] = e;
  return this;
}

// test
let a = [32, 1024];
console.log(a.unshift(64));


Array.prototype.join = function (c) {
  c = String(c);
  let res = "";
  for (let i = 0; i < this.length - 1; i++) {
    res += this[i] + c;
  }
  res += this[this.length - 1];
  // res = res.substring(0, res.length - 1);
  return res;
}

// test
console.log(a.join(","));


Array.prototype.lastIndexOf = function (val, startIndex = this.length - 1) {
  for (let i = startIndex; i >= 0; i--) {
    if (this[i] === val) {
      return i;
    }
  }
  return -1;
}

// test
console.log("lastIndexOf:", a.lastIndexOf(32, 1));


Array.prototype.slice = function (start = 0, end = this.length) {
  // 支持负数索引
  if (start < 0) start += this.length;
  if (end < 0) start += this.length;
  let res = [];
  for (let i = start; i < end; i++) {
    res.push(this[i]);
  }
  console.log("done");
  return res;
}

// test
let b = [32,1024,64,2048];
console.log(b.slice(0, 2));
console.log(b.slice());
console.log(b.slice(-2, -3));


Array.prototype.concat = function (...args) {
  let res = [];
  for (let e of this) {
    res.push(e);
  }
  for (let arg of args) {
    // for (let e of arg) {
    //   res.push(e);
    // }
    res.push(...arg);
  }
  console.log("my concat");
  return res;
}

// test
let c = ["mbp"];
console.log(c.concat(b));

/**
 * 深拷贝
 * @param obj
 * @return {*[]}
 */
function deepClone(obj) {
  const map = new Map();
  return _deepClone(obj);

  function _deepClone(obj) {
    if (obj === null) {
      return obj;
    }

    if (typeof obj === "object") {
      if (map.has(obj)) {
        return map.get(obj);
      }

      const newObj = Array.isArray(obj) ? [] : {};
      map.set(obj, newObj);
      let keys = Reflect.ownKeys(obj);
      keys.forEach(key => {
        newObj[key] = _deepClone(obj[key]);
      });
      return newObj;
    } else {
      return obj;
    }
  }
}

Array.prototype.includes = function (target) {
  for (let e of this) {
    if (Object.is(target, e)) {
      return true;
    }
  }
  return false;
}

/**
 * 同值比较算法的简单实现：+0和-0不等，NaN和NaN相等，其余行为和===相同
 * @param c1
 * @param c2
 * @return {boolean}
 */
function equal(c1, c2) {
  // 针对比较+0和-0的情况
  if (c1 === c2) return c1 !== 0 || 1 / c1 === 1 / c2;
  // 针对比较NaN和NaN
  return c1 !== c1 && c2 !== c2;
}

Array.prototype.includes = function (target) {
  for (let i = 0; i < this.length; i++) {
    if (equal(this[i], target)) return true;
  }
  return false;
}

let res = equal("a", "a");
console.log(res);
