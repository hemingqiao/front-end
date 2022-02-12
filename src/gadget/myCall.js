/**
 * 使用es5语法不完全模拟实现
 *    Function.prototype.call
 *    Function.prototype.apply
 *    Function.prototype.bind
 *
 * **/

/**
 * 不使用es6+的语法不完全实现Function.prototype.call
 *
 * @param context
 * @returns {*}
 */
Function.prototype.myCall = function (context) {
  context = typeof context === "object"
    ? context === null ? window : context
    : context === undefined ? window : Object(context);
  context.__fn__ = this;

  var result;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  result = eval("context.__fn__(" + args + ")");

  delete context.__fn__;
  return result;
}


// test
function foo() {
  console.log(this);
}

foo.call(null); // window
foo.myCall(null); // window
foo.call("foo"); // String {"foo"}
foo.myCall("foo"); // String {"foo"}

function bar(sex, age) {
  this.sex = sex;
  this.age = age;
  this.info = function () {
    console.log(this.sex, this.age);
  }
  console.log(sex);
  console.log(age);
  console.log(this.x);
}

bar.call({x: 32}, "male", 23); // "male" 23 32
bar.myCall({x: 32}, "male", 23); // "male" 23 32


/**
 * 不使用es6+语法不完全实现Function.prototype.apply
 *
 * @param context
 * @param arr
 * @returns {*}
 */
Function.prototype.myApply = function (context, arr) {
  context = typeof context === "object"
    ? context === null ? window : context
    : context === undefined ? window : Object(context);
  context.__fn__ = this;

  var result;
  var args = [];
  if (arguments.length === 1 || arr == null) {
    result = context.__fn__(); // 如果没有提供第二个参数或者第二个参数为null或者为undefined
  } else if (arr && typeof arr === "object" && typeof arr.length === "number") {
    // apply的第二个参数可以为数组或者类数组对象
    for (var i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }

    result = eval("context.__fn__(" + args + ")");
  } else {
    throw new TypeError(
      "Function.prototype.apply - the second argument should be an Array or an ArrayLike object");
  }

  delete context.__fn__;
  return result;
}


// test
foo.apply(undefined); // window
foo.myApply(undefined); // window

bar.apply({x: 32}, ["male", 23]);
bar.myApply({x: 32}, ["male", 23]);


/*
bind的实现与call和apply具有较大的不同，主要是要考虑到bind返回的函数可以作为普通函数被调用也可以作为构造函数被调用。
并且两者的行为完全不同。
 */


/**
 * 通过直接调用原函数来实现new功能
 *
 * @param context
 * @returns {fBound}
 */
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound must be a function");
  }

  var fToBind = this;
  var args = [].slice.call(arguments, 1);

  var fBound = function () {
    var bindArgs = [].slice.call(arguments);

    if (this instanceof fBound) {
      var args_ = [];
      for (var i = 0; i < args.length; i++) {
        args_.push("args[" + i + "]");
      }
      for (var j = 0; j < bindArgs.length; j++) {
        args_.push("bindArgs[" + j + "]");
      }

      return eval("new fToBind(" + args_ + ")");
    } else {
      return fToBind.apply(context, args.concat(bindArgs));
    }
  };

  return fBound;
}


/**
 * 间接调用被绑定函数来实现new功能
 *
 * @param context
 * @returns {function(): *}
 */
Function.prototype.myBindNormal = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound must be a function");
  }

  var fToBind = this;
  var args = [].slice.call(arguments, 1);
  var fBound = function () {
    var bindArgs = [].slice.call(arguments);
    return fToBind.apply(this instanceof fBound
      ? this
      : context, args.concat(bindArgs));
  }

  // 完善原型链
  /*
  if (this.prototype) {
    fBound.prototype = Object.create(this.prototype);
  }
  */
  function AUXI() {
  }

  if (this.prototype) {
    AUXI.prototype = this.prototype;
  }
  fBound.prototype = new AUXI();

  return fBound;
}


/*
原生bind的实现中，通过调用bind返回的fBound函数，不具有prototype属性。
并且如果通过new调用fBound函数，会直接返回一个被绑定函数（fToBind）的实例而不是fBound的实例。
但是目前对bind的普遍实现都是上面的第二种，通过原型链模拟new调用，并且返回的实例是fBound的实例而不是被绑定函数的实例。
但是第二种方法相当于在实例和被绑定函数的prototype属性中间又隔开一层，避免了直接修改prototype对象。
 */

const originBound = bar.bind({x: 1024});
console.dir(originBound);
const fBound = bar.myBind({x: 1024})
console.dir(fBound);
const fBoundNormal = bar.myBindNormal({x: 1024})
console.dir(fBoundNormal);

console.log("----------------split line----------------");

console.dir(new originBound("male", 23));
console.dir(new fBound("male", 23));
console.dir(new fBoundNormal("male", 23));


// 带有占位符的bind

let _ = {};

function bind(fn, thisArg, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("what is trying to be bound must be a function");
  }

  const bound = function (...vars) {
    args.forEach((val, idx) => {
      if (Object.is(val, _)) {
        args.splice(idx, 1, vars.shift());
      }
    });

    return fn.apply(this instanceof bound
      ? this
      : thisArg, args.concat(vars));
  };

  // 完善原型链
  if (fn.prototype) {
    bound.prototype = Object.create(fn.prototype);
    Object.defineProperty(bound.prototype, "constructor", {
      value: bound,
    }); // 可选操作
  }
  return bound;
}

function foo(a, b, c) {
  console.log(a, b, c);
}

let bound = bind(foo, null, _, 64);
bound(32, 1024);

function bar(name, age, sex) {
  this.name = name;
  this.age = age;
  console.log(name, age, sex);
}

let boundBar = bind(bar, {x: 32});
let bb = new boundBar("qihui", 24, "male");
console.dir(bb);
