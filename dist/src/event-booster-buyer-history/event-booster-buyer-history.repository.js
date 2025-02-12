"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventBoosterBuyerHistoryRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBoosterBuyerHistoryRepository = void 0;
const db_1 = require("../../config/db");
const common_1 = require("@nestjs/common");
let EventBoosterBuyerHistoryRepository = EventBoosterBuyerHistoryRepository_1 = class EventBoosterBuyerHistoryRepository {
    constructor() {
        this.logger = new common_1.Logger(EventBoosterBuyerHistoryRepository_1.name);
    }
    async create(data) {
        try {
            return await db_1.default.eventBoosterBuyerHistory.create({
                data
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException("Fail to process data, please try again later.");
        }
    }
    async update(id, data) {
        try {
            return await db_1.default.eventBoosterBuyerHistory.update({
                where: { id },
                data
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException("Fail to process data, please try again later.");
        }
    }
    async findAll() {
        try {
            return await db_1.default.eventBoosterBuyerHistory.findMany({});
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException("Fail to process data, please try again later.");
        }
    }
    async findOne(id) {
        try {
            return await db_1.default.eventBoosterBuyerHistory.findUnique({
                where: { id }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException("Fail to process data, please try again later.");
        }
    }
    async delete(id) {
        try {
            return await db_1.default.eventBoosterBuyerHistory.delete({
                where: { id }
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.ConflictException("Fail to process data, please try again later.");
        }
    }
};
exports.EventBoosterBuyerHistoryRepository = EventBoosterBuyerHistoryRepository;
exports.EventBoosterBuyerHistoryRepository = EventBoosterBuyerHistoryRepository = EventBoosterBuyerHistoryRepository_1 = __decorate([
    (0, common_1.Injectable)()
], EventBoosterBuyerHistoryRepository);
//# sourceMappingURL=event-booster-buyer-history.repository.js.map