"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const db_1 = require("../../config/db");
const common_1 = require("@nestjs/common");
const payment_error_message_constant_1 = require("./constant/payment-error-message.constant");
let PaymentRepository = PaymentRepository_1 = class PaymentRepository {
    constructor() {
        this.logger = new common_1.Logger(PaymentRepository_1.name);
    }
    async getPaymentSetting() {
        try {
            return await db_1.default.paymentSetting.findFirst({
                where: { id: 1 }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException(payment_error_message_constant_1.errorMessage.dbRelatedError);
        }
    }
    async createPayment(paymentRecord) {
        try {
            return await db_1.default.payment.create({
                data: {
                    ...paymentRecord
                }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException(payment_error_message_constant_1.errorMessage.dbRelatedError);
        }
    }
    async updatePayment(refId, paymentRecord) {
        try {
            return await db_1.default.payment.update({
                where: { refId },
                data: {
                    ...paymentRecord
                }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException(payment_error_message_constant_1.errorMessage.dbRelatedError);
        }
    }
    async findOneById(id) {
        try {
            return await db_1.default.payment.findUnique({
                where: { id },
                include: {
                    User: true
                }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException(payment_error_message_constant_1.errorMessage.dbRelatedError);
        }
    }
    async findOneByRefId(refId) {
        try {
            return await db_1.default.payment.findUnique({
                where: { refId }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException(payment_error_message_constant_1.errorMessage.dbRelatedError);
        }
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = PaymentRepository_1 = __decorate([
    (0, common_1.Injectable)()
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map