/*! *****************************************************************************
@author Heming
founded at 2021-05-02 10:53:27
created by WebStorm
description: 数组和树状结构相互转换

@see D:\20_webstorm\面试\listToTree.js
***************************************************************************** */

let arr = [
  {id: 0, pid: 0, children: [1, 2]},
  {id: 1, pid: 0, children: [3, 5]},
  {id: 2, pid: 0, children: [4]},
  {id: 3, pid: 1, children: []},
  {id: 4, pid: 2, children: []},
  {id: 5, pid: 1, children: []},
];


/**
 * 非递归解法
 *
 * @param arr
 * @return {*[]}
 */
function convertToTree(arr) {
  let map = new Map();
  let tree = [];
  for (let item of arr) {
    map.set(item.id, item);
    item.children = [];
  }
  for (let node of arr) {
    if (node.id !== node.pid) {
      map.get(node.pid).children.push(node);
    } else {
      tree.push(node);
    }
  }
  return tree;
}


/**
 * 递归解法
 *
 * @param arr
 * @param parent
 * @param depth
 * @return {*}
 */
function recurSolution(arr, parent = 0, depth = 0) {
  let root = arr.shift();
  root.depth = depth;
  root.children = loop(arr, parent, depth + 1);
  return root;

  function loop(arr, parent, depth) {
    let ret = [];
    for (let item of arr) {
      if (item.pid === parent) {
        item.depth = depth;
        let res = loop(arr, item.id, depth + 1);
        if (res.length) item.children = res;
        ret.push(item);
      }
    }
    return ret;
  }
}

let res = recurSolution(arr);
console.log(res);


/**
 * 广度优先遍历（将树状结构转为数组）
 *
 * @param tree
 * @return {*[]}
 */
function treeToList(tree) {
  let ret = [];
  let queue = [];
  if (tree.children.length) {
    queue.push(...tree.children);
  }
  ret.push(tree)
  while (queue.length !== 0) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let child = queue.shift();
      ret.push(child);
      if (child.children.length) queue.push(...child.children);
    }
  }
  return ret;
}


/**
 * 深度优先遍历
 *
 * @param tree
 * @return {*[]}
 */
function treeToList1(tree) {
  let res = dfs(tree);
  // 返回结果做一些处理
  return res.map(item => {
    item.children = item.children.map(e => e.id);
    return item;
  });

  function dfs(tree) {
    let ret = [];
    ret.push(tree);
    for (let child of tree.children) {
      ret.push(...dfs(child));
    }
    return ret;
  }
}

console.log(treeToList1(res));
