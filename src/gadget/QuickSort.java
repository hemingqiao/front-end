package blogandquestion.algorithms;

import java.util.Arrays;
import java.util.Random;

/**
 * @author Heming
 * created by IntelliJ IDEA
 * founded at 2020/11/21 17:24:21
 * description: 几种快速排序算法
 */
public class QuickSort {
    public void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    public void quickSort(int[] arr, int low, int high) {
        // 区间长度小于等于1时，就不需要进行递归排序了
        if (low >= high) return;
        swap(arr, low, (int) (Math.random() * (high - low + 1)) + low);
        int pivot = arr[low];
        int left = low, right = high;
        while (left < right) {
            while (left < right && arr[right] >= pivot) {
                right--;
            }
            while (left < right && arr[left] <= pivot) {
                left++;
            }
            swap(arr, left, right);
        }
        // 执行完上面的循环后，left == right，并且[low + 1, left]区间内的元素都小于等于pivot，(left, high]区间内的元素都大于pivot
        // 所以下面执行交换，将pivot元素换到left处
        // 执行完交换之后，[low, left - 1]区间内的元素都小于等于pivot，left处元素值等于pivot，(left, high]区间内的元素值大于pivot
//        arr[low] = arr[left];
//        arr[left] = pivot;
        swap(arr, low, left); // 上面注释掉的写法也是可以的，并且可以减少一次函数调用

        quickSort(arr, low, left - 1);
        quickSort(arr, left + 1, high);
    }

    public void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public int[] generateArray(int nums, int boundary) {
        int[] res = new int[nums];
        for (int i = 0; i < nums; i++) {
            int random = (int) (Math.random() * boundary);
            res[i] = random;
        }
        return res;
    }

    public boolean isSortedArray(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        QuickSort q = new QuickSort();
        int[] test = q.generateArray(1500000, 10000000);
//        int[] test = q.generateArray(100, 1000);
//        System.out.println(Arrays.toString(test));
        double now = System.currentTimeMillis();
        q.quickSort(test);
        System.out.println(System.currentTimeMillis() - now + "ms elapsed"); // 245.0ms elapsed
//        System.out.println(Arrays.toString(test));
        System.out.println(q.isSortedArray(test));
    }
}

/**
 * 这种形式的双指针快排比上面的略快一些？
 * 并没有，这种形式的虽然在退出while循环后不需要在执行交换，但是在while循环内执行了两次交换，付出的代价还是有点大的
 */
class DoublePointerQuickSort {
    public void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    public void quickSort(int[] arr, int low, int high) {
        if (low >= high) return; // 当区间长度小于等于1时，就不需要进行递归排序了
        swap(arr, low, (int) (Math.random() * (high - low + 1) + low));
        int pivot = arr[low];
        int left = low, right = high;
        while (left < right) {
            while (left < right && arr[right] >= pivot) {
                right--;
            }
//            if (left < right) {
//                swap(arr, left, right);
//            }
            swap(arr, left, right); // 执行交换时可以不用判断left < right，因为有上面while循环的存在，边界情况就是left == right
            while (left < right && arr[left] <= pivot) {
                left++;
            }
//            if (left < right) {
//                swap(arr, left, right);
//            }
            swap(arr, left, right);
        }

        quickSort(arr, low, left - 1);
        quickSort(arr, left + 1, high);
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public int[] generateArray(int nums, int boundary) {
        int[] res = new int[nums];
        for (int i = 0; i < nums; i++) {
            int random = (int) (Math.random() * boundary);
            res[i] = random;
        }
        return res;
    }

    public static void main(String[] args) {
        DoublePointerQuickSort dp = new DoublePointerQuickSort();
        int[] test = dp.generateArray(1500000, 10000000); // 266.0 ms elapsed
//        System.out.println(Arrays.toString(test));
        double now = System.currentTimeMillis();
        dp.quickSort(test);
//        System.out.println(Arrays.toString(test));
        System.out.println(System.currentTimeMillis() - now + "ms elapsed");
    }
}

/**
 * 另一种形式的快排，这种快排的时间效率较好
 * 参考：https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/partitionfen-er-zhi-zhi-you-xian-dui-lie-java-dai-/
 */
class AnotherQuickSort {
    public void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    public void quickSort(int[] arr, int low, int high) {
        // 区间长度小于等于1时，就不需要进行递归排序了
        if (low >= high) return;
        swap(arr, low, (int) (Math.random() * (high - low + 1)) + low);
        int pivot = arr[low];
        int j = low;
        for (int i = low + 1; i <= high; i++) {
            if (arr[i] < pivot) {
                j++;
                swap(arr, j, i);
            }
        }
        // 执行完上面这个循环之后，有[low + 1, j]区间内元素都小于pivot，(j, high]区间内元素大于等于pivot
        // 此时可以把pivot元素（位于索引low处）交换到索引 j 处，也就是 swap(arr, low, j);
        // 交换之后，有[low, j - 1]区间内元素都小于pivot，j处元素值等于pivot，(j, high]区间内元素大于等于pivot
        swap(arr, low, j);

        quickSort(arr, low, j - 1);
        quickSort(arr, j + 1, high);
    }

