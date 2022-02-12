const isFunction = func => typeof func === "function";

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class PromiseH {
  #status = PENDING;
  #value = null;
  #fulfilledQueue = [];
  #rejectedQueue = [];

  constructor(executor) {
    if (!isFunction(executor)) {
      throw new TypeError("Promise constructor must receive a function");
    }

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }


  resolve(value) {
    if (this.#status !== "PENDING") {
      return;
    }

    this.#status = FULFILLED;
    this.#value = value;
    this.#fulfilledQueue.forEach(cb => cb());
  }


  reject(reason) {
    if (this.#status !== "PENDING") {
      return;
    }

    this.#status = REJECTED;
    this.#value = reason;
    this.#rejectedQueue.forEach(cb => cb());
  }


  then(onfulfilled, onrejected) {
    onfulfilled = isFunction(onfulfilled) ? onfulfilled : value => value;
    onrejected = isFunction(onrejected) ? onrejected : reason => {
      throw reason;
    };


    let retPromise = new PromiseH((resolve, reject) => {
      switch (this.#status) {
        case FULFILLED:
          // 使用定时器模拟微任务的异步调用
          setTimeout(() => {
            try {
              let x = onfulfilled(this.#value);
              PromiseH.resolvePromise(retPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              let x = onrejected(this.#value);
              PromiseH.resolvePromise(retPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
          break;
        case PENDING:
          this.#fulfilledQueue.push(() => {
            setTimeout(() => {
              try {
                let x = onfulfilled(this.#value);
                PromiseH.resolvePromise(retPromise, x, resolve, reject);
              } catch (e) {
                reject(e);
              }
            });
          });
          this.#rejectedQueue.push(() => {
            setTimeout(() => {
              try {
                let x = onrejected(this.#value);
                PromiseH.resolvePromise(retPromise, x, resolve, reject);
              } catch (e) {
                reject(e);
              }
            });
          });
          break;
      }
    });

    return retPromise;
  }


  // Promise resolution procedure
  static resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
      throw new TypeError("Detecting cycle");
    }

    /*
    // 加上这段代码就不能通过测试了，是因为这里只是简单的调用了x.then，实际上应该是把then读出来，像下面一样，then.call(x, ...)
    // 因为x的值可能还是一个promise，还需要递归判断一下
    if (x instanceof PromiseH) {
      return x.then(resolve, reject);
    }
    */

    if (x && typeof x === "object" || typeof x === "function") {
      let usedFlag = false;

      try {
        let then = x.then;

        if (typeof then === "function") {
          then.call(
            x,
            (res) => {
              if (usedFlag) {
                return;
              }
              usedFlag = true;
              PromiseH.resolvePromise(promise, res, resolve, reject);
            },
            (err) => {
              if (usedFlag) {
                return;
              }
              usedFlag = true;
              reject(err);
            }
          );
        } else {
          if (usedFlag) {
            return;
          }
          usedFlag = true;
          resolve(x);
        }

      } catch (e) {
        if (usedFlag) return;
        usedFlag = true;
        reject(e);
      }

    } else {
      resolve(x);
    }
  }


  static resolve(val) {
    if (val instanceof PromiseH) {
      return val;
    }

    return new PromiseH((resolve, reject) => {
      if (val && val.then && typeof val.then === "function") {
        return Promise.resolve().then(() => val.then(resolve, reject));
      } else {
        resolve(val);
      }
    });
  }


  static reject(reason) {
    return new PromiseH((resolve, reject) => {
      return reject(reason);
    });
  }


  catch(onRejected) {
    return this.then(null, onRejected);
  }


  finally(callback) {
    return this.then(
      res => {
        return PromiseH.resolve(callback()).then(() => res);
      },
      err => {
        return PromiseH.resolve(callback()).then(() => {
          throw err;
        });
      }
    );
  }


  static all(iterable) {
    let itrArray = Array.from(iterable),
        result = [],
        n = itrArray.length,
        count = 0;

    return new PromiseH((resolve, reject) => {
      if (n === 0) {
        return resolve(result);
      }

      for (let [i, v] of itrArray.entries()) {
        PromiseH.resolve(v).then(
          res => {
            result[i] = res;
            ++count;
            if (count === n) {
              return resolve(result);
            }
          },
          err => {
            return reject(err);
          }
        );
      }
    });
  }


  static any(iterable) {
    let itrArray = Array.from(iterable),
        result = [],
        n = itrArray.length,
        count = 0;

    return new PromiseH((resolve, reject) => {
      if (n === 0) {
        return reject(new AggregateError(result, "All promises were rejected"));
      }

      for (let [i, v] of itrArray.entries()) {
        PromiseH.resolve(v).then(
          res => {
            return resolve(res);
          },
          err => {
            result[i] = err;
            ++count;
            if (count === n) {
              return reject(new AggregateError(result, "All promises were rejected"));
            }
          }
        );
      }
    });
  }


  static race(iterable) {
    let itrArray = Array.from(iterable),
        n = itrArray.length;

    return new PromiseH((resolve, reject) => {
      if (n === 0) {
        return;
      }

      for (let v of itrArray) {
        PromiseH.resolve(v).then(
          res => {
            return resolve(res);
          },
          err => {
            return reject(err);
          }
        );
      }
    });
  }


  static allSettled(iterable) {
    const formatResult = (value, success) => success
      ? {status: "fulfilled", value: value}
      : {status: "rejected", reason: value};

    let itrArray = Array.from(iterable),
        result = [],
        n = itrArray.length,
        count = 0;

    return new PromiseH((resolve) => {
      if (n === 0) {
        return resolve(result);
      }

      for (let [i, v] of itrArray.entries()) {
        PromiseH.resolve(v).then(
          res => {
            result[i] = formatResult(res, true);
            ++count;
            if (count === n) {
              return resolve(result);
            }
          },
          err => {
            result[i] = formatResult(err, false);
            ++count;
            if (count === n) {
              return resolve(result);
            }
          }
        );
      }
    });
  }


  /**
   * 非标准方法
   *
   * @param cb
   * @param times
   * @return {PromiseH}
   */
  static retry(cb, times = 1) {
    return new PromiseH( async (resolve, reject) => {
      let ret;
      while (times-- > 0) {
        try {
          ret = await cb();
          return resolve(ret);
        } catch (e) {
          if (times === 0) {
            return reject(e);
          }
        }
      }
    });
  }
}
