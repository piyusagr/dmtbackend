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
exports.PlaceBuyerHistoryController = void 0;
const common_1 = require("@nestjs/common");
const place_buyer_history_service_1 = require("./place-buyer-history.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const create_place_buyer_history_dto_1 = require("./dto/create-place-buyer-history.dto");
const update_place_buyer_history_dto_1 = require("./dto/update-place-buyer-history.dto");
const payment_service_1 = require("../payment/service/payment.service");
const payout_dto_1 = require("../payment/dto/payout.dto");
let PlaceBuyerHistoryController = class PlaceBuyerHistoryController {
    constructor(placeBuyerHistoryService, paymentService) {
        this.placeBuyerHistoryService = placeBuyerHistoryService;
        this.paymentService = paymentService;
    }
    create(req, createPlaceBuyerHistoryDto) {
        const userId = req.user.id;
        return this.placeBuyerHistoryService.create(userId, createPlaceBuyerHistoryDto);
    }
    findAll() {
        return this.placeBuyerHistoryService.findAll();
    }
    findOne(id) {
        return this.placeBuyerHistoryService.findOne(id);
    }
    async update(id, updatePlaceBuyerHistoryDto) {
        const buyerHistory = await this.placeBuyerHistoryService
            .update(id, updatePlaceBuyerHistoryDto);
        const { isApproved, paymentId } = buyerHistory;
        if (isApproved === false) {
            const paymentHistory = await this.paymentService
                .findOneById(paymentId);
            const { totalAmount, payerId } = paymentHistory;
            const payoutDto = new payout_dto_1.PayoutDto();
            payoutDto.amount = totalAmount;
            payoutDto.message = "Refund money for canceled place booking";
            payoutDto.note = "Refund money for canceled place booking";
            payoutDto.subject = "Refunding Money";
            payoutDto.toPaypalReceiverId = payerId;
            await this.paymentService.payout(payoutDto);
            await this.placeBuyerHistoryService.update(id, { isRefunded: true });
        }
        return buyerHistory;
    }
    remove(id) {
        return this.placeBuyerHistoryService.remove(id);
    }
};
exports.PlaceBuyerHistoryController = PlaceBuyerHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_place_buyer_history_dto_1.CreatePlaceBuyerHistoryDto]),
    __metadata("design:returntype", void 0)
], PlaceBuyerHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaceBuyerHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaceBuyerHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_place_buyer_history_dto_1.UpdatePlaceBuyerHistoryDto]),
    __metadata("design:returntype", Promise)
], PlaceBuyerHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaceBuyerHistoryController.prototype, "remove", null);
exports.PlaceBuyerHistoryController = PlaceBuyerHistoryController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('Place Buyer History'),
    (0, common_1.Controller)('place-buyer-history'),
    __metadata("design:paramtypes", [place_buyer_history_service_1.PlaceBuyerHistoryService,
        payment_service_1.PaymentService])
], PlaceBuyerHistoryController);
//# sourceMappingURL=place-buyer-history.controller.js.map