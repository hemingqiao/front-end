const arr = [
    {id: 4, name: "部门4", pid: 3},
    {id: 5, name: "部门5", pid: 4},
    {id: 2, name: "部门2", pid: 1},
    {id: 1, name: "部门1", pid: 0},
    {id: 3, name: "部门3", pid: 1},
    {id: 6, name: "部门6", pid: 2},
];

// 类似于重建多叉树
function toTree(list) {
    // 找到根结点
    let root = list.find(item => item.pid === 0);
    const build = (root, depth) => {
        const res = { ...root, depth, children: [] };
        // 这一步可以用哈希加速
        for (let node of list)
            if (node.pid === root.id)
                res.children.push(build(node, depth + 1));
        return res;
    };
    return build(root, 1);
}

function toTreeRecur(list) {
    let map = new Map(), root = null;
    for (let item of arr) {
        if (item.pid === 0) root = item;
        if (!map.has(item.pid)) map.set(item.pid, []);
        map.get(item.pid).push(item);
    }

    const build = (root, depth) => {
        const res = { ...root, depth, children: [] };
        for (let x of map.get(root.id) || [])
            res.children.push(build(x, depth + 1));
        return res;
    };
    return build(root, 1);
}

// console.log(JSON.stringify(toTree(arr), null, 2));
console.log(JSON.stringify(toTreeRecur(arr), null, 2));

// 非递归方法
// O(n)
function toTree1(list) {
    let map = new Map(), root;
    for (let node of list) {
        node.children = [];
        map.set(node.id, node);
    }
    for (let node of list) {
        if (node.pid === 0) root = node;
        else map.get(node.pid).children.push(node);
    }
    return root;
}

// console.log(JSON.stringify(toTree1(arr), null, 2));

// O(n)
function toTree2(list) {
    let map = new Map(), root;
    for (let node of list) {
        const { id, pid } = node;
        if (!map.has(id)) {
            map.set(id, { children: [] });
        }
        map.set(id, { ...map.get(id), ...node });
        if (pid === 0) root = map.get(id);
        else {
            if (!map.has(pid)) map.set(pid, { children: [] });
            map.get(pid).children.push(map.get(id));
        }
    }
    return root;
}

// console.log(JSON.stringify(toTree2(arr), null, 2));
