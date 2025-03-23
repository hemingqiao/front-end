type Person = {
    id: string;
    name: string;
    age: number;
    from?: string;
    speak?: string;
};

// type OptionalKeys<T> = {
//     [K in keyof T]: Pick<T, K> extends Required<Pick<T, K>> ? never : K;
// }[keyof T];
//
// type Res = OptionalKeys<Person>;


type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false;

type OptionalKeys<T> = {
  [K in keyof T]: IsEqual<Pick<T, K>, Partial<Pick<T, K>>> extends true ? K : never;
}[keyof T];

type Res = OptionalKeys<Person>;

type Picked = Pick<Person, "id" | "from">
