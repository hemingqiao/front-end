class Observer {
  handlers = new Map();

  subscribe(type, cb) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type).push(cb);
  }

  publish(type) {
    if (!this.handlers.has(type)) return;
    this.handlers.get(type).forEach(cb => cb());
  }

  // 定义一个取消订阅的函数，需要显式传入订阅的类型和订阅的函数
  unsubscribe(type, cb) {
    if (!this.handlers.has(type)) return;
    const cbs = this.handlers.get(type);
    for (let i = 0; i < cbs.length; i++) {
      if (Object.is(cbs[i], cb)) {
        cbs.splice(i, 1);
      }
    }
  }
}

class Observer {
  handlers = new Map();

  // 订阅时返回一个取消订阅的函数
  subscribe(type, cb) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    let index = this.handlers.get(type).push(cb);

    return () => {
      this.handlers.get(type).splice(index, 1);
    };
  }

  publish(type) {
    if (!this.handlers.has(type)) return;
    this.handlers.get(type).forEach(cb => cb());
  }
}

let ob = new Observer();

ob.subscribe("foo", () => console.log(1));
const foo = () => console.log(2);
let unsub1 = ob.subscribe("foo", foo);
ob.subscribe("foo", foo);

ob.publish("foo");
unsub1();
ob.publish("foo");
