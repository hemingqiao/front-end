/*
题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promise 实现）

三个亮灯函数已经存在：

function red(){
    console.log('red');
}
function green(){
    console.log('green');
}
function yellow(){
    console.log('yellow');
}
 */


function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
}


function light(callback, timer) {
  return new Promise(resolve => {
    setTimeout(
      () => {
        callback();
        resolve();
      },
      timer
    );
  });
}


// 使用Promise和递归实现
function run() {
  Promise.resolve().then(() => {
    return light(red, 3000);
  }).then(() => {
    return light(green, 1000);
  }).then(() => {
    return light(yellow, 2000);
  }).then(() => {
    run();
  });
}

// run();


/*
练习，不在局限于题目的使用Promise实现
 */

// 使用async函数
async function runAsync() {
  await light(red, 3000);
  await light(green, 1000);
  await light(yellow, 2000);
  await runAsync();
}

// runAsync();


function* runG() {
  yield light(red, 3000);
  yield light(green, 1000);
  yield light(yellow, 2000);
  yield* runG();
}


// 自定义一个generator函数执行器
function runGenerator(generator) {
  let itr = generator();
  run();

  function run(res) {
    let iteratorResult = itr.next(res);
    if (iteratorResult.done) {
      return iteratorResult.value;
    }
    iteratorResult.value.then(res => run(res));
  }
}

// runGenerator(runG);


// 利用async的执行器
function spawn(generator, ...args) {
  return new Promise((resolve, reject) => {
    let itr = generator(...args);

    // 写为了IIFE的形式，也可以在spawn内单独调用step函数
    (function step(nextFn) {
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
    })(() => {
      return itr.next(null);
    });
  });
}

// 忽略了spawn函数的返回值
spawn(runG);
