class CountingSort {
    _counter;

    /**
     * {@link Uint32Array.prototype.fill} 是遍历数组清除的5倍速度左右.
     * 当数组长度超过这个值时, 用 {@link Uint32Array.prototype.fill} 清除.
     * 否则用遍历清除.
     */
    _clearThreshold;

    /**
     * @param max 最大值.不能超过1e7.
     */
    constructor(max) {
        if (max > 1e7) throw new Error('max cannot be greater than 1e7');
        this._counter = new Uint32Array(max + 5);
        this._clearThreshold = ((max + 5) / 5) | 0;
    }

    /**
     * 返回一个新的排序后的数组.
     * @complexity `O(max+n)`
     */
    sort(arr, reverse = false) {
        const n = arr.length;
        const res = Array(n);

        for (let i = 0; i < n; i++) this._counter[arr[i]]++;

        if (reverse) {
            for (let i = this._counter.length - 1, ptr = 0; ~i; i--) {
                for (let j = 0; j < this._counter[i]; j++) res[ptr++] = i;
            }
        } else {
            for (let i = 0, ptr = 0; i < this._counter.length; i++) {
                for (let j = 0; j < this._counter[i]; j++) res[ptr++] = i;
            }
        }

        if (n >= this._clearThreshold) this._counter.fill(0);
        else for (let i = 0; i < n; i++) this._counter[arr[i]]--;

        return res;
    }
}