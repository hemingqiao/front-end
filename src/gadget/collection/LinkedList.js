/*! *****************************************************************************
@author Heming
founded at 2020-12-17 20:51:16
created by IntelliJ IDEA
description: 双向链表。
@see java.util.LinkedList;
***************************************************************************** */

class LinkedList {
  _first; // 指向头结点的辅助指针（头指针）
  _last; // 指向尾结点的辅助指针（尾指针）
  _size; // 链表的size

  constructor() {
    this._first = this._last = null;
    this._size = 0;
  }


  /**
   * 判断集合是否为空（size === 0）
   * @return {boolean}
   */
  isEmpty() {
    return this._size === 0;
  }


  /**
   * 获取集合的大小
   * @return {number}
   */
  size() {
    return this._size;
  }


  /**
   * 获取头结点存储的值
   * @return {null|*}
   */
  getFirst() {
    if (this.isEmpty()) {
      return null;
    }
    return this._first.item;
  }


  /**
   * 获取尾结点存储的值
   * @return {null|*}
   */
  getLast() {
    if (this.isEmpty()) {
      return null;
    }
    return this._last.item;
  }


  /**
   * 在链表头部添加元素
   * @param item
   */
  addFirst(item) {
    let f = this._first;
    let newNode = new Node(null, item, this._first);
    this._first = newNode;
    // 如果f为null，表明执行addFirst之前是一个空集，因此，在执行完添加操作后，应将last也指向集合中唯一的元素
    if (f === null) {
      this._last = newNode;
    } else {
      // 集合非空则进行两个元素之间的链接
      f.prev = newNode;
    }
    this._size++;
  }


  /**
   * 在链表尾部添加元素
   * @param item
   */
  addLast(item) {
    let l = this._last;
    let newNode = new Node(this._last, item, null);
    this._last = newNode;
    // 同理，如果l为null，表明执行addLast之前是一个空集，因此，在执行完添加操作后，应将first也指向集合中唯一的元素
    if (l === null) {
      this._first = newNode;
    } else {
      l.next = newNode;
    }
    this._size++;
  }


  /**
   * 向链表集合中添加元素
   * @param item
   */
  add(item) {
    this.addLast(item);
  }


  /**
   * 在指定索引处添加元素
   * @param item
   * @param {number} index
   */
  addAt(item, index) {
    if (index < 0 || index > this._size) {
      throw new RangeError("index out of bounds");
    }
    if (index === this._size) {
      this.addLast(item);
      return;
    }
    let succ = this.getNode(index);
    let pred = succ.prev; // 当前节点的前一个节点
    let newNode = new Node(pred, item, succ);
    succ.prev = newNode;
    if (pred === null) { // 表明是在头结点进行的添加操作
      this._first = newNode; // 将头结点指向新节点
    } else {
      pred.next = newNode; // 否则，链接两个节点
    }
    this._size++;
  }


  /**
   * 删除链表中的第一个结点
   * @return {*}
   */
  removeFirst() {
    if (this.isEmpty()) {
      throw new Error("list is empty");
    }
    let removedItem = this._first.item;
    let next = this._first.next;
    this._first.next = null;
    delete this._first.item;
    this._first = next; // first重新指向新的头结点
    if (next === null) {
      /*如果next为null，说明该list只有一个元素，在删除之前first和last都指向这个唯一的元素，现在first指向了null，需要将last的指向从
      被删除元素上移除，也指向null*/
      this._last = null;
    } else {
      next.prev = null; // 将新头结点的prev指针置空
    }
    this._size--;
    return removedItem;
  }


  /**
   * 删除链表中的最后一个节点
   * @return {*}
   */
  removeLast() {
    if (this.isEmpty()) {
      throw new Error("lsit is empty");
    }
    let removedItem = this._last.item;
    let pred = this._last.prev;
    this._last.next = null;
    delete this._last.item;
    this._last = pred;
    if (pred === null) {
      /*同理，如果pred为null，说明该list只有一个元素，在删除之前first和last都指向这个唯一的元素，现在last指向了null，需要将first的指向从
      被删除元素上移除，也指向null*/
      this._first = null;
    } else {
      pred.next = null; // 将新的尾结点的next指针置空
    }
    this._size--;
    return removedItem;
  }


