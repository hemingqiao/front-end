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
 * @param {any[]} arr
 * @returns {*}
 */
function toTree(arr) {
    let root = arr.splice(arr.findIndex(item => item.id === item.pid), 1)[0];
    return help(root, root.id, 0);

    function help(root, pid, depth) {
        root.children = [];
        root.depth = depth;
        for (let node of arr) {
            if (node.pid === pid) {
                root.children.push(help(node, node.id, depth + 1));
            }
        }
        return root;
    }
}

console.log(JSON.stringify(toTree(arr), null, 2));


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