    public void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public int[] generateArray(int nums, int boundary) {
        int[] res = new int[nums];
        for (int i = 0; i < nums; i++) {
            int random = (int) (Math.random() * boundary);
            res[i] = random;
        }
        return res;
    }

    public static void main(String[] args) {
        AnotherQuickSort q = new AnotherQuickSort();
        int[] test = q.generateArray(1500000, 10000000);
        //System.out.println(Arrays.toString(test));
        double now = System.currentTimeMillis();
        q.quickSort(test);
        System.out.println(System.currentTimeMillis() - now + "ms elapsed"); // 209.0ms elapsed
        //System.out.println(Arrays.toString(test));
    }
}

class ThirdQuickSort {
    public void quickSort(int[] A) {
        quickSort(A, 0, A.length - 1);
    }

    public void quickSort(int[] A, int start, int end) {
        if (start >= end) {
            return;
        }
        int left = start;
        int right = end;
        int pivot = A[(start + end) / 2]; // 这种快排取序列中点作为基准，所以退出while循环后不需要再执行交换操作
        while (left <= right) {
            while (left <= right && A[left] < pivot) {
                left++;
            }
            while (left <= right && A[right] > pivot) {
                right--;
            }
            if (left <= right) {
                int temp = A[left];
                A[left] = A[right];
                A[right] = temp;
                left++;
                right--;
            }
        }
        quickSort(A, left, end);
        quickSort(A, start, right);
    }

    public static void main(String[] args) {
        AnotherQuickSort q = new AnotherQuickSort();
        int[] test = q.generateArray(1500000, 10000000);
        //System.out.println(Arrays.toString(test));
        ThirdQuickSort ts = new ThirdQuickSort();
        double now = System.currentTimeMillis();
        ts.quickSort(test);
        System.out.println(System.currentTimeMillis() - now + "ms elapsed"); // 236.0ms elapsed
        //System.out.println(Arrays.toString(test));
    }
}


/**
 * 三指针的快速排序，把等于切分元素的所有元素挤到了数组的中间，在有很多元素和切分元素相等的情况下，递归区间大大减少。
 * 参考：https://leetcode-cn.com/problems/sort-an-array/solution/fu-xi-ji-chu-pai-xu-suan-fa-java-by-liweiwei1419/
 */
class ThreePointerSolution {

    // 快速排序 3：三指针快速排序

    /**
     * 列表大小等于或小于该大小，将优先于 quickSort 使用插入排序
     */
    private static final int INSERTION_SORT_THRESHOLD = 7;

    private static final Random RANDOM = new Random();

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        quickSort(nums, 0, len - 1);
        return nums;
    }

    private void quickSort(int[] nums, int left, int right) {
        // 小区间使用插入排序
        if (right - left <= INSERTION_SORT_THRESHOLD) {
            insertionSort(nums, left, right);
            return;
        }

        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, randomIndex, left); // 将基准元素换到序列头部

        // 循环不变量：
        // all in [left + 1, lt] < pivot
        // all in [lt + 1, i) = pivot
        // all in [gt, right] > pivot
        int pivot = nums[left]; // 基准元素
        int lt = left; // lt指针为小于基准元素的值放置位置的索引
        int gt = right + 1; // gt指针为大于基准元素的值放置位置的索引

        int i = left + 1; // i指针用来遍历序列
        while (i < gt) {
            if (nums[i] < pivot) {
                // 当某个元素的值小于基准元素时，lt指针自增，将这个元素交换到lt指针处
                lt++;
                swap(nums, i, lt);
                i++;
            } else if (nums[i] == pivot) {
                i++;
            } else {
                // 当某个元素的值大于基准时，gt指针减1，将这个值换到gt指针处
                // 注意此处i指针没有发生变化，因为互换之后，i处元素值仍可能大于pivot，这是因为i指针尚未遍历到后面
                // i指针可以保证小于i的索引处的元素值都是小于等于pivot的，但对于大于i的索引不能保证，所以一直到互换之后i处值小于pivot后
                // i指针才会重新自增
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);
        // 注意这里，大大减少了两侧分治的区间
        quickSort(nums, left, lt - 1);
        quickSort(nums, gt, right);
    }

    /**
     * 对数组 nums 的子区间 [left, right] 使用插入排序
     *
     * @param nums  给定数组
     * @param left  左边界，能取到
     * @param right 右边界，能取到
     */
    private void insertionSort(int[] nums, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = nums[i];
            int j = i;
            while (j > left && nums[j - 1] > temp) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[j] = temp;
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

    public int[] generateArray(int size, int boundary) {
        int[] res = new int[size];
        for (int i = 0; i < size; i++) {
            int random = (int) (Math.random() * boundary);
            res[i] = random;
        }
        return res;
    }

    public static void main(String[] args) {
        ThreePointerSolution tps = new ThreePointerSolution();
        //int[] test = tps.generateArray(1000000, 100);
        int[] test = {0, 1, 1, 1, 1, 1, 1, 1, 1, 2};
        System.out.println(Arrays.toString(test));
        tps.quickSort(test, 0, test.length - 1);
        System.out.println("\n\n\n\n\n");
        System.out.println(Arrays.toString(test));
    }
}

