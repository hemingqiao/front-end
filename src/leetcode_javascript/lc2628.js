/*
给定两个对象 o1 和 o2 ，请你检查它们是否 完全相等 。

对于两个 完全相等 的对象，它们必须包含相同的键，并且相关的值也必须 完全相等 。如果两个对象通过了 === 相等性检查，它们也被认为是 完全相等 的。

你可以假设这两个对象都是 JSON.parse 的输出。换句话说，它们是有效的 JSON 。

请你在不使用 lodash 的 _.isEqual() 函数的前提下解决这个问题。
 */

const isPrimitive = o => o == null || typeof o != "object";
const { toString } = Object.prototype;

/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
const areDeeplyEqual = function(o1, o2) {
    if (toString.call(o1) != toString.call(o2)) return false;
    if (isPrimitive(o1)) return o1 === o2;
    if (Object.keys(o1).length != Object.keys(o2).length) return false;
    return Object.keys(o1).every(k => areDeeplyEqual(o1[k], o2[k]));
};
