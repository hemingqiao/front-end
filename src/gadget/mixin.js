/** 几种混入模式的实现 **/


/**
 * 采用管道式的写法，利用原型链实现混入
 *
 * @param obj
 * @returns {function(...[*]): *}
 */
const mixin = obj => (...sources) => sources.reduce(
  (initObj, currentValue) => {
    return Object.create(initObj, Object.getOwnPropertyDescriptors(currentValue));
  },
  obj
);


/**
 * 与上面的类似，利用对象的方法提高了可读性
 *
 * @param obj
 * @returns {{with: (function(...[*]): *)}}
 */
const mixin = obj => ({
  with: (...sources) => sources.reduce(
    (initObj, currentValue) => {
      return Object.create(initObj, Object.getOwnPropertyDescriptors(currentValue));
    },
    obj
  ),
});


/*
利用es6的class语法实现组合式的混入。
 */

function copyProperty(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor"
      && key !== "prototype"
      && key !== "name") {
      let descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  }
}


function mix(...Sources) {
  class Mix {
    constructor() {
      for (let Source of Sources) {
        copyProperty(this, new Source()); // 拷贝实例属性
      }
    }
  }

  for (let Source of Sources) {
    copyProperty(Mix, Source); // 拷贝静态属性
    copyProperty(Mix.prototype, Source.prototype); // 拷贝原型属性
  }

  return Mix;
}

// 用法：class Combined extends mix(A, B, ...) {}
