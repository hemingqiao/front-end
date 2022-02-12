/** 模拟实现Promise的一些方法 **/

/**
 * Promise.all接受一个可迭代对象作为参数，如数组等。如果参数不是一个iterable，会抛出一个TypeError，下面的模拟实现中并没有实现这个功能。
 * 数组的元素可以是Promise实例或者PromiseLike对象（如thenable）。
 *
 * @param iterables
 * @returns {Promise<unknown>}
 */
Promise.myAll = function (iterables) {
  if (iterables[Symbol.iterator] && typeof iterables[Symbol.iterator] === "function") {
    let itrArray = Array.from(iterables),
        count = 0,
        result = [],
        len = itrArray.length;

    return new Promise((resolve, reject) => {
      // 如果长度为零，会同步的返回一个resolved的promise实例
      if (len === 0) {
        return resolve(result);
      } else {
        for (let [i, v] of itrArray.entries()) {
          Promise.resolve(v).then(
            res => {
              result[i] = res;
              count++;
              if (count === len) {
                return resolve(result);
              }
            },
            err => {
              return reject(err);
            }
          );
        }
      }
    });
  } else {
    return Promise.reject(new TypeError("parameter is not iterable"));
  }
}


/**
 * Promise.race方法同样接受一个可迭代对象作为参数。
 * 如果length为0，会返回一个一直处于pending状态的Promise实例。如果length不为0，返回的Promise实例会以最快resolved的Promise参数的值
 * 作为自己的值。
 *
 * @param iterables
 * @returns {Promise<unknown>}
 */
Promise.myRace = function (iterables) {
  if (iterables[Symbol.iterator] && typeof iterables[Symbol.iterator] === "function") {
    let itrArray = Array.from(iterables),
        len = itrArray.length;

    return new Promise((resolve, reject) => {
      if (len === 0) {
        return;
      }

      for (let e of itrArray) {
        Promise.resolve(e).then(
          res => {
            return resolve(res);
          },
          err => {
            return reject(err);
          }
        );
      }
    });
  } else {
    return Promise.reject(new TypeError("parameter is not iterable"));
  }
}


/**
 * Promise.allSettled会始终返回一个fulfilled状态的Promise实例。
 *
 * @param iterables
 * @returns {Promise<unknown>}
 */
Promise.myAllSettled = function (iterables) {
  if (iterables[Symbol.iterator] && typeof iterables[Symbol.iterator] === "function") {
    const formatResult = (success, val) => success
      ? {status: "fulfilled", value: val}
      : {status: "rejected", reason: val};

    let itrArray = Array.from(iterables),
        count = 0,
        result = [],
        len = itrArray.length;

    return new Promise(resolve => {
      if (len === 0) {
        return resolve(result);
      } else {
        for (let [i, v] of itrArray.entries()) {
          Promise.resolve(v).then(
            res => {
              result[i] = formatResult(true, res);
              count++;
              if (count === len) {
                return resolve(result);
              }
            },
            err => {
              result[i] = formatResult(false, err);
              count++;
              if (count === len) {
                return resolve(result);
              }
            }
          );
        }
      }
    });
  } else {
    return Promise.reject(new TypeError("parameter is not iterable"));
  }
}


/*
Promise.any尚未正式加入ECMAScript标准，这里只是一个很简单的模拟实现。
update, 2021.01.14: Promise.any已经处于stage 4，将在ES2021中正式发布
Promise.any的作用恰好和Promise.all相反，在Promise.all中，如果有一个Promise实例reject了，整个方法返回的Promise实例会reject。只有所有
的Promise实例都是fulfilled状态，all方法返回的Promise实例才是fulfilled状态。
any方法恰好相反，只要有一个Promise实例fulfilled，any方法返回的Promise实例就是以前面的实例的值fulfilled。只有全部的实例都reject，any
会返回一个reject的Promise实例。
 */

// /**
//  * Promise.any同样接受一个iterable对象作为参数。
//  *
//  * @param iterables
//  * @returns {Promise<unknown>}
//  */
// Promise.myAny = function (iterables) {
//   let itrArray = Array.from(iterables),
//     count = 0,
//     result = [],
//     len = itrArray.length;
//
//   return new Promise((resolve, reject) => {
//     if (len === 0) {
//       return resolve(result);
//     } else {
//       for (let [i, v] of itrArray.entries()) {
//         Promise.resolve(v).then(
//           res => {
//             return resolve(res);
//           },
//           err => {
//             result[i] = err;
//             count++;
//             if (count === len) {
//               return reject(result);
//             }
//           }
//         );
//       }
//     }
//   });
// }


