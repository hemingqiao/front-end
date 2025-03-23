interface SomeProps {
    a: string
    b: number
    c: (e: MouseEvent) => void
    d: (e: TouchEvent) => void
}
// 如何得到 'c' | 'd' ？

type GetKeyByValueType<T, V> = {
    [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

type ConditionalPick<T, U> = {
    [K in GetKeyByValueType<T, U>]: T[K];
};

type ConditionalPick1<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};
type TT = ConditionalPick1<SomeProps, string>

type FunctionPropNames = GetKeyByValueType<SomeProps, Function>;

type Intersection<T extends object, U extends object> =
    Pick<
        T,
        Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
    >;

type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

type Overwrite<
    T extends object,
    U extends object,
    I = Omit<T, keyof U> & Intersection<U, T>
> = {
    [K in keyof I]: I[K];
};

type Eg = Overwrite<{key1: number, other: boolean}, {key1: string}>

type DeepFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K];
}[number];

type A = ['a', ['b'], [[[[['c']]]]]];
type FA = DeepFlat<A>;
type B = ['a', 'b'];
type Test<T extends any[]> = {
    [K in keyof T]: T[K];
}[number];
type FB = Test<B>;

type A2 = 'x' | 'y' extends 'x' ? 1 : 2;
type P<T> = T extends 'x' ? 1 : 2;
type A3 = P<'x' | 'y'>

