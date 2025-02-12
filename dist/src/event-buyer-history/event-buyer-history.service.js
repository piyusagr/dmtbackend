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
exports.EventBuyerHistoryService = void 0;
const common_1 = require("@nestjs/common");
const event_buyer_history_repository_1 = require("./event-buyer-history.repository");
let EventBuyerHistoryService = class EventBuyerHistoryService {
    constructor(buyerHistoryRepository) {
        this.buyerHistoryRepository = buyerHistoryRepository;
    }
    async create(userId, createEventBuyerHistoryDto) {
        const { paymentId, eventId } = createEventBuyerHistoryDto;
        return await this.buyerHistoryRepository.create({
            Payment: { connect: { id: paymentId } },
            Buyer: { connect: { id: userId } },
            Event: { connect: { id: eventId } }
        });
    }
    async findAll() {
        return this.buyerHistoryRepository.findAll();
    }
    async findOne(id) {
        const eventBuyerHistory = await this.buyerHistoryRepository.findOne(id);
        if (!eventBuyerHistory) {
            throw new common_1.NotFoundException();
        }
        return eventBuyerHistory;
    }
    async update(id, updateEventBuyerHistoryDto) {
        await this.findOne(id);
        const { isApproved, isRefunded } = updateEventBuyerHistoryDto;
        return await this.buyerHistoryRepository.update(id, {
            isApproved, isRefunded
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.buyerHistoryRepository.delete(id);
    }
};
exports.EventBuyerHistoryService = EventBuyerHistoryService;
exports.EventBuyerHistoryService = EventBuyerHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_buyer_history_repository_1.EventBuyerHistoryRepository])
], EventBuyerHistoryService);
//# sourceMappingURL=event-buyer-history.service.js.map