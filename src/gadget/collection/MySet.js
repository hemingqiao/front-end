/*! *****************************************************************************
@author Heming
founded at 2020-12-19 16:21:44
created by WebStorm
description: 利用数组简单实现js中的Set
***************************************************************************** */

function sameValueZero(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  return a !== a && b !== b;
}


class MySet {
  table;
  size;

  constructor(iterable) {
    if (iterable[Symbol.iterator] === undefined || typeof iterable[Symbol.iterator] !== "function") {
      throw new TypeError("argument is not an iterable object");
    }
    this.table = [];
    for (let e of iterable) {
      if (this.table.includes(e)) continue;
      this.table.push(e);
    }
    this.size = this.table.length;
  }

  add(e) {
    if (!this.table.includes(e)) {
      this.table.push(e);
      this.size++;
    }
    return this;
  }

  clear() {
    this.table = [];
    this.size = 0;
  }

  has(value) {
    return this.table.includes(value);
  }

  delete(value) {
    let idx = -1;
    for (let i = 0; i < this.size; i++) {
      if (sameValueZero(value, this.table[i])) {
        idx = i;
      }
    }
    if (idx !== -1) {
      this.table.splice(idx, 1);
      this.size--;
      return true;
    }
    return false;
  }

  entries() {
    let con = this.table;
    let i = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (i < con.length) {
          return {value: [con[i], con[i++]], done: false};
        } else {
          return {done: true};
        }
      }
    };
  }
}

let set = new MySet([32, 1024]);
console.log(set);
for (let entry of set.entries()) {
  console.log(entry);
}
set.add(16);
console.log(set.size);
console.log(set);
set.delete(16);
console.log(set.size);
console.log(set);

class Test {
  #a;
  #b;
  constructor() {
    this.#a = 32;
    this.#b = 1024;
  }

  showVal(test) {
    console.log(test.#a);
    console.log(test.#b);
  }

  another() {
    console.log(this.#b);
    console.log(this.#a);
  }
}

let t = new Test();
t.showVal(new Test());
t.another();


class Foo {
  a = 32;
  b = 1024;
  static c = 64;
  #d = 2048;
  static #e = 512;

  static showE() {
    console.log(Foo.#showE());
  }

  static #showE() {
    return Foo.#e;
  }

  #shodD() {
    console.log(this.#d);
  }
}