  /**
   * 删除链表中的一个节点
   * @return {*}
   */
  remove() {
    return this.removeLast();
  }


  /**
   * 删除给定索引处的节点
   * @param {number} index
   * @return {*}
   */
  removeAt(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError("index out of bounds");
    }
    let removedNode = this.getNode(index);
    let removedItem = removedNode.item;
    let pred = removedNode.prev;
    let next = removedNode.next;

    if (pred === null) {
      // 如果pred为null，表明删除的节点是头结点，将头指针后移
      this._first = next;
    } else {
      pred.next = next;
      removedNode.prev = null;
    }

    if (next === null) {
      // 同理，如果next为null，表明删除的节点是尾结点，将尾指针前移
      this._last = pred;
    } else {
      next.prev = pred;
      removedNode.next = null;
    }

    delete removedNode.item;
    this._size--;
    return removedItem;
  }


  /**
   * 清空链表
   */
  clear() {
    for (let x = this._first; x !== null; ) {
      let next = x.next;
      x.prev = null;
      delete x.item;
      x.next = null;
      x = next;
    }
    this._first = this._last = null; // 将头指针和尾指针置空
    this._size = 0;
  }


  /**
   * 获取指定索引处的值
   * @param {number} index
   * @return {*}
   */
  getAt(index) {
    if (index < 0 || index > this._size) {
      throw new RangeError("index out of bounds");
    }
    return this.getNode(index).item;
  }


  /**
   * 判断链表中是否存在给定值
   * @param o
   * @return {boolean}
   */
  contains(o) {
    return this.indexOf(o) !== -1;
  }

  /**
   * 查找给定值的索引
   * @param o
   * @return {number}
   */
  indexOf(o) {
    let idx = 0;
    for (let x = this._first; x !== null; x = x.next) {
      if (x.item === o) {
        return idx;
      }
      idx++;
    }
    return -1;
  }


  /**
   * 从尾部查找某个给定值的索引
   * @param o
   * @return {number}
   */
  lastIndexOf(o) {
    let idx = this._size - 1;
    for (let x = this._last; x !== null; x = x.prev) {
      if (x.item === o) {
        return idx;
      }
      idx--;
    }
    return -1;
  }


  /**
   * 更改指定索引处的值
   * @param item
   * @param {number} index
   * @return {*}
   */
  setAt(item, index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError("index out of bounds");
    }
    let node = this.getNode(index);
    let old = node.item;
    node.item = item;
    return old;
  }


  /**
   * 获取指定索引处的链表节点
   * @param {number} index
   */
  getNode(index) {
    // 双向链表，可以根据索引与链表大小的关系选择从头部开始查找还是从尾部开始查找
    let mid = this._size >>> 1;
    if (index <= mid) { // 表明处于集合的前半部分，从头部开始查找
      let temp = this._first;
      for (let i = 0; i < index; i++) {
        temp = temp.next;
      }
      return temp;
    } else { // 查找节点位于集合后半部分，从尾部开始查找
      let temp = this._last;
      for (let i = this._size - 1; i > index; i--) {
        temp = temp.prev;
      }
      return temp;
    }
  }


  /**
   * 重写toString方法（打印到控制台不会调用toString，只有进行字符串拼接时才会调用toString）
   * @return {string}
   */
  toString() {
    let prefix = "[ ";
    let x;
    for (x = this._first; x.next !== null; x = x.next) {
      prefix += x.item + ", ";
    }
    prefix += x.item + " ";
    return prefix + "]";
  }
}


/**
 * 链表节点类
 */
class Node {
  prev; // 指向前一个节点的指针
  item; // 节点处存储的值
  next; // 指向后一个节点的指针

  constructor(prev, item, next) {
    this.prev = prev;
    this.item = item;
    this.next = next;
  }
}


// for test
let l = new LinkedList();
l.add(32);
l.add(1024);
l.add(64);
console.log(l);
console.log(l.removeAt(2));
console.log(l.size());
console.log(l);
l.addAt(2048, 1);
console.log(l);
console.log(l.getAt(0));
console.log(l.toString());
let str = l + ""; // 此时会调用l的toString方法
console.log(str);
