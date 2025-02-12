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
exports.EventBoosterBuyerHistoryService = void 0;
const common_1 = require("@nestjs/common");
const event_booster_buyer_history_repository_1 = require("./event-booster-buyer-history.repository");
let EventBoosterBuyerHistoryService = class EventBoosterBuyerHistoryService {
    constructor(eventBoosterBuyerHistoryRepository) {
        this.eventBoosterBuyerHistoryRepository = eventBoosterBuyerHistoryRepository;
    }
    async create(userId, createEventBoosterBuyerHistoryDto) {
        const { paymentId, eventId } = createEventBoosterBuyerHistoryDto;
        return await this.eventBoosterBuyerHistoryRepository.create({
            Payment: { connect: { id: paymentId } },
            Seller: { connect: { id: userId } },
            Event: { connect: { id: eventId } }
        });
    }
    async findAll() {
        return this.eventBoosterBuyerHistoryRepository.findAll();
    }
    async findOne(id) {
        const eventBuyerHistory = await this.eventBoosterBuyerHistoryRepository.findOne(id);
        if (!eventBuyerHistory) {
            throw new common_1.NotFoundException();
        }
        return eventBuyerHistory;
    }
    async update(id, updateEventBoosterBuyerHistoryDto) {
        await this.findOne(id);
        const { isApproved, isRefunded } = updateEventBoosterBuyerHistoryDto;
        return await this.eventBoosterBuyerHistoryRepository.update(id, {
            isApproved, isRefunded
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.eventBoosterBuyerHistoryRepository.delete(id);
    }
};
exports.EventBoosterBuyerHistoryService = EventBoosterBuyerHistoryService;
exports.EventBoosterBuyerHistoryService = EventBoosterBuyerHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_booster_buyer_history_repository_1.EventBoosterBuyerHistoryRepository])
], EventBoosterBuyerHistoryService);
//# sourceMappingURL=event-booster-buyer-history.service.js.map