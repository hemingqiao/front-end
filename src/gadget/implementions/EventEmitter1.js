/*! *****************************************************************************
@author Heming
founded at 2021-01-16 22:30:11
created by WebStorm
description: 模拟实现node.js中的EventEmitter类
***************************************************************************** */

class EventEmitter1 {
  #events = new Map();

  addListener(eventName, cb) {
    const handlers = this.#events.get(eventName);

    if (!handlers) {
      this.#events.set(eventName, [cb]);
    } else {
      if (!handlers.includes(cb)) {
        handlers.push(cb); // 不重复添加回调
      }
    }

    return this; // 允许链式添加事件回调
  }

  removeListener(eventName, cb) {
    const handlers = this.#events.get(eventName);

    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === cb) {
          handlers.splice(i, 1);
        }
      }
    }
    return this;
  }

  emit(eventName, ...args) {
    const handlers = this.#events.get(eventName);
    if (handlers && handlers.length) {
      handlers.forEach(cb => cb.apply(this, args));
      return true;
    }
    return false;
  }

  once(eventName, cb) {
    const wrapper = (...args) => {
      cb.apply(this, args);
      this.removeListener(eventName, wrapper);
    };

    this.addListener(eventName, wrapper);
    return this;
  }
}
