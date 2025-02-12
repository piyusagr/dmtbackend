interface ParseEjsInput<T = {
    [key: string]: any;
}> {
    template: string;
    data?: T;
}
export declare const parseEjsFile: <T>(input: ParseEjsInput<T>) => Promise<string>;
export {};
