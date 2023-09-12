const swap = (q, i, j) => {
    let t = q[i]; q[i] = q[j]; q[j] = t;
};

class Heap {
    heap = [0];
    cnt = 0;
    cmp;

    /**
     * 默认比较字典序
     * @param {function} cmp
     * @param {any[]} initialArray
     */
    constructor(cmp = (a, b) => a < b ? -1 : a > b ? 1 : 0, initialArray = []) {
        this.heap = this.heap.concat(initialArray);
        this.cnt = initialArray.length;
        this.cmp = cmp;
        this.heapify();
    }

    down(u) {
        let t = u;
        if (u * 2 <= this.cnt && this.cmp(this.heap[u * 2], this.heap[t]) < 0)
            t = u * 2;
        if (u * 2 + 1 <= this.cnt && this.cmp(this.heap[u * 2 + 1], this.heap[t]) < 0)
            t = u * 2 + 1;
        if (t !== u) {
            swap(this.heap, t, u);
            this.down(t);
        }
    }

    up(u) {
        while ((u >> 1) > 0 && this.cmp(this.heap[u], this.heap[u >> 1]) < 0) {
            swap(this.heap, u / 2 | 0, u);
            u >>= 1;
        }
    }

    poll() {
        if (this.cnt <= 0) throw new Error("heap is empty");

        const ret = this.heap[1];
        this.cnt--;
        // 弹出堆顶元素后，堆不为空，则进行调整
        const tail = this.heap.pop();
        if (this.cnt > 0) {
            this.heap[1] = tail;
            this.down(1);
        }
        return ret;
    }

    offer(x) {
        this.heap.push(x);
        this.cnt++;
        this.up(this.cnt);
    }

    peek() {
        if (this.cnt <= 0) throw new Error("heap is empty");
        return this.heap[1];
    }

    heapify() {
        for (let i = this.cnt >> 1; i; i--) {
            this.down(i);
        }
    }

    isEmpty() {
        return this.cnt <= 0;
    }

    get size() {
        return this.cnt;
    }
}
