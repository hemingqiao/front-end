/* 迭代器的退出行为（和return方法有关） */

class Counter {
  constructor(limit) {
    this._count = 1;
    this._limit = limit;
  }

  [Symbol.iterator]() {
    let count = this._count;
    let limit = this._limit;

    return {
      next() {
        if (count <= limit) {
          return {value: count++, done: false};
        }
        return {done: true};
      },
      return() {
        console.log("Exiting early");
        return {done: true};
      }
    };
  }
}

// 当解构赋值并未消费可迭代对象的所有值时，迭代器会调用return方法，提前退出
let counter = new Counter(5);
let [a, b] = counter;                       // Exiting early


// 原生的可迭代对象的迭代器中默认没有定义return方法，所以未消费完可迭代对象的所有值时，迭代器并不会提前退出
const set = new Set().add(32).add(1024).add(64);
const [c, d] = set;
console.log(c);                             // 32
console.log(set[Symbol.iterator]().return); // undefined


// 但是当为原生的数组定义一个具有return方法的迭代器
// 提前退出的行为便会出现
const arr = [32, 1024, 64];
Array.prototype[Symbol.iterator] = function () {
  const ctx = this;
  let i = 0;
  let length = ctx.length;
  return {
    next() {
      if (i < length) {
        return {value: ctx[i++], done: false};
      }
      return {done: true};
    },

    return() {
      console.log("Exiting early");
      // return方法必须返回一个有效的 IteratorResult 对象
      return {done: true};
    },

    [Symbol.iterator]() {
      return this;
    }
  };
}
// const[e, f] = arr; // Exiting early


/*
不过，仅仅给一个不可关闭的迭代器增加return方法并不能让它变成可关闭的。这是因为调用 return()不会强制迭代器进入关闭状态。
即便如此，return()方法还是会被调用。
参考：JavaScript高级程序设计（第四版） chapter7 迭代器
 */

let iter = arr[Symbol.iterator]();
for (let i of iter) {
  console.log(i);
  if (i > 32) {
    break;
  }
}

// 32
// 1024
// Exiting early

for (let i of iter) {
  console.log(i);
}

// 64
