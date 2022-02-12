/** 按顺序执行异步任务的几种方式 **/


/**
 * 模拟异步任务
 *
 * @param i
 * @returns {Promise<unknown>}
 */
function randomDelay(i) {
  const delay = Math.random() * 1000;
  console.log(`task${i}: delay ${delay}ms`);

  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        switch (i) {
          case 2:
            console.log(`rejected ${i}`);
            reject(i);
            break;
          default:
            console.log(`resolved ${i}`);
            resolve(i);
        }
      },
      delay
    );
  });
}


/**
 * 利用promise链实现按顺序执行异步任务
 *
 * @param taskNum
 */
function runAsyncInSequence(taskNum) {
  // 并发的获取异步任务
  const tasks = Array.from(Array(taskNum), (v, k) => randomDelay(k));

  let sequence = Promise.resolve();
  tasks.forEach(value => {
    sequence = sequence.then(() => {
      return value.then(res => console.log(res))
        .catch(err => console.log(err));
    });
  });
}

// test
runAsyncInSequence(5);

// log:
// task0: delay 714.374407021646ms
// task1: delay 338.50013549865656ms
// task2: delay 229.00651157868768ms
// task3: delay 876.7268119677798ms
// task4: delay 409.5902079926261ms
// rejected 2
// resolved 1
// resolved 4
// resolved 0
// 0
// 1
// 2
// resolved 3
// 3
// 4


/**
 * 组合使用数组的reduce方法和promise链
 *
 * @param taskNum
 */
function runAsyncInSequence(taskNum) {
  const tasks = Array(taskNum).fill(null).map((v, i) => randomDelay(i));

  tasks.reduce((accumulator, currentValue) => {
    return accumulator.then(() => {
      return currentValue.then(res => console.log(res))
        .catch(err => console.log(err));
    });
  }, Promise.resolve());
}

// test
runAsyncInSequence(5);

// log:
// task0: delay 912.6543988120939ms
// task1: delay 671.8041321012704ms
// task2: delay 741.8572901271292ms
// task3: delay 649.8072968257609ms
// task4: delay 321.34870157548767ms
// resolved 4
// resolved 3
// resolved 1
// rejected 2
// resolved 0
// 0
// 1
// 2
// 3
// 4


/**
 * 使用async函数来实现按顺序执行异步任务。
 * async函数同时还会返回一个包含了结果的Promise对象
 *
 * @param taskNum
 * @returns {Promise<[]>}
 */
async function runAsyncInSequence(taskNum) {
  const tasks = Array.from(Array(taskNum), (v, k) => randomDelay(k));
  const now = +new Date();
  let result = [];

  for (let task of tasks) {
    try {
      let res = await task;
      console.log(res);
      result.push(res);
    } catch (e) {
      console.log(e);
      result.push(`error ${e}`);
    }
  }

  console.log(`${+new Date() - now}ms elapsed`);
  return result;
}

// test
runAsyncInSequence(5).then(res => console.log(res))
  .catch(err => console.log(err));

// log:
// task0: delay 566.1142871958887ms
// task1: delay 210.7347458726385ms
// task2: delay 47.828872281983514ms
// task3: delay 537.7469884222174ms
// task4: delay 280.33241738163883ms
// rejected 2
// resolved 1
// resolved 4
// resolved 3
// resolved 0
// 0
// 1
// 2
// 3
// 4
// 567ms elapsed
// [0, 1, "error 2", 3, 4]


/**
 * 将逻辑写在generator函数中，利用generator函数执行器进行执行
 *
 * @param taskNum
 * @returns {Generator<*, [], *>}
 */
function* runAsyncInSequenceSpawn(taskNum) {
  const tasks = Array.from(Array(taskNum), (v, k) => randomDelay(k));
  const now = +new Date();
  let result = [];

  for (let task of tasks) {
    try {
      let res = yield task;
      console.log(res);
      result.push(res);
    } catch (e) {
      console.log(e);
      result.push(`error ${e}`);
    }
  }

  console.log(`${+new Date() - now}ms elapsed`);
  return result;
}

// test
spawn(runAsyncInSequenceSpawn, 5).then(res => console.log(res))
  .catch(err => console.log(err));

// log:
// task0: delay 843.1036376275279ms
// task1: delay 788.809164671529ms
// task2: delay 657.5032129929366ms
// task3: delay 454.70226828577177ms
// task4: delay 575.0642190732395ms
// resolved 3
// resolved 4
// rejected 2
// resolved 1
// resolved 0
// 0
// 1
// 2
// 3
// 4
// 848ms elapsed
// [0, 1, "error 2", 3, 4]


/**
 * generator函数执行器，并返回一个Promise对象
 *
 * @param generator
 * @param args
 * @returns {Promise<unknown>}
 */
function spawn(generator, ...args) {
  return new Promise((resolve, reject) => {
    let itr = generator(...args);

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
