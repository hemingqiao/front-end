type TypeJoin<A extends any[]> = A extends [infer R, ...infer L] ? R & TypeJoin<L> : A;
type Class<A extends any[] = any[], I = any> = new (...args: A) => I;
type ClassInstance<T> = T extends Class<any[], infer R> ? R : never;
type MixinType<O extends Class, T> = ClassInstance<O> & T;
type MixinTypeClass<O extends Class, T> = Class<ConstructorParameters<O>, MixinType<O, T>>

type ClassMix<Cs extends Class<void[]>[], Result extends any[] = []> = Cs extends [infer R, ...infer L] ?
    L extends Class<void[]>[]
        ? ClassMix<L, [...Result, ClassInstance<R>]>
        : [...Result, ClassInstance<R>]
    : Result;

function extendsMultiple<Cs extends Class<void[]>[]>(...args: Cs): Class<void[], TypeJoin<ClassMix<Cs>>> {
    class mixed {
    }

    return mixed as Class<void[], TypeJoin<ClassMix<Cs>>>;
}