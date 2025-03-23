

type SmallerThan<A extends number, B extends number, S extends any[] = []> =
    S["length"] extends A
        ? S["length"] extends B ? false : true
        : S["length"] extends B ? false : SmallerThan<A, B, [...S, 1]>;

type GetSmaller<A extends number, S extends any[] = []> = S["length"] extends A ? S : GetSmaller<A, [...S, 1]>;

type Absolute<
    A extends number,
    B extends number,
    Small extends any[] = GetSmaller<A>,
    S extends any[] = []
> = Small["length"] extends B ? S["length"] : Absolute<A, B, [...Small, 1], [...S, 1]>;

type Subtract<
    A extends number,
    B extends number
> = SmallerThan<A, B> extends true ? `-${Absolute<A, B>}` : Absolute<B, A>;

type S0 = Subtract<0, 1>;
type S1 = Subtract<100, 1>;
type S2 = Subtract<0, 100>;
type S3 = Subtract<10, 10>;
