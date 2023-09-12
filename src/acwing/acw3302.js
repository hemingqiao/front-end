/**
 * @param {string} expression
 * @return {number}
 */
const calculate = (expression) => {
    const nums = [], ops = [];
    const pr = new Map([['+', 1], ['-', 1], ['*', 2], ['/', 2]]);

    const eval = () => {
        let b = nums.pop(), a = nums.pop();
        let c = ops.pop();
        let res;
        if (c == '+') res = a + b;
        else if (c == '-') res = a - b;
        else if (c == '*') res = a * b;
        else res = a / b | 0;
        nums.push(res);
    };

    const isDigit = c => c >= '0' && c <= '9';

    for (let i = 0; i < expression.length; i++) {
        if (isDigit(expression[i])) {
            let t = 0, j = i;
            while (j < expression.length && isDigit(expression[j]))
                t = t * 10 + Number(expression[j++]);
            i = j - 1;
            nums.push(t);
        } else if (expression[i] == '(') {
            ops.push('(');
        } else if (expression[i] == ')') {
            while (ops.length && ops.at(-1) != '(')
                eval();
            ops.pop();
        } else {
            let c = expression[i];
            while (ops.length && ops.at(-1) != '(' && pr.get(ops.at(-1)) >= pr.get(c))
                eval();
            ops.push(c);
        }
    }
    while (ops.length) eval();
    return nums.pop();
};

let s = "2*(2+3)";
console.log(calculate(s));
console.log(structuredClone(s));
