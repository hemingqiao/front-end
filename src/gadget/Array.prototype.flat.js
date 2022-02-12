/*! *****************************************************************************
@author Heming
founded at 2021-09-11 15:44:28
created by WebStorm
description: a simple polyfill for Array.prototype.flat
***************************************************************************** */

const EXPECTED_ARRAY_INSTANCE_TEXT = "flat function can only be invoked by an Array instance";
const test = [0, [1, 2], [[3, [4], 5], [[6]]], 7];

/**
 * fake flat(iteration version)
 *
 * @param {number} depth
 * @return {Array<T>}
 */
Array.prototype.my_flat = function (depth = 1) {
    if (!Array.isArray(this)) throw new TypeError(EXPECTED_ARRAY_INSTANCE_TEXT);
    if (Object.is(depth, NaN) || typeof depth !== "number") return this;
    let ret = this.slice(), o = ret;
    while (depth-- > 0) {
        if (o.some(item => Array.isArray(item))) {
            ret = [].concat(...o);
            o = ret;
        } else {
            break;
        }
    }
    return ret;
};

// console.log(test.my_flat(1));

/**
 * fake flat(recursive version)
 *
 * @param {number} depth
 * @return {Array<T>}
 */
Array.prototype.fake_flat = function (depth) {
    if (!Array.isArray(this)) throw new TypeError(EXPECTED_ARRAY_INSTANCE_TEXT);
    if (Object.is(depth, NaN) || typeof depth !== "number") return this;
    if (depth <= 0) return this.slice();
    return this.reduce((acc, cur) => {
        if (Array.isArray(cur)) {
            acc.push(...cur.fake_flat(depth - 1));
        } else {
            acc.push(cur);
        }
        return acc;
    }, []);
};

console.log(test.fake_flat(Infinity));
