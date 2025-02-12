import { UserSession } from '../../types/user';
export declare const userSession: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
declare module 'express-session' {
    interface SessionData {
        user: UserSession;
    }
}
