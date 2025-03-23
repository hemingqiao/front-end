type Tuple = [string, number, boolean, Function];
type Target = string | boolean;

type Filter<T extends any[], U> = T[number] extends infer P
    ? P extends U ? P : never
    : never;

type Filter1<T extends any[], U> = {
    [K in keyof T]: T[K] extends U ? T[K] : never;
}[number];

type TR = Filter<Tuple, Target>;

type GetByValueType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type Test = {
    a: string;
    b: boolean;
    c: number;
    d: Function;
};

type T0 = GetByValueType<Test, string>;

type DeepFlat<T extends any[]> = T extends [infer F, ...infer L]
    ? F extends any[] ? [...DeepFlat<F>, ...DeepFlat<L>] : [F, ...DeepFlat<L>]
    : [];
type Permutation<T, K = T> =
    [T] extends [never]
        ? []
        : T extends T ? [T, ...Permutation<Exclude<K, T>>] : never;
type P = Permutation<1|2|3>;
