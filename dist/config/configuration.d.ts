declare enum Enviroment {
    development = "development",
    production = "production",
    staging = "staging"
}
export declare class EnvVariables {
    PORT: number;
    NODE_ENV: Enviroment;
    DATABASE_URL: string;
    isDevelopment: boolean;
    isProduction: boolean;
}
export declare function validateEnv(config: Record<string, unknown>): EnvVariables;
declare const _default: () => {
    port: number;
    databaseUrl: string;
    isDevelopment: boolean;
    isProduction: boolean;
    nodeEnv: string;
};
export default _default;
