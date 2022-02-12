/** 几种常见的排序算法 **/


/**
 * 生成一个具有固定边界的随机数数组用于测试排序算法性能
 *
 * @param boundary 随机数组元素边界
 * @param num 随机数组元素个数
 * @returns {[]}
 */
function generateArr(boundary, num) {
  let result = [];
  for (let i = 0; i < num; i++) {
    let random = Math.floor(Math.random() * boundary);
    result.push(random);
  }

  return result;
}


// 1 selection sort
// 选择排序不是稳定的排序算法，如对序列 2 2 1 进行排序
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
}


// 2 bubble sort
// 冒泡排序是稳定的排序算法
function bubbleSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}


// 3 flag bubble sort
// 如果在某一趟排序中没有发生互换，说明序列已经有序
function flagBubbleSort(arr) {
  let flag = true;
  for (let i = 0, len = arr.length; i < len - 1 && flag; i++) {
    flag = false;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = true;
      }
    }
  }
}


// 4 insertion sort
// 插入排序是稳定的排序算法
function insertionSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let k, temporary = arr[i];
    for (k = i - 1; k >= 0 && arr[k] > temporary; k--) {
      arr[k + 1] = arr[k];
    }
    arr[k + 1] = temporary;
  }
}

// total: 150000, time elapsed: 7299ms


// 5 merge sort
// 归并排序是稳定的排序算法，以空间换时间

// 归并两个子序列
function merge(arr, left, mid, right) {
  // 临时数组，用于暂时存储数据
  let temp = [];
  // p1，p2分别是两个待归并序列的头指针
  let p1 = left, p2 = mid + 1, k = 0;

  while (p1 <= mid && p2 <= right) {
    if (arr[p1] <= arr[p2]) {
      temp[k++] = arr[p1++];
    } else {
      temp[k++] = arr[p2++];
    }
  }

  while (p1 <= mid) {
    temp[k++] = arr[p1++];
  }
  while (p2 <= right) {
    temp[k++] = arr[p2++];
  }

  for (let i = left; i <= right; i++) {
    arr[i] = temp[i - left];
  }
}


function mergeSortAuxiliary(arr, start, end) {
  if (start >= end) {
    return;
  }

  let mid = Math.floor((start + end) / 2);
  mergeSortAuxiliary(arr, start, mid);
  mergeSortAuxiliary(arr, mid + 1, end);
  merge(arr, start, mid, end);
}

/**
 * 没有使用es6的参数默认值，而是使用了辅助函数
 *
 * @param arr
 */
function mergeSort(arr) {
  mergeSortAuxiliary(arr, 0, arr.length - 1);
}

// total: 150000, time elapsed: 63ms
// total: 1500000, time elapsed: 577ms
// total: 15000000, time elapsed: 6558ms


/*
快速排序的基本原理是选取序列中的一个元素作为基准，经过一趟排序，将整个序列分为两个部分。其中一部分的值都小于基准，另一部分的值都大于基准。
然后对这两部分继续进行排序，从而使整个序列有序。
快速排序的重点在于基准元素的选取，基准元素选取的不好可能会严重影响快排的速度。一般可以选取序列的第一个元素作为基准或者随机选取序列中的一个
元素作为基准。

快速排序不是稳定的排序算法，如对序列 2 2 1 进行排序（选取第一个元素作为基准）。

下面分别是选取第一个元素和随机选取一个元素作为基准的快排实现。
 */


// 6 quick sort
// 选取第一个元素作为基准
function quickSortAuxiliary(arr, low, high) {
  if (low >= high) {
    return;
  }

  let left = low, right = high;
  let pivot = arr[low];

  while (left < right) {
    // 从右边开始找到第一个小于基准的元素
    while (left < right && arr[right] >= pivot) {
      right--;
    }

    // 从左边开始找到第一个大于基准的元素
    while (left < right && arr[left] <= pivot) {
      left++;
    }

    if (left < right) {
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    }
  }

  arr[low] = arr[left];
  arr[left] = pivot;

  quickSortAuxiliary(arr, low, left - 1);
  quickSortAuxiliary(arr, left + 1, high);
}


function quickSort(arr) {
  quickSortAuxiliary(arr, 0, arr.length - 1);
}

// total: 150000, time elapsed: 34ms
// total: 1500000, time elapsed: 261ms
// total: 15000000, time elapsed: 2773ms


/*
// 7 random quick sort
// 随机选取序列中的一个元素作为基准
function randomQuickSortAuxiliary(arr, low, high) {
  if (low >= high) {
    return;
  }

  let pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
  let pivot = arr[pivotIndex];

  // 将基准元素与序列中最后一个元素互换
  swap(arr, pivotIndex, high);

  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      swap(arr, ++i, j);
    }
  }

  // 将基准元素从序列中的最后放回序列中的合适位置
  swap(arr, ++i, high);

  randomQuickSortAuxiliary(arr, low, i - 1);
  randomQuickSortAuxiliary(arr, i + 1, high);
}


function randomQuickSort(arr) {
  randomQuickSortAuxiliary(arr, 0, arr.length - 1);
}
*/

// new version
function quickSort1(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  swap(arr, low, Math.random() * (high - low + 1) + low | 0);
  let pivot = arr[low];

  let i = low;
  for (let j = low + 1; j <= high; j++) {
    if (arr[j] <= pivot) {
      swap(arr, ++i, j);
    }
  }
  swap(arr, low, i);

  quickSort1(arr, low, i - 1);
  quickSort1(arr, i + 1, high);
}

// total: 150000, time elapsed: 35ms
// total: 1500000, time elapsed: 257ms
// total: 15000000, time elapsed: 2634ms


/**
 * 交换指定数组中给定的两个元素的位置
 *
 * @param arr
 * @param i
 * @param j
 */
function swap(arr, i, j) {
  if (i !== j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}


// let a = generateArr(100, 15);
// let a = generateArr(1000000, 150000);
// let a = generateArr(10000000, 1500000);
let a = generateArr(100000000, 15000000);
console.log(`origin: `);
console.log(a);
console.time("time elapsed: ");
quickSort1(a);
console.timeEnd("time elapsed: ");
console.log(`sorted: `);
console.log(a);


// 8 quick sort
// 随机选取序列中的一个元素作为基准，与方法7的不同之处在于将基准元素换到序列的头部再进行排序
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return;
  let pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
  let pivot = arr[pivotIndex];

  swap(arr, low, pivotIndex); // 将基准元素交换到序列头部
  let left = low, right = high;
  while (left < right) {
    while (left < right && arr[right] >= pivot) {
      right--;
    }

    while (left < right && arr[left] <= pivot) {
      left++;
    }
    swap(arr, left, right); // 在这里其实无需判断left是否小于right，因为边界情况是left == right，此时将会退出while循环
  }
  // 将基准元素换回到序列中的合适位置
  arr[low] = arr[left];
  arr[left] = pivot;

  quickSort(arr, low, left - 1);
  quickSort(arr, left + 1, high);
}


// 9 counting sort
// 计数排序适合于对某个范围内的数据排序，且这个范围不能太大，通过牺牲空间换取时间效率
// 关于计数排序，参见：https://www.cnblogs.com/kyoner/p/10604781.html
function countingSort(arr) {
  let frequency = [];
  let res = [];
  for (let e of arr) {
    if (!frequency[e]) {
      frequency[e] = 1;
    } else {
      frequency[e]++;
    }
  }

  for (let i = 0; i < frequency.length; i++) {
    if (frequency[i]) {
      for (let j = 0; j < frequency[i]; j++) {
        res.push(i);
      }
    }
  }

  return res;
}
