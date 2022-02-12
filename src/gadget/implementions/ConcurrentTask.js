/*! *****************************************************************************
@author Heming
founded at 2021-03-15 20:02:18
created by WebStorm
description: 基于Promise的并发任务队列类，允许最多并发执行limit个任务
参考：https://segmentfault.com/a/1190000020848472
***************************************************************************** */

class ConcurrentTask {
  #capacity = 0;
  #queue = [];

  constructor(limit = 10) {
    this.#capacity = limit;
    setTimeout(() => this.run()); // 使用箭头函数，确保this的值
  }

  addTask(...tasks) {
    this.#queue.push(...tasks);
  }

  run() {
    while (this.#capacity > 0 && this.#queue.length > 0) {
      this.#capacity--;
      let task = this.#queue.shift();
      task().then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => {
          this.#capacity++;
          this.run();
        });
    }
  }
}

function t1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "after 1s");
  });
}
function t2() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "after 2s");
  });
}
function t3() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, "after 3s");
  });
}
function t4() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 4000, "after 4s");
  });
}

let c = new ConcurrentTask(3);
c.addTask(t1, t2, t3, t4);
