"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVariables = void 0;
exports.validateEnv = validateEnv;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const DEFAULT_PORT = 3333;
var Enviroment;
(function (Enviroment) {
    Enviroment["development"] = "development";
    Enviroment["production"] = "production";
    Enviroment["staging"] = "staging";
})(Enviroment || (Enviroment = {}));
class EnvVariables {
    constructor() {
        this.PORT = DEFAULT_PORT;
        this.NODE_ENV = Enviroment.development;
    }
}
exports.EnvVariables = EnvVariables;
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Object)
], EnvVariables.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvVariables.prototype, "DATABASE_URL", void 0);
function validateEnv(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.default = () => ({
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10) || DEFAULT_PORT,
    databaseUrl: process.env.DEV_DATABASE_URL,
    isDevelopment: process.env.NODE_ENV === Enviroment.development,
    isProduction: process.env.NODE_ENV === Enviroment.production,
    nodeEnv: process.env.NODE_ENV,
});
//# sourceMappingURL=configuration.js.map