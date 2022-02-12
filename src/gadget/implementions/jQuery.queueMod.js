/*! *****************************************************************************
@author Heming
founded at 2021-02-27 11:45:50
created by WebStorm
description: 简单实现类似jQuery的任务队列
***************************************************************************** */

class JqueryQueue {
  #tasks = [];
  #capacity = 0; // 可并行执行的任务数

  constructor(limit = 1) {
    this.#capacity = limit;
  }

  addTask(callback) {
    // 如果容量大于0，表示仍可派发任务并执行
    if (this.#capacity > 0) {
      this.#capacity--;
      callback(this.#next.bind(this));
    } else {
      // 否则，将任务推入内部的任务队列中，等待执行
      this.#tasks.push(callback);
    }
  }

  #next() {
    this.#capacity++;
    this.#flush();
  }

  #flush() {
    if (this.#capacity > 0 && this.#tasks.length > 0) {
      this.#tasks.shift()(this.#next.bind(this));
    }
  }
}


class JqueryQueue1 {
  #tasks = [];
  #capacity = 0;

  constructor(limit = 1) {
    this.#capacity = limit;
  }

  addTask(callback) {
    if (this.#capacity > 0) {
      this.#capacity--;
      callback(this.#next);
    } else {
      this.#tasks.push(callback);
    }
  }

  #next = () => {
    this.#capacity++;
    this.#flush();
  }

  #flush() {
    if (this.#capacity > 0 && this.#tasks.length > 0) {
      this.#tasks.shift()(this.#next);
    }
  }
}

let queue = new JqueryQueue1(2);
queue.addTask(function (next) {
  setTimeout(() => {
    console.log(1);
    next();
  }, 10000);
});

queue.addTask(function (next) {
  console.log(2);
  next();
});

queue.addTask(function(next) {
  setTimeout(() => {
    console.log(3);
    next();
  }, 10000);
});

queue.addTask(function(next) {
  setTimeout(() => {
    console.log(4);
    next();
  }, 10000);
});

queue.addTask(function(next) {
  setTimeout(() => {
    console.log(5);
    next();
  }, 10000);
});

queue.addTask(function(next) {
  setTimeout(() => {
    console.log(6);
    next();
  }, 10000);
});

