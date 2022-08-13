const SYMBOL_FOO = Symbol("foo");

const isNotObject = o => !o || typeof o !== "object";

function deepCompare(a, b) {
    if (isNotObject(a) || isNotObject(b))
        return a === b;

    if (Reflect.ownKeys(a).length !== Reflect.ownKeys(b).length)
        return false;

    for (let k of Reflect.ownKeys(a)) {
        if (!deepCompare(a[k], b[k]))
            return false;
    }
    return true;
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
