/** 函数的柯里化 **/

/**
 * 使用es6+语法实现函数的柯里化
 *
 * @param fn
 * @param length
 * @returns {function(...[*]=)}
 */
function curry(fn, length = fn.length) {
  return function (...args) {
    if (length <= args.length) {
      return fn(...args);
    } else {
      return curry(curryAuxiliary(fn, ...args), length - args.length);
    }
  }
}

function curryAuxiliary(fn, ...args) {
  return function (...vars) {
    return fn(...args, ...vars);
  }
}


/**
 * 使用es5的语法实现函数的柯里化，实际上就是用es5的语法重新写了上面的方法
 *
 * @param fn
 * @param length
 * @returns {function(...[*]=)}
 */
function curry(fn, length) {
  length = length || fn.length;

  return function () {
    var args = [].slice.call(arguments);
    if (length <= args.length) {
      return fn.apply(this, args);
    } else {
      var combined = [fn].concat(args);
      return curry(curryAuxiliary.apply(this, combined), length - args.length);
    }
  }
}

function curryAuxiliary(fn) {
  var args = [].slice.call(arguments, 1);

  return function () {
    var vars = [].slice.call(arguments);
    return fn.apply(this, args.concat(vars));
  }
}


/**
 * 箭头函数形式
 *
 * @param fn
 * @param args
 * @returns {*}
 */
const curry = (fn, ...args) =>
  fn.length <= args.length
    ? fn(...args)
    : curry.bind(this, fn, ...args);

 
/*
补充
*/
function curry(fn, ...args) {
  return function (...vars) {
    let args_ = args.concat(vars);
    if (fn.length <= args_.length) {
      return fn.apply(this, args_);
    } else {
      return curry.call(this, fn, ...args_);
    }
  };
}

// 上面代码的箭头函数版本
const curry = (fn, ...args) => (...vars) =>
  fn.length <= args.concat(vars).length
    ? fn.apply(this, args.concat(vars))
    : curry.call(this, fn, ...args.concat(vars));



/**
 * 普通版本的柯里化，es5语法
 *
 * @param fn
 * @param args
 * @returns {function(...[*]=)}
 */
function curryNormal(fn, args) {
  var length = fn.length;
  args = args || [];

  return function () {
    var args_ = args.slice();
    for (var i = 0; i < arguments.length; i++) {
      args_.push(arguments[i]);
    }

    if (length <= args_.length) {
      return fn.apply(this, args_);
    } else {
      return curryNormal.call(this, fn, args_);
    }
  }
}



/*! *****************************************************************************
@author Heming
founded at 2020-12-22 19:32:22
created by WebStorm
description: 可传入占位符的柯里化（貌似实现的不太对）
***************************************************************************** */

let _ = {};

function curry(fn, allArgs = []) {
  let length = fn.length;

  return function (...args) {
    let _args = allArgs.slice();
    // args中存在占位符
    if (args.includes(_)) {
      _args = _args.concat(args);
    } else {
      // args中不存在占位符，可以向前补位
      _args.forEach((val, idx) => {
        if (Object.is(val, _) && args.length !== 0) {
          _args.splice(idx, 1, args.shift());
        }
      });
      if (args.length !== 0) {
        _args = _args.concat(args);
      }
    }

    // 如果尚未汇集完参数，或者仍存在占位符，需要继续汇集参数
    if (_args.length < length || _args.includes(_)) {
      return curry(fn, _args);
    } else {
      return fn(..._args);
    }
  }
}

let curriedFoo = curry(foo);
curriedFoo(_, 1024)(_, 64)(32, 2048);

function foo(a, b, c) {
  console.log(a, b, c);
}

// log
// 32 1024 2048
