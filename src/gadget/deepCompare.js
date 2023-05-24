const SYMBOL_FOO = Symbol("foo");

const isPrimitive = o => o == null || typeof o !== "object";
const { toString } = Object.prototype;

function deepCompare(o1, o2) {
    // { "0": 1, length: 1 } and [1]
    if (toString.call(o1) != toString.call(o2)) return false;
    if (isPrimitive(o1)) return o1 === o2;
    if (Object.keys(o1).length != Object.keys(o2).length) return false;

    return Object.keys(o1).every(k => deepCompare(o1[k], o2[k]));
}

let a = {
    b: 32,
    c: 1024,
    d: {
        e: [64, 1024],
        f: [
            [[42], [1024]],
        ]
    },
    g: null,
    h: undefined,
    [Symbol.for("foo")]: "symbol",
    i: ["end"],
};

let b = {
    b: 32,
    c: 1024,
    d: {
        e: [64, 1024],
        f: [
            [[42], [1024]],
        ]
    },
    g: null,
    h: undefined,
    [Symbol.for("foo")]: "symbol",
    i: ["end"],
};

console.log(deepCompare(a, b));

let obj = { here: { is: "an" }, object: 2 };
console.log(deepCompare(obj, obj));

let result = deepCompare(obj, { here: 1, object: 2 });
console.log(result);
console.log(deepCompare(obj, { here: { is: "an" }, object: 2 }));
console.log(deepCompare({0: 1, length: 1}, [1]));
