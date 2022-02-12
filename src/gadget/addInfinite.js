/* -------------------------------函数链式调用------------------------------- */

const add = sum => {
    const fn = n => add(sum + n);
    fn.valueOf = () => sum;
    return fn;
}

console.log(add(0));
console.log(add(0)(1));
console.log(+add(0));
console.log(+add(0)(1)(2));

// log
// [Function: fn] { valueOf: [Function] }
// [Function: fn] { valueOf: [Function] }
// 0
// 3

// update
const add = (...args) => {
    const fn = (...vars) => add(...args, ...vars);
    fn.valueOf = () => args.reduce((prev, curr) => prev + curr);
    return fn;
}

console.log(+add(1, 2)(3, 4)(5));
console.log(+add(1, 2, 3)(4));

// log
// 15
// 10

// update
const add = (...args) => {
    const f = (...params) => add(...args, ...params);
    f.toString = args.reduce((a, b) => a + b);
    return f;
}


/*
modify at 2021.05.28

字节的一道面试题：
实现惰性柯里化函数 sum
sum(1)(2)(3, 4)() // 10
sum(1, 2)() // 3
当最后一次调用函数时传递参数为空时，表示需要调用函数生成结果了
 */

function sum(...args) {
    return function (...vars) {
        if (vars.length == 0) {
            return args.reduce((a, b) => a + b);
        }
        return sum(...args, ...vars);
    };
}

// 这个需要和上面的add函数对比理解
const sum = (...args) => {
    return (...vars) => {
        if (vars.length == 0) return args.reduce((a, b) => a + b);
        return sum(...args, ...vars);
    };
};
