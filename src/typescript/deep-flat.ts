/*
定义一个  DeepFlat 工具类型，支持把数组类型拍平（扁平化）：

type DeepFlat<T extends any[]> = unknown // 你的实现代码

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
 */

// type DeepFlat<T extends any[]> = {
//     [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K]
// }[number];

type DeepFlat<T extends any[]> = T[number] extends infer P
    ? P extends any[] ? DeepFlat<P> : P
    : never;

type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>

