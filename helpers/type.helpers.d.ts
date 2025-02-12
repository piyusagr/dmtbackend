export type Exactly<T, U> = { [K in keyof U]: K extends keyof T ? T[K] : never };



export type IncludeIdType = { connect: { id: number }[] | { id: number } };
