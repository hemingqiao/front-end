/** 简单的模拟实现new **/


/**
 * 使用es5的语法实现。new操作符在es5就存在了。因此没有使用es6+的语法。
 *
 * @param Parent
 * @returns {*}
 * @constructor
 */
function MyNew(Parent) {
  var obj = Object.create(Parent.prototype);
  var args = [].slice.call(arguments, 1);

  var result = Parent.apply(obj, args);
  // 需要排除掉result为null的可能，因为typeof null返回object
  // 还可以显示的使用result !== null作为判断条件
  if (result && (typeof result === "function" || typeof result === "object")) {
    return result;
  }
  return obj;
}