/**
 * Promise.any同样接受一个iterable对象作为参数。
 *
 * @param values
 * @return {Promise<unknown>}
 */
Promise.myAny = function (values) {
  if (iterables[Symbol.iterator] && typeof iterables[Symbol.iterator] === "function") {
    let itrArray = Array.from(values),
        count = 0,
        result = [],
        len = itrArray.length;

    return new Promise((resolve, reject) => {
      if (len === 0) {
        return reject(new AggregateError(result, "All promises were rejected"));
      } else {
        for (let [index, value] of itrArray.entries()) {
          Promise.resolve(value).then(
            res => {
              return resolve(res);
            },
            err => {
              result[index] = err;
              count++;
              if (count === len) {
                return reject(new AggregateError(result, "All promises were rejected"));
              }
            }
          );
        }
      }
    });
  } else {
    return Promise.reject(new TypeError("parameter is not iterable"));
  }
}


/**
 * Promise.resolve的实参如果是一个Promise实例的话，会原封不动的返回这个实例对象。
 * 如果实参是一个thenable对象的话，会异步返回一个Promise实例。
 * 否则会同步返回一个以实参为值的fulfilled状态的Promise实例。
 *
 * @param value
 * @returns {Promise|Promise<unknown>}
 */
Promise.myResolve = function (value) {
  if (value instanceof Promise) {
    return value;
  }

  return new Promise((resolve, reject) => {
    if (value && value.then && typeof value.then === "function") {
      // 如果value是一个thenable对象的话，其then方法会按照出现在脚本中的顺序被加入到微任务队列
      // 并在本轮事件循环的同步代码执行完后执行，这里使用Promise.prototype.then方法来模拟加入微任务队列这一行为
      Promise.resolve().then(() => value.then(resolve, reject));
    } else {
      return resolve(value);
    }
  });
}


/**
 * 没什么好说的，Promise.reject会返回一个以实参作为理由的rejected状态的Promise实例。
 *
 * @param reason
 * @returns {Promise<unknown>}
 */
Promise.myReject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
}


/**
 * 对于Promise实例的finally方法，一般而言，会执行callback，并产生值的穿透。
 * 但是有两个例外：
 *    一是callback返回一个一直pending的Promise实例，会导致finally方法返回的Promise实例也一直处于pending状态；
 *    二是callback返回一个rejected状态的Promise实例，这会导致finally方法返回的Promise实例reject。
 *
 * @param callback
 * @returns {Promise<unknown>}
 */
Promise.prototype.myFinally = function (callback) {
  return this.then(
    res => {
      Promise.resolve(callback()).then(() => res);
    },
    err => {
      Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
}


/**
 * Promise.prototype.catch方法就是一个特殊的then方法
 *
 * @param onrejected
 * @returns {Promise<unknown>}
 */
Promise.prototype.myCatch = function (onrejected) {
  return this.then(null, onrejected);
}


/**
 * Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
 *
 * @param cb
 * @param times
 * @return {Promise<unknown>}
 */
Promise.retry = function(cb, times = 5) {
  return new Promise(async (resolve, reject) => {
    let ret;
    while (times--) {
      try {
        ret = await cb();
        console.log(times);
        return resolve(ret);
      } catch(err) {
        if (times == 0) {
          return reject(err);
        }
      }
    }
  });
}

function randomPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random();
      if (n > 0.9) {
        resolve(n);
      } else {
        reject(n);
      }
    }, 10);
  });
}

Promise.retry(randomPromise, 100)
  .then(res => console.log(`result: ${res}`))
  .catch(err => console.log(`error: ${err}`));

// 参考：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/387


/*
// another retry
Promise.retry = function (cb, times = 5) {

  return new Promise((resolve, reject) => {
    let cnt = 0;
    executeFn(cb);

    function executeFn(fn) {
      Promise.resolve(fn())
        .then(res => {
          console.log(cnt);
          resolve(res);
        })
        .catch(err => {
          ++cnt;
          if (cnt > times) {
            reject(err);
          } else {
            executeFn(fn);
          }
        });
    }
  });
}
*/
