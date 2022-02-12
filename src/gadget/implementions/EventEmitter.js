/*! *****************************************************************************
@author Heming
founded at 2021-01-05 13:57:38
created by WebStorm
description: 实现一个简单的EventEmitter
***************************************************************************** */

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, cb) {
    const callbacks = this.events[eventName] ?? [];
    callbacks.push(cb);
    this.events[eventName] = callbacks;
    return this;
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
      return true;
    }
    return false;
  }

  once(eventName, cb) {
    // 为事件注册单次监听器
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
    return this;
  }

  off(eventName, cb) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      for (let i = 0, len = callbacks.length; i < len; i++) {
        if (callbacks[i] === cb) {
          callbacks.splice(i, 1);
        }
      }
    }
    return this;
  }
}

const emitter = new EventEmitter();
const sayHi = (name) => console.log(`Hello ${name}`);
const sayHi2 = (name) => console.log(`Good night, ${name}`);

emitter.on('hi', sayHi);
emitter.on('hi', sayHi2);
emitter.emit('hi', 'ScriptOJ');
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi);
emitter.emit('hi', 'ScriptOJ');
// => Good night, ScriptOJ

const emitter2 = new EventEmitter();
emitter2.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`)
});
emitter2.emit('hi', 'Jerry', 12);
// => I am Jerry, and I am 12 years old
emitter2.emit('hi', 'Jerry', 12);

const emitter3 = new EventEmitter();
emitter3.once('hi', () => console.log(`once`));
emitter3.emit('hi');
emitter3.emit('hi');
