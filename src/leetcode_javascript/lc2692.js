/*
请你编写一个函数，该函数接收一个对象 obj ，并返回该对象的一个新的 不可变 版本。

不可变 对象是指不能被修改的对象，如果试图修改它，则会抛出错误。

此新对象可能产生三种类型的错误消息。

    如果试图修改对象的键，则会产生以下错误消息： `Error Modifying: ${key}` 。
    如果试图修改数组的索引，则会产生以下错误消息： `Error Modifying Index: ${index}` 。
    如果试图调用会改变数组的方法，则会产生以下错误消息： `Error Calling Method: ${methodName}` 。
你可以假设只有以下方法能够改变数组： ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'] 。

obj 是一个有效的 JSON 对象或数组，也就是说，它是 JSON.parse() 的输出结果。

请注意，应该抛出字符串字面量，而不是 Error 对象。
 */

const allowMethods = ["pop", "push", "shift", "unshift", "splice", "sort", "reverse"];
const setArrayHandler = {
    set(target, p) {
        throw `Error Modifying Index: ${String(p)}`;
    }
};
const setObjHandler = {
    set(target, p) {
        throw `Error Modifying: ${String(p)}`;
    }
};
const mutArrayHandler = {
    apply(target) {
        throw `Error Calling Method: ${target.name}`;
    }
};

const createProxy = (obj) => {
    for (let k in obj) {
        if (typeof obj[k] == "object" && obj[k] != null)
            obj[k] = createProxy(obj[k]);
    }
    if (Array.isArray(obj)) {
        allowMethods.forEach(name => obj[name] = new Proxy(obj[name], mutArrayHandler));
        return new Proxy(obj, setArrayHandler);
    }
    return new Proxy(obj, setObjHandler);
};

/**
 * @param {Object | Array} obj
 * @return {Object | Array} immutable obj
 */
const makeImmutable = function (obj) {
    return createProxy(obj);
};

/**
 * const obj = makeImmutable({x: 5});
 * obj.x = 6; // throws "Error Modifying x"
 */
