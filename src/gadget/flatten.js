/** 数组扁平化的一些方法 **/



/**
 * 最简单的方法是使用es2019新提供的方法
 *
 * @param array
 * @returns {any[]}
 */
function flatten(array) {
  return array.flat(Infinity);
}



/**
 * 使用扩展运算符层层展开
 *
 * @param array
 * @returns {*}
 */
function flatten(array) {
  while (array.some(v => Array.isArray(v))) {
    array = [].concat(...array);
  }

  return array;
}



/**
 * 利用数组的reduce方法
 *
 * @param array
 * @returns {*}
 */
const flatten = array => array.reduce((prev, next) => prev.concat(Array.isArray(next) ? flatten(next) : next), []);



/**
 * 利用generator函数
 *
 * @param array
 * @returns {any}
 */
function flatten(array) {
  function* _flatten(array) {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        yield* _flatten(array[i]);
      } else {
        yield array[i];
      }
    }
  }

  return [..._flatten(array)];
}



/**
 * 递归调用
 *
 * @param array
 * @returns {[]}
 */
function flatten(array) {
  let result = [];

  for (let e of array) {
    if (Array.isArray(e)) {
      result = result.concat(flatten(e));
    } else {
      result.push(e);
    }
  }

  return result;
}

/**
 * 另一种形式的递归调用
 *
 * @param array
 * @returns {[]}
 */
function flatten(array) {
  let result = [];
  _flatten(array);
  return result;

  function _flatten(arr) {
    arr.forEach(value => {
      if (Array.isArray(value)) {
        _flatten(value);
      } else {
        result.push(value);
      }
    });
  }
}


/**
 * 利用栈的性质（也可以利用shift方法从头部取出元素，不过操作尾部元素的效率高些）
 *
 * @param array
 * @returns {*[]}
 */
function flatten(array) {
  const stack = [...array];
  const res = [];
  while (stack.length) {
    // 取出栈顶元素
    const top = stack.pop();
    if (Array.isArray(top)) {
      stack.push(...top);
    } else {
      res.push(top);
    }
  }
  // 反转数组并返回
  return res.reverse();
}

// see: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
