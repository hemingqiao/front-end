/*! *****************************************************************************
@author Heming
founded at 2021-03-06 16:27:36
created by WebStorm
description: JS实现单例模式
***************************************************************************** */

class Singleton {
  static #instance = null;

  constructor(name) {
    if (Singleton.#instance) {
      return Singleton.#instance;
    }
    this.name = name;
    Singleton.#instance = this;
  }

  getName() {
    return this.name;
  }
}

let instance1 = new Singleton("foo");
let instance2 = new Singleton("foo");
let instance3 = new Singleton("baz");
console.log(instance1 == instance2); // true
console.log(instance2 == instance3); // true


/* 利用代理实现 */

// 参考：https://www.kancloud.cn/cyyspring/more/1317419
class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const CreateSingleton = (function () {
  let instance = null;

  return function (name) {
    if (instance == null) {
      instance =  new Person(name);
    }
    return instance;
  };
})();

let a = CreateSingleton("foo");
let b = CreateSingleton("bar");
console.log(a == b); // true

