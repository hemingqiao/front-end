/**
 * @param {string[]} nums
 * @param {number[][]} qu
 * @return {number[]}
 */
const smallestTrimmedNumbers = function(nums, qu) {
    let ans = [];
    for (let i = 0; i < qu.length; i++) {
        let k = qu[i][0], t = qu[i][1];
        let q = [];
        for (let j = 0; j < nums.length; j++)
            q.push([BigInt(nums[j].slice(-t)), j]);
        ans.push(get(q, 0, q.length - 1, k));
    }
    return ans;
};

function get(q, l, r, k) {
    if (l >= r) return q[l][1];
    let i = l - 1, j = r + 1, x = q[l + r >> 1][0];
    while (i < j) {
        while (q[++i][0] < x);
        while (q[--j][0] > x);
        if (i < j) {
            let t = q[i]; q[i] = q[j]; q[j] = t;
        }
    }
    if (j + 1 >= k) return get(q, l, j, k);
    return get(q, j + 1, r, k);
}

console.log(smallestTrimmedNumbers(["24","37","96","04"], [[2,1],[2,2]]));
