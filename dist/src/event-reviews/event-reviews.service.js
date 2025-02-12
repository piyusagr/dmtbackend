"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventReviewsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const db_1 = require("../../config/db");
let EventReviewsService = class EventReviewsService {
    async createOnlineEventReview(data, buyerId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: data.eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.eventType !== client_1.EnumEventType.ONLINE) {
                return Promise.reject(new common_1.BadRequestException('Invalid event listing id. Required an online event listing id'));
            }
            const onlineEvent = await db_1.default.onlineEvent.findFirst({
                where: { id: data.eventId },
            });
            if (!onlineEvent) {
                return Promise.reject(new common_1.NotFoundException('Online event not found'));
            }
            const buyersOnlineEventRequest = await db_1.default.buyersOnlineEventRequest.findFirst({
                where: { id: data.eventRequestId },
            });
            if (!buyersOnlineEventRequest) {
                return Promise.reject(new common_1.NotFoundException('Online event request not found for buyer'));
            }
            if (buyersOnlineEventRequest.status !==
                client_1.EnumExperinceEventRequestStatus.COMPLETED) {
                return Promise.reject(new common_1.BadRequestException('Cannot add review. Booking must be completed.'));
            }
            return await db_1.default.onlineEventReview.create({
                data: { ...data, buyerId },
            });
        }
        catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
    async createOnsiteEventReview(data, buyerId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: data.eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.eventType !== client_1.EnumEventType.ONSITE) {
                return Promise.reject(new common_1.BadRequestException('Invalid event listing id. Required an onsite event listing id'));
            }
            const onsiteEvent = await db_1.default.onsiteEvent.findFirst({
                where: { id: data.eventId },
            });
            if (!onsiteEvent) {
                return Promise.reject(new common_1.NotFoundException('Onsite event not found'));
            }
            const buyersOnsiteEventRequest = await db_1.default.buyersOnsiteEventRequest.findFirst({
                where: { id: data.eventRequestId },
            });
            if (!buyersOnsiteEventRequest) {
                return Promise.reject(new common_1.NotFoundException('Onsite event request not found for buyer'));
            }
            if (buyersOnsiteEventRequest.status !==
                client_1.EnumExperinceEventRequestStatus.COMPLETED) {
                return Promise.reject(new common_1.BadRequestException('Cannot add review. Booking must be completed.'));
            }
            return await db_1.default.onsiteEventReview.create({
                data: { ...data, buyerId },
            });
        }
        catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
    async getEventReviewsByEventListingId(eventListingId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.eventType === client_1.EnumEventType.ONLINE) {
                return await db_1.default.onlineEventReview.findMany({
                    where: { eventListingId },
                });
            }
            else {
                return await db_1.default.onsiteEventReview.findMany({
                    where: { eventListingId },
                });
            }
        }
        catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
    async deleteReviewByReviewId(eventListingId, reviewId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.eventType === client_1.EnumEventType.ONLINE) {
                return await db_1.default.onlineEventReview.delete({
                    where: { id: reviewId },
                });
            }
            else {
                return await db_1.default.onsiteEventReview.delete({
                    where: { id: reviewId },
                });
            }
        }
        catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
};
exports.EventReviewsService = EventReviewsService;
exports.EventReviewsService = EventReviewsService = __decorate([
    (0, common_1.Injectable)()
], EventReviewsService);
//# sourceMappingURL=event-reviews.service.js.map