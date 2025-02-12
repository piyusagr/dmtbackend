export declare class RelatedAction {
    connect?: number[];
    disconnect?: number[];
}
export declare const TransformAssign: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
