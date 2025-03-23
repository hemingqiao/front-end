/*

实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理。具体的使用示例如下所示：

type Trim<V extends string> = // 你的实现代码

// 测试用例
Trim<' fuck-world '>
//=> 'fuck-world'

 */

type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;

type Trim<V extends string> = TrimLeft<TrimRight<V>>;

type TR = Trim<' fuck-world '>;
