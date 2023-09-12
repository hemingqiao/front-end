/*
创建带有微小修改的不可变对象的克隆副本是一个繁琐的过程。请你编写一个名为 ImmutableHelper 的类，作为满足这一要求的工具。构造函数接受一个不可变对象 obj ，该对象将是一个 JSON 对象或数组。

该类有一个名为 produce 的方法，它接受一个名为 mutator 的函数。该函数返回一个新的对象，它与原始对象相似，但应用了这些变化。

mutator 函数接受 obj 的 代理 版本。函数的使用者可以（看起来）对该对象进行修改，但原始对象 obj 实际上没有被改变。

例如，用户可以编写如下代码：

const originalObj = {"x": 5};
const helper = new ImmutableHelper(originalObj);
const newObj = helper.produce((proxy) => {
  proxy.x = proxy.x + 1;
});
console.log(originalObj); // {"x": 5}
console.log(newObj); // {"x": 6}

mutator 函数的属性：

    它始终返回 undefined 。
    它永远不会访问不存在的键。
    它永远不会删除键（ delete obj.key ）。
    它永远不会在代理对象上调用方法（ push 、shift 等）。
    它永远不会将键设置为对象（ proxy.x = {} ）。

关于如何测试解决方案的说明：解决方案验证器仅分析返回结果与原始 obj 之间的差异。进行完全比较的计算开销太大。此外，对原始对象进行的任何变更都将导致答案错误。
 */

const isObject = o => o != null && typeof o == "object";

// proxy handler
class Handler {
    origin;
    /** @type {Map<string, [Handler, Proxy]>} */
    children = new Map();
    /** @type {Map<string, any>} */
    action = new Map();

    constructor(obj) {
        this.origin = obj;
    }

    get(target, prop) {
        if (this.action.has(prop)) return this.action.get(prop);
        if (this.children.has(prop)) return this.children.get(prop)[1];

        const res = this.origin[prop];
        if (!isObject(res)) return res;
        const handler = new Handler(res);
        const proxy = new Proxy(res, handler);
        this.children.set(prop, [handler, proxy]);
        return proxy;
    }

    set(target, prop, newVal) {
        this.children.delete(prop);
        this.action.set(prop, newVal);
        return true;
    }

    query() {
        const patch = Object.create(null);
        let dirty = this.dirty;
        this.children.forEach(([childHandler], key) => {
            const [isChildDirty, childRes] = childHandler.query();
            if (isChildDirty) {
                dirty = true;
                patch[key] = childRes;
            }
        });

        if (!dirty) return [false, this.origin];
        const res = {...this.origin, ...patch};
        this.action.forEach((value, key) => {
            res[key] = value;
        });
        return [true, res];
    }

    get dirty() {
        return !!this.action.size;
    }
}

class ImmutableHelper {
    constructor(obj) {
        this.base = obj;
    }

    /**
     * @param {Function} mutator
     * @return {JSON} clone of obj
     */
    produce(mutator) {
        const handler = new Handler(this.base);
        const proxy = new Proxy(this.base, handler);
        mutator(proxy);
        return handler.query()[1];
    }
}

/**
 * const originalObj = {"x": 5};
 * const mutator = new ImmutableHelper(originalObj);
 * const newObj = mutator.produce((proxy) => {
 *   proxy.x = proxy.x + 1;
 * });
 * console.log(originalObj); // {"x: 5"}
 * console.log(newObj); // {"x": 6}
 */
