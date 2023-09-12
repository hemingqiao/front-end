/*
给定一个整数数组和一个目标值 target，求出所有的子序列，满足子序列之和为 target
 */

const nums = [1, 1, 3, 6, 4, 2, 7], target = 7;

{
    // 当数组比较小的时候，可以爆搜所有的子序列，并判断和是否为 target
    // 一个数组的子序列个数为 2^n，时间复杂度是指数级别的
    const solve = (nums, target) => {
        const ans = [];
        const w = nums.slice().sort((a, b) => a - b);
        const dfs = (u, sum, path) => {
            if (sum == target) ans.push(path.slice());

            for (let i = u; i < w.length; i++) {
                path.push(w[i]);
                dfs(i + 1, sum + w[i], path);
                path.pop();
                // while (i + 1 < w.length && w[i] == w[i + 1]) i++;
            }
        };
        dfs(0, 0, []);
        return ans;
    }
    console.log(solve(nums, target));
}

{
    // 当数组比较大的时候，可以使用 DP 来加速
    // 设数组大小为 n，则找出方案总数的时间复杂度为 O(n * target)
    // 0-1 背包问题输出所有方案
    const solve = (nums, target) => {
        const n = nums.length;
        const f = Array.from(Array(n + 1), _ => Array(target + 1).fill(0));
        // g[i][j] 为 0 表示当前方案可以不选当前数，为 1 表示当前方案选择了当前数，为 -1 则表示当前数不能构成合法方案
        const g = Array.from(Array(n + 1), _ => Array(target + 1).fill(-1));

        f[0][0] = 1;
        for (let i = 1; i <= n; i++)
            for (let j = 0; j <= target; j++) {
                f[i][j] = f[i - 1][j];
                g[i][j] = 0;
                if (j >= nums[i - 1]) {
                    f[i][j] += f[i - 1][j - nums[i - 1]];
                    g[i][j] = 1;
                }
            }

        const print = (i, s, path = []) => {
            if (s <= 0) {
                ans.push(path.slice());
                return;
            }
            if (g[i][s] == 0) print(i - 1, s, path);
            else if (g[i][s] == 1) {
                print(i - 1, s, path);
                path.push(nums[i - 1]);
                print(i - 1, s - nums[i - 1], path);
                path.pop();
            }
        };

        const ans = [];
        print(n, target, []);
        // return ans;
        return f[n][target];
    }

    console.log(solve(nums, target));
}

