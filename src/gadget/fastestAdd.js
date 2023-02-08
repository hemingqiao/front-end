/*
// 假设有一台本地机器，无法做加减乘除运算（包括位运算），因此无法执行 a + b、a += 1 这样的 JS 代码，然后我们提供一个服务器端的 HTTP API，
可以传两个数字类型的参数，响应结果是这两个参数的和，这个 HTTP API 的 JS SDK（在本地机器上运行）的使用方法如下：

asyncAdd(3, 5, (err, result) => {
  console.log(result); // 8
});

// SDK 的模拟实现：

function asyncAdd(a, b, cb) {
  setTimeout(() => {
    cb(null, a + b);
  }, Math.floor(Math.random()*1000))
}

// 现在要求在本地机器上实现一个 sum 函数，支持以下用法：

(async () => {
  const result1 = await sum(1, 4, 6, 9, 2, 4);
  const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
  const result3 = await sum(1, 6, 0, 5);
  console.log([result1, result2, result3]); // [26, 36, 12]
})();

// 要求 sum 能在最短的时间里返回以上结果
 */

function add(a, b) {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000, a + b);
    });
}

function sum(nums) {
    return new Promise((resolve, reject) => {
        run();

        function run() {
            if (nums.filter(i => i !== null).length > 1) {
                let a, b;
                // 能进入这里，上面的if判断确保数组中存在大于等于2个的非null数字，不需要担心findIndex返回-1
                a = nums.splice(nums.findIndex(i => i !== null), 1)[0];
                b = nums.splice(nums.findIndex(i => i !== null), 1)[0];
                nums.push(null);
                add(a, b).then(res => {
                    for (let i = 0; i < nums.length; i++) {
                        if (nums[i] === null) {
                            nums[i] = res;
                            break;
                        }
                    }
                    run();
                }, err => {
                    reject(err);
                });
                // 对 a b 执行完加法后，继续调用run
                run();
            } else if (nums.length === 1 && nums[0] !== null) {
                resolve(nums[0]);
            }
        }
    });
}

console.time("start");
// expect execute time: 3s
sum([1, 2, 3, 4, 5, 6, 7]).then(res => {
    console.log(res)
    console.timeEnd("start");
});


/*

function add(a, b) {
    return new Promise(resolve => {
        setTimeout(() => resolve(a + b), 200);
    });
}

function sum(nums) {
    return new Promise((resolve, reject) => {
        parallelAdd();

        function parallelAdd() {
            if (nums.length === 1 && nums[0] !== null) return resolve(nums[0]);
            while (nums.filter(item => item !== null).length >= 2) doAdd();
        }

        function doAdd() {
            if (nums.length === 1 && nums[0] !== null) return resolve(nums[0]);
            if (nums.filter(item => item !== null).length <= 1) return;
            let a = nums.splice(nums.findIndex(item => item !== null), 1)[0];
            let b = nums.splice(nums.findIndex(item => item !== null), 1)[0];
            nums.push(null); // 使用 null 来进行占位
            add(a, b).then(res => {
                for (let i = 0; i < nums.length; i++) {
                    if (nums[i] === null) {
                        nums[i] = res;
                        break;
                    }
                }
                parallelAdd();
            }, err => {
                reject(err);
            });
        }
    });
}

const nums = [2, 1, 4, 7];

(async () => {
    console.time("add");
    let res = await sum(nums);
    console.timeEnd("add");
    console.log(res);
})();

 */
