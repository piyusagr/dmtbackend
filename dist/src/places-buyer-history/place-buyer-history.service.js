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
exports.PlaceBuyerHistoryService = void 0;
const common_1 = require("@nestjs/common");
const place_buyer_history_repository_1 = require("./place-buyer-history.repository");
let PlaceBuyerHistoryService = class PlaceBuyerHistoryService {
    constructor(placeBuyerHistoryRepository) {
        this.placeBuyerHistoryRepository = placeBuyerHistoryRepository;
    }
    async create(userId, createPlaceBuyerHistoryDto) {
        const { paymentId, placeId, longOfStay } = createPlaceBuyerHistoryDto;
        return await this.placeBuyerHistoryRepository.create({
            longOfStay,
            Payment: { connect: { id: paymentId } },
            Buyer: { connect: { id: userId } },
            Place: { connect: { id: placeId } }
        });
    }
    async findAll() {
        return this.placeBuyerHistoryRepository.findAll();
    }
    async findOne(id) {
        const buyerHistory = await this.placeBuyerHistoryRepository.findOne(id);
        if (!buyerHistory) {
            throw new common_1.NotFoundException();
        }
        return buyerHistory;
    }
    async update(id, updatePlaceBuyerHistoryDto) {
        await this.findOne(id);
        const { isApproved, isRefunded } = updatePlaceBuyerHistoryDto;
        return await this.placeBuyerHistoryRepository.update(id, {
            isApproved, isRefunded
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.placeBuyerHistoryRepository.delete(id);
    }
};
exports.PlaceBuyerHistoryService = PlaceBuyerHistoryService;
exports.PlaceBuyerHistoryService = PlaceBuyerHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [place_buyer_history_repository_1.PlaceBuyerHistoryRepository])
], PlaceBuyerHistoryService);
//# sourceMappingURL=place-buyer-history.service.js.map