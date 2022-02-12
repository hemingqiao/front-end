/*! *****************************************************************************
@author Heming
founded at 2020-12-10 18:59:54
created by IntelliJ IDEA
description: 利用二叉搜索树的性质对数组进行排序（生成的二叉树不是平衡的）
***************************************************************************** */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * 由给定的数组生成一个二叉树
 * @param {number[]} array
 * @return {TreeNode}
 */
function arrayToTree(array) {
  if (!array.length) return new TreeNode(-1);
  let len = array.length;
  let root = new TreeNode(array[0]);
  let nodes = [root];
  let j = 0; // j指针用来遍历nodes数组
  for (let i = 1; i < len; i++) {
    let node = nodes[j];
    if (array[i] !== null) {
      let temp = new TreeNode(array[i]);
      node.left = temp;
      nodes.push(temp);
    }
    i++;
    if (i >= len) break;
    if (array[i] !== null) {
      let temp = new TreeNode(array[i]);
      node.right = temp;
      nodes.push(temp);
    }
    j++;
  }
  return root;
}


/**
 * 将给定的二叉树转为数组（层序遍历的顺序）
 * @param {TreeNode} root
 * @return {number[]}
 */
function treeToArray(root) {
  const ret = [];
  if (root === null) return ret;
  const queue = [root];
  for (let i = 0; i < queue.length; i++) {
    let node = queue[i];
    if (node !== null) {
      ret.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      ret.push(null);
    }
  }

  let size = ret.length;
  // 从后到前把第一个非null元素之前的null全部删除
  for (let j = size - 1; j >= 0; j--) {
    if (ret[j] === null) {
      ret.pop();
    } else {
      break;
    }
  }
  return ret;
}

// for test
// let arr = generateRandomArray(10, 100);
// console.log(arr);
// let tree = arrayToTree(arr);
// console.log(tree);
// console.log(treeToArray(tree));
//
// let test = [1, 2, 3, null, 4, 5, null];
// let tree1 = arrayToTree(test);
// console.log(tree1);
// let arrTest = treeToArray(tree1);
// console.log(arrTest);

/**
 * 迭代法先序遍历二叉树
 * @param root
 * @return {[]}
 */
function preorderTraversal(root) {
  const ret = [];
  if (root == null) return ret;
  const stack = [];
  while (root !== null || stack.length !== 0) {
    while (root !== null) {
      stack.push(root);
      ret.push(root.val);
      root = root.left;
    }
    root = stack.pop();
    root = root.right;
  }
  return ret;
}


/**
 * 迭代法中序遍历二叉树
 * @param root
 * @return {[]}
 */
function inorderTraversal(root) {
  const ret = [];
  if (root == null) return ret;
  const stack = [];
  while (root !== null || stack.length !== 0) {
    while (root !== null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    ret.push(root.val);
    root = root.right;
  }
  return ret;
}

// for test
// console.log(inorderTraversal(tree1));


/**
 * 将一个给定的值插入到BST（二叉搜索树）中
 * @param {TreeNode} root
 * @param {number} val
 */
function insertIntoBST(root, val) {
  let node = new TreeNode(val);
  if (root === null) return node;
  let cur = root;
  while (true) {
    if (cur.val > val) {
      // 如果当前节点的左子节点为空，插入到左子节点
      if (cur.left === null) {
        cur.left = node;
        break;
      }
      cur = cur.left;
    } else {
      if (cur.right === null) {
        cur.right = node;
        break;
      }
      cur = cur.right;
    }
  }
  return root;
}

/**
 * 利用二叉搜索树的性质对无序数组进行排序
 * @param array
 * @return {*[]}
 * @constructor
 */
function BSTSort(array) {
  let bstTree = null;
  for (let e of array) {
    bstTree = insertIntoBST(bstTree, e);
  }

  return inorderTraversal(bstTree);
}

// let unsorted = generateRandomArray(20, 100);
// console.log(unsorted);
//
// console.log(BSTSort(unsorted));

let a = generateRandomArray(1000000, 10000000);
console.log(a);
console.time("start");
let anew = BSTSort(a);
console.timeEnd("start"); // 988.800 ms 作为对比，快排对size为1000000，边界为10000000的数据进行排序花费150.941ms
console.log(anew);


/** ------------------------- utils -------------------------  **/

/**
 * 生成一个指定大小（size）和边界（boundary）的随机数组
 * @param size
 * @param boundary
 * @return {[]}
 */
function generateRandomArray(size, boundary) {
  let ret = [];
  for (let i = 0; i < size; i++) {
    ret.push(Math.random() * boundary | 0);
  }
  return ret;
}
