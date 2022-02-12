/** async原理的简单实现 **/

/**
 * async函数是使用Promise对generator函数的包装。
 *
 * @param generator
 * @param args
 * @returns {Promise<unknown>}
 */
function spawn(generator, ...args) {
  return new Promise((resolve, reject) => {
    const itr = generator(...args);

    function step(nextFn) {
      let iteratorResult;

      try {
        iteratorResult = nextFn();
      } catch (e) {
        return reject(e);
      }

      if (iteratorResult.done) {
        return resolve(iteratorResult.value);
      }

      Promise.resolve(iteratorResult.value).then(
        res => {
          step(() => {
            return itr.next(res);
          });
        },
        err => {
          step(() => {
            return itr.throw(err);
          });
        }
      );
    }

    step(() => {
      return itr.next(null);
    });
  });
}
