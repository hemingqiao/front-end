const arr = [
    {
        id: 0,
        children: [
            {
                id: 2,
                children: [
                    {
                        id: 7,
                        children: [],
                    },
                ],
            }
        ]
    },
    {
        id: 1,
        children: [
            {
                id: 3,
                children: [
                    {
                        id: 4,
                        children: [],
                    }
                ]
            },
            {
                id: 5,
                children: [
                    {
                        id: 6,
                        children: [],
                    },
                    {
                        id: 8,
                        children: [],
                    }
                ]
            }
        ]
    }
];

/**
 * 根据 id 在树中查找对应元素，并记录路径
 *
 * @param {any[]} arr
 * @param {number} id
 * @param {number[]} path
 * @returns {{res: *, path: number[]}|null}
 */
function findById(arr, id, path = []) {
    for (let item of arr) {
        path.push(item.id);
        if (item.id === id) {
            return {
                res: item,
                path: path.slice()
            };
        }
        let res = findById(item.children, id, path);
        if (res) {
            return res;
        }
        path.pop();
    }
    return null;
}

// console.log(findById(arr, 8));

function findById1(arr, id) {
    let res, p;
    dfs(arr, id);
    return { res, path: p };

    function dfs(list, id, path = []) {
        for (let c of list) {
            if (!c) return;
            path.push(c.id);
            if (!c.children || c.children.length === 0) {
                if (c.id === id) {
                    res = c, p = path.slice();
                    return;
                }
            }
            dfs(c.children, id, path);
            path.pop();
        }
    }
}

console.log(findById1(arr, 8));
