/*! *****************************************************************************
@author Heming
founded at 2020-12-19 16:21:06
created by WebStorm
description: 利用数组简单实现js中的Map
***************************************************************************** */

class MyMap {
  #keys = [];
  #values = [];
  #size = 0;

  constructor(initialMap = []) {
    for (let e of initialMap) {
      this.set(e[0], e[1]);
    }
  }

  get size() {
    return this.#size;
  }

  get(key) {
    let index = this.#getIndex(key);
    if (key !== -1) {
      return this.#values[index];
    }
    return undefined;
  }

  set(key, value) {
    let index = this.#getIndex(key);
    if (index !== -1) {
      this.#values[index] = value;
    } else {
      this.#keys.push(key);
      this.#values.push(value);
      this.#size++;
    }
    return this;
  }

  has(key) {
    return this.#getIndex(key) !== -1;
  }

  clear() {
    this.#values = [];
    this.#keys = [];
    this.size = 0;
  }

  delete(key) {
    let index = this.#getIndex(key);
    if (key !== -1) {
      this.#keys.splice(index, 1);
      this.#values.splice(index, 1);
      this.#size--;
      return true;
    }
    return false;
  }

  forEach(callbackfn, thisArg) {
    for (let i = 0; i < this.#size; i++) {
      callbackfn.call(thisArg, this.#values[i], this.#keys[i], this);
    }
  }

  /**
   * 通过给定的键查找对应的索引
   * @param key
   * @return {number}
   */
  #getIndex(key) {
    for (let i = 0; i < this.#size; i++) {
      if (Object.is(key, this.#keys[i])) {
        return i;
      }
    }
    return -1;
  }

  entries() {
    let keys = this.#keys;
    let values = this.#values;
    let size = this.#size;
    let i = 0;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (i < size) {
          return {value: [keys[i], values[i++]], done: false};
        }
        return {done: true};
      }
    }
  }
}


// for test
let map = new MyMap([["x", 32], ["y", 1024]]);
console.log(map);
console.log(map.size);
for (let entry of map.entries()) {
  console.log(entry);
}
let name = {a: "pc"};
map.set(name, 2048).set("deleted", 16);
console.log(map.size);
map.delete("deleted");
console.log(map.size);
console.dir(map);
map.forEach((value, key, map) => {
  console.log(`value: ${value}, key: ${key}, map: ${map}`);
});
