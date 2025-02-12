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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBuyerHistoryController = void 0;
const common_1 = require("@nestjs/common");
const event_buyer_history_service_1 = require("./event-buyer-history.service");
const create_event_buyer_history_dto_1 = require("./dto/create-event-buyer-history.dto");
const update_event_buyer_history_dto_1 = require("./dto/update-event-buyer-history.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const payout_dto_1 = require("../payment/dto/payout.dto");
const payment_service_1 = require("../payment/service/payment.service");
let EventBuyerHistoryController = class EventBuyerHistoryController {
    constructor(eventBuyerHistoryService, paymentService) {
        this.eventBuyerHistoryService = eventBuyerHistoryService;
        this.paymentService = paymentService;
    }
    create(req, createEventBuyerHistoryDto) {
        const userId = req.user.id;
        return this.eventBuyerHistoryService.create(userId, createEventBuyerHistoryDto);
    }
    findAll() {
        return this.eventBuyerHistoryService.findAll();
    }
    findOne(id) {
        return this.eventBuyerHistoryService.findOne(id);
    }
    async update(id, updateEventBuyerHistoryDto) {
        const eventHistory = await this.eventBuyerHistoryService
            .update(id, updateEventBuyerHistoryDto);
        const { isApproved, paymentId } = eventHistory;
        if (isApproved === false) {
            const paymentHistory = await this.paymentService
                .findOneById(paymentId);
            const { totalAmount, payerId } = paymentHistory;
            const payoutDto = new payout_dto_1.PayoutDto();
            payoutDto.amount = totalAmount;
            payoutDto.message = "Refund money for canceled event booking";
            payoutDto.note = "Refund money for canceled event booking";
            payoutDto.subject = "Refunding Money";
            payoutDto.toPaypalReceiverId = payerId;
            await this.paymentService.payout(payoutDto);
            await this.eventBuyerHistoryService.update(id, { isRefunded: true });
        }
        return eventHistory;
    }
    remove(id) {
        return this.eventBuyerHistoryService.remove(id);
    }
};
exports.EventBuyerHistoryController = EventBuyerHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_buyer_history_dto_1.CreateEventBuyerHistoryDto]),
    __metadata("design:returntype", void 0)
], EventBuyerHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventBuyerHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventBuyerHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_buyer_history_dto_1.UpdateEventBuyerHistoryDto]),
    __metadata("design:returntype", Promise)
], EventBuyerHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventBuyerHistoryController.prototype, "remove", null);
exports.EventBuyerHistoryController = EventBuyerHistoryController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('Event Buyer History'),
    (0, common_1.Controller)('event-buyer-history'),
    __metadata("design:paramtypes", [event_buyer_history_service_1.EventBuyerHistoryService,
        payment_service_1.PaymentService])
], EventBuyerHistoryController);
//# sourceMappingURL=event-buyer-history.controller.js.map