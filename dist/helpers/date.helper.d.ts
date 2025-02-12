export declare const getDateDifference: (startDate: Date, endDate: Date) => number;
export declare const dateDifferenceFromNow: (date: Date) => any;
export declare const isValidDate: (date: Date) => boolean;
interface DateDifferenceLessThanInput {
    hours?: number;
    seconds?: number;
    days?: number;
    minutes?: number;
}
export declare const timeHasElapsed: (date: Date, input: DateDifferenceLessThanInput) => boolean;
export declare const shortenDate: (date: Date) => string;
export {};
