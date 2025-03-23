/*
定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接。具体的使用示例如下所示：

type JoinStrArray<Arr extends string[], Separator extends string, Result extends string = ""> = // 你的实现代码

// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"]
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"
 */

// type JoinStrArray<Arr extends string[], Sep extends string, Acc extends string = ""> =
//     Arr extends [first: infer F extends string, ...rest: infer R extends string[]]
//         ? R extends []
//             ? `${Acc}${F}`
//             : JoinStrArray<R, Sep, `${Acc}${F}${Sep}`>
//         : Acc;

type JoinStrArray<Arr extends string[], Sep extends string> =
    Arr extends [first: infer F extends string, ...rest: infer R extends string[]]
        ? `${F}${R[0] extends string ? `${Sep}${JoinStrArray<R, Sep>}` : ""}`
        : "";

type Names = ["Sem", "Lolo", "Kaquko"]
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"
type N = JoinStrArray<[], "">;