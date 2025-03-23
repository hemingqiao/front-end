// @see https://zhuanlan.zhihu.com/p/677448091

type Separator = "-" | "/" | ".";

type FormatData<P extends string> =
    P extends `${infer D}${Separator}${infer M}${Separator}${infer Y}`
        ? P extends `${D}${infer Sep}${M}${infer _}${Y}`
            ? [D, M, Y, Sep]
            : never
        : never;

type Split = FormatData<"DD-MM-YY">;
