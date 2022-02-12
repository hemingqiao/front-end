/* 利用reduce简单实现数组实例的map方法 */

/**
 * map 方法会返回一个新的数组，forEach 则不会返回新的数组。如果需要得到一个新的数组，则使用map，否则一般使用forEach
 *
 * @param callback
 * @param thisArg
 * @returns {*}
 */
Array.prototype.myMap = function (callback, thisArg) {
  return this.reduce((mappedArray, currentValue, index, array) => {
    mappedArray[index] = callback.call(thisArg, currentValue, index, array);
    return mappedArray;
  }, []);
}


// test
let array = [32, 1024, 64];
let resultArr = array.myMap((value, index, array) => {
  return {value: value, index: index, length: array.length};
});
console.log(resultArr);


// result:
// [
//   { value: 32, index: 0, length: 3 },
//   { value: 1024, index: 1, length: 3 },
//   { value: 64, index: 2, length: 3 }
// ]


/*
朴素循环实现map
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  let ret = [];
  for (let [i, v] of this.entries()) {
    ret.push(callbackFn.call(thisArg, v, i, this));
  }
  return ret;
}


/* 简单实现reduce */

Array.prototype.myReduce = function (callbackFn, initValue) {
  let n = this.length;
  if (n === 0 && arguments.length === 1) {
    throw new TypeError("reduce with empty array with no initial value");
  }
  if (n === 0 && arguments.length === 2) return initValue;
  let res = this[0], startIndex = 1;
  if (arguments.length === 2) {
    res = initValue;
    startIndex = 0;
  }
  for (let i = startIndex; i < this.length; i++) {
    res = callbackFn.call(this, res, this[i], i, this);
  }
  return res;
}



/* 简单实现forEach */

/**
 * forEach方法只是对数组中的每个元素调用一次回调，不会改变原数组，也没有返回值（返回值为undefined）
 * 
 * @param callback
 * @param thisArg
 */
Array.prototype.myForEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
}

const test = [32, 1024, 64];
test.myForEach((value, index, array) => {
  console.log(this.name);
  console.log(value, index, array.length);
}, {name: "customize forEach"});

test.forEach((value, index, array) => {
  console.log(this.name);
  console.log(value, index, array.length);
}, {name:"original forEach"});

// log
// undefined
// 32 0 3
// undefined
// 1024 1 3
// undefined
// 64 2 3
// undefined
// 32 0 3
// undefined
// 1024 1 3
// undefined
// 64 2 3

/* 上面输出的this.name均为undefined，是因为在forEach中使用了箭头函数 */
