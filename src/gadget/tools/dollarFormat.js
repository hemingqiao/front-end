/* 将数值格式化为形如 $ 888,888.00 的格式 */

/**
 * 格式化数字为特定格式
 *
 * @param {*} num
 */
function format(num) {
    return num.toFixed(2).replace(/(?!^)(?=(\d{3})+\b)/g, ",").replace(/^/, "$ ");
}

const num = 300000;
console.log(format(num));
const dot = 188888.156;
console.log(format(dot));

// log
// $ 300,000.00
// $ 188,888.16

const format1 = num => {
    const [left, right] = num.toFixed(2).split(".");
    const stk = left.split(""), t = [];
    while (stk.length > 3) {
        let s = "";
        for (let i = 0; i < 3; i++) s = stk.pop() + s;
        t.push(s);
    }
    let res = stk.join("");
    if (t.length) res += ",";
    res += t.reverse().join(",");
    if (right) res += '.' + right;
    return res;
};

console.log(format1(3000));
