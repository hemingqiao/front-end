type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

// 测试用例
type U0 = UnionToIntersection<string | number> // never
type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }

/*
将这个方法拆成两部分来看,(U extends any ? (k: U) => void : never)是第一部分,extends (k: infer I) => void ? I : never是第二部分

先看第一部分,TS中如果泛型后跟extends且这个泛型在实际传值是联合类型,则会遍历这个联合类型,取出联合类型中的每个具体类型做实际操作,最后返回每个类型的结果的联合类型
用U=string|number举例,第一部分实际上做的的操作是(string extends any ? (k:string) => void :never) | (number extends any ? (k:number) => void :never),简化之后的结果就是((k:string)=>void)|((k:number)=>void),这是两个函数类型的联合类型
再看第二部分,利用了infer的函数参数类型推断,翻译一下就是如果想要找出一个函数,使它满足一定条件后能被((k:string)=>void)|((k:number)=>void)赋值,那么这个函数一定是(k:string&number)=>void,从而推得函数参数类型是string&number作为结果
 */