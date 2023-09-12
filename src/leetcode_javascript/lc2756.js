/*
将多个小查询批处理为单个大查询可以是一种有用的优化。请编写一个名为 QueryBatcher 的类来实现这个功能。

它的构造函数应接受两个参数：

    1. 一个异步函数 queryMultiple ，它接受一个字符串键的数组作为输入。它将返回一个与输入数组长度相同的值数组。
    每个索引对应于与 input[i] 相关联的值。可以假设该异步函数永远不会被拒绝。
    2. 一个以毫秒为单位的节流时间t。
该类有一个方法：

async getValue(key)：接受一个字符串键，并返回一个解析后的字符串值。传递给此函数的键值最终应传递给 queryMultiple 函数。
在 t 毫秒内不应连续调用 queryMultiple 。第一次调用 getValue 时，应立即使用该单个键调用 queryMultiple 。
如果在 t 毫秒后再次调用了 getValue ，则所有传递的键应传递给 queryMultiple ，并返回最终结果。可以假设传递给该方法的每个键都是唯一的。
 */

class QueryBatcher {
    invokedTime = -1;
    args = [];
    /** @type {Map<number, Promise<any[]>>} */
    map = new Map();

    /**
     * @param {Function} queryMultiple
     * @param {number} t
     */
    constructor(queryMultiple, t) {
        this.queryMultiple = queryMultiple;
        this.interval = t;
    }

    /**
     * @param {string} key
     * @returns Promise<string>
     */
    async getValue(key) {
        const now = Date.now();
        if (this.invokedTime == -1 || now - this.invokedTime >= this.interval) {
            this.invokedTime = now;
            const res = await this.queryMultiple([key]);
            return res[0];
        }

        if (!this.map.has(this.invokedTime)) {
            const p = new Promise((resolve) => {
                setTimeout(async () => {
                    this.invokedTime = Date.now();
                    const keys = this.args.slice();
                    this.args = [];
                    const res = await this.queryMultiple(keys);
                    resolve(res);
                }, this.interval - (now - this.invokedTime));
            });
            this.map.set(this.invokedTime, p);
        }

        const idx = this.args.length;
        this.args.push(key);
        const res = await this.map.get(this.invokedTime);
        return res[idx];
    }
}

/**
 * async function queryMultiple(keys) {
 *   return keys.map(key => key + '!');
 * }
 *
 * const batcher = new QueryBatcher(queryMultiple, 100);
 * batcher.getValue('a').then(console.log); // resolves "a!" at t=0ms
 * batcher.getValue('b').then(console.log); // resolves "b!" at t=100ms
 * batcher.getValue('c').then(console.log); // resolves "c!" at t=100ms
 */
