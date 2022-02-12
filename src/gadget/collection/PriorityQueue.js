/*! *****************************************************************************
@author Heming
founded at 2020-12-23 12:46:55
created by WebStorm
description: js实现优先队列。
参考：java.util.PriorityQueue
参考：https://www.cnblogs.com/Elliott-Su-Faith-change-our-life/p/7472265.html

满二叉树用数组表示父节点和子节点的关系
leftNo = parentNo * 2 + 1
rightNo = parentNo * 2 + 2
parentNo = (nodeNo-1) / 2
***************************************************************************** */

class PriorityQueue {
  #queue = [];
  #size = 0;


  /**
   * 默认的比较器按照升序排列
   * @param initialArr
   * @param comparator
   */
  constructor(initialArr = [], comparator = (a, b) => a < b ? -1 : a > b ? 1 : 0) {
    this.comparator = comparator;
    this.#queue = this.#queue.concat(initialArr);
    this.#size = this.#queue.length;
    this.heapify();
  }


  /**
   * 返回优先队列元素个数
   * @return {number}
   */
  size() {
    return this.#size;
  }


  /**
   * 删除并返回堆顶元素
   * @return {null|*}
   */
  poll() {
    if (this.#size === 0) {
      return null;
    }
    let s = --this.#size; // size减小1
    let ret = this.#queue[0];
    let x = this.#queue[s];
    this.#queue[s] = null;
    if (s !== 0) {
      this.siftDown(0, x); // 从堆顶开始调整
    }
    return ret;
  }


  /**
   * 自顶向下调整堆
   * @param k 待填充的位置
   * @param x 待插入的值
   */
  siftDown(k, x) {
    let half = this.#size >>> 1;
    while (k < half) {
      let childIdx = (k << 1) + 1; // leftChildNo = parentNo * 2 + 1
      let right = childIdx + 1;
      let child = this.#queue[childIdx];
      if (right < this.#size && this.comparator(child, this.#queue[right]) > 0) {
        child = this.#queue[childIdx = right];
      }
      if (this.comparator(x, child) <= 0) break;
      this.#queue[k] = child;
      k = childIdx;
    }
    this.#queue[k] = x;
  }


  /**
   * 向堆中增加元素
   * @param e
   * @return {PriorityQueue}
   */
  add(e) {
    let i = this.#size;
    if (i === 0) {
      this.#queue[0] = e;
    } else {
      this.siftUp(i, e);
    }
    this.#size++; // size自增
    return this;
  }


  /**
   * 自底向上调整堆
   * @param k
   * @param x
   */
  siftUp(k, x) {
    while (k > 0) {
      let parentIdx = (k - 1) >>> 1; // parentNo = (nodeNo - 1) / 2
      let e = this.#queue[parentIdx];
      if (this.comparator(x, e) >= 0) break;
      this.#queue[k] = e;
      k = parentIdx;
    }
    this.#queue[k] = x;
  }


  /**
   * 返回堆顶元素（不删除）
   * @return {null|*}
   */
  peek() {
    if (this.#size === 0) {
      return null;
    }
    return this.#queue[0];
  }


  /**
   * 将给定数组堆化
   */
  heapify() {
    let i = (this.#size - 1) >>> 1;
    while (i >= 0) {
      this.siftDown(i, this.#queue[i])
      i--;
    }
  }

  /**
   * 重写toString方法
   * @return {string}
   */
  toString() {
    return this.#queue.toString();
  }
}


// for test
// let pq = new PriorityQueue([2048, 64]);
// console.log(pq);
// console.log(pq.toString());
// pq.add(32);
// pq.add(1024);
// pq.add(64);
// console.log(pq);
// console.log(pq.toString());
// let persons = Array.from(Array(20)).map(value => Math.random() * 20 | 0)
//   .map(num => {
//     return {
//       age: num,
//     }
//   });
// let pp = new PriorityQueue(persons, (o1, o2) => o1.age - o2.age);
// console.log(pp);


/**
 * 借助堆实现排序
 * @param array
 * @return {[]}
 */
function heapSort(array) {
  let p = new PriorityQueue(array);
  let ret = [];
  while (p.size()) {
    ret.push(p.poll());
  }
  return ret;
}

/**
 * 用以判断数组是否是有序的（升序）
 * @param array
 * @return {boolean}
 */
function isSortedAsc(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) return false;
  }
  return true;
}

let test = Array(20000000).fill(0).map(_ => Math.random() * 20000000 | 0);
// let test = Array(20).fill(0).map(_ => Math.random() * 100 | 0);
// console.log(test);
console.time("start");
let ret = heapSort(test);
console.timeEnd("start");
// console.log(ret);
console.log(isSortedAsc(ret));
