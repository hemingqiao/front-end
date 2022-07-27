const arr = [
    {id: 4, name: "部门4", pid: 3},
    {id: 5, name: "部门5", pid: 4},
    {id: 2, name: "部门2", pid: 1},
    {id: 1, name: "部门1", pid: 0},
    {id: 3, name: "部门3", pid: 1},
    {id: 6, name: "部门6", pid: 2},
];

function toTree(list) {
    // 找到根结点
    let root = list.find(item => item.pid === 0);
    return help(root, root.id);

    function help(root, pid) {
        if (!root.children) root.children = [];
        for (let node of list) {
            if (node.pid === pid) {
                root.children.push(help(node, node.id));
            }
        }
        return root;
    }
}

function toTreeRecur(list) {
    let map = new Map(), root;
    for (let node of list) {
        if (!map.has(node.pid)) map.set(node.pid, []);
        map.get(node.pid).push(node);
        if (node.pid === 0) root = node;
    }
    return help(root, root.id, 0);

    function help(root, pid, depth) {
        if (!root.children) root.children = [];
        root.depth = depth;
        for (let n of map.get(pid) || []) {
            root.children.push(help(n, n.id, depth + 1));
        }
        return root;
    }
}

// console.log(JSON.stringify(toTree(arr), null, 2));
console.log(JSON.stringify(toTreeRecur(arr), null, 2));

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
