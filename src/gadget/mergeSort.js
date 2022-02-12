const INF = 10000010;

const temp = Array(INF).fill(0);

/**
 * 归并排序
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 */
function mergeSort(nums, l = 0, r = nums.length - 1) {
    if (l >= r) return;
    let mid = l + r >> 1, i = l, j = mid + 1, k = 0;
    mergeSort(nums, l, mid), mergeSort(nums, mid + 1, r);
    while (i <= mid && j <= r) {
        if (nums[i] <= nums[j]) temp[k++] = nums[i++];
        else temp[k++] = nums[j++];
    }
    while (i <= mid) temp[k++] = nums[i++];
    while (j <= r) temp[k++] = nums[j++];
    while (k-- > 0) nums[l + k] = temp[k];
}

function generateRandomArr(size, boundary) {
    let ret = [];
    for (let i = 0; i < size; i++) ret.push(Math.random() * boundary | 0);
    return ret;
}

function isAscendingSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}

// for test
const nums = generateRandomArr(10000000, 1e9);
console.log(isAscendingSorted(nums));
console.time("merge sort");
mergeSort(nums);
console.timeEnd("merge sort");
console.log(isAscendingSorted(nums));
