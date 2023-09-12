// 惰性代理，只有当第一次访问属性的时候才创建代理

const allowMethods = ["pop", "push", "shift", "unshift", "splice", "sort", "reverse"];
const isObject = o => typeof o == "object" && o != null;

const propHandler = {
    get(target, p) {
        const v = Reflect.get(target, p);
        if (!isObject(v)) return v;
        return proxify(v);
    },
    set(target, p) {
        if (Array.isArray(target)) {
            throw `Error Modifying Index: ${String(p)}`;
        }
        throw `Error Modifying: ${String(p)}`;
    }
};

const mutArrayHandler = {
    apply(target) {
        throw `Error Calling Method: ${target.name}`;
    }
};

const proxify = (obj) => {
    if (Array.isArray(obj)) {
        allowMethods.forEach(name => obj[name] = new Proxy(obj[name], mutArrayHandler));
    }
    return new Proxy(obj, propHandler);
};

/**
 * @param {Object | Array} obj
 * @return {Object | Array} immutable obj
 */
const makeImmutable = function(obj) {
    return proxify(obj);
};

/**
 * const obj = makeImmutable({x: 5});
 * obj.x = 6; // throws "Error Modifying x"
 */
