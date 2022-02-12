/** 对instanceof的简单实现 **/


/**
 * 模拟实现 instanceof （instanceof的原理就是检查运算符右侧的函数的原型对象是否存在于运算法左侧的对象的原型链之上）
 * 需要注意的是运算符右侧必须是函数，且这个函数的prototype属性不能为非对象。
 * @param A
 * @param B
 * @return {boolean}
 */
function myInstanceof(A, B) {
  // B如果为undefined、null或者原始类型，抛出以下错误
  if (!B || Object(B) !== B) {
    throw new TypeError("Right-hand side of 'instanceof' is not an object");
  }
  if (typeof B !== "function") {
    throw new TypeError("Right-hand side of 'instanceof' is not callable");
  }

  let rightPrototype = B.prototype,
      leftProto = Object.getPrototypeOf(A);

  while (leftProto != null) {
    if (!rightPrototype) {
      throw new TypeError("Function has non-object prototype in instanceof check");
    }
    if (leftProto == rightPrototype) {
      return true;
    }
    leftProto = Object.getPrototypeOf(leftProto);
  }
  return false;
}


// /**
//  * A instanceof B 的原理就是判断B的原型对象是否存在于A的原型链上
//  *
//  * @param A
//  * @param B
//  * @returns {boolean}
//  * @constructor
//  */
// function MyInstanceof(A, B) {
//   var rightPrototype = B.prototype;
//   var leftProto = Object.getPrototypeOf(A);

//   while (true) {
//     if (rightPrototype == null) {
//       throw new Error();
//     }

//     if (leftProto == null) {
//       return false;
//     }

//     if (leftProto === rightPrototype) {
//       return true;
//     }
//     leftProto = Object.getPrototypeOf(leftProto);
//   }
// }
