/*! *****************************************************************************
@author Heming
founded at 2021-03-16 13:21:48
created by WebStorm
description: Vue 2.x 利用 `getter` 和 `setter` 来监听数据的变化，实现响应式模块的原理
***************************************************************************** */

/*
function observe(obj, callback) {
  for (let key in obj) {
    let val = obj[key];
    if (val && typeof val === "object") {
      Object.defineProperty(obj, key, {
        get() {
          return val;
        },
        set(newVal) {
          if (newVal === val) return;
          val = observe(newVal, callback);
          callback();
        }
      });
      observe(val, callback);
    } else {
      Object.defineProperty(obj, key, {
        get() {
          return val;
        },
        set(newVal) {
          if (newVal === val) return;
          val = observe(newVal, callback);
          callback();
        }
      });
    }
  }
  return obj;
}
*/

function observe(obj, callback) {
  for (let key in obj) {
    let val = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = observe(newVal, callback);
        callback();
      }
    });
    if (val && typeof val === "object") {
      observe(val, callback);
    }
  }
  return obj;
}

let oo = {x: 32, y: 1024};
observe(oo, () => console.log("changed"));
console.log(oo.x);
oo.x = 64;
oo.y = {ram: 32, rom: 1024};
console.log(oo.x);
console.log(oo.y);
oo.y.ram = 64;
console.log(oo.y.ram);

[32, 1024].concat()
