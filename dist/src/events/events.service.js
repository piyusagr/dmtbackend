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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const db_1 = require("../../config/db");
const image_service_1 = require("../../common/services/images/image.service");
const transformUrl = (images) => {
    const { mimetype, originalName, url, uuid, filePath } = images;
    return {
        url: url,
        mimetype: mimetype,
        original_name: originalName,
        uid: uuid,
        file_key: filePath,
    };
};
let EventsService = class EventsService {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async createEvent(data, userId, user, files) {
        try {
            let event = {};
            if (data.eventType === client_1.EnumEventType.ONLINE) {
                if (!data.onlineEvent) {
                    return Promise.reject(new common_1.BadRequestException('Online event details are missing'));
                }
                const onlineEventData = data.onlineEvent;
                delete data.onlineEvent;
                const eventListingData = { ...data, sellerId: userId };
                if (files && files?.length > 0) {
                    const uploadedFiles = await this.imageService.uploadImages(files);
                    const fileTransaction = await db_1.default.$transaction(uploadedFiles.map((file) => db_1.default.asset.create({ data: transformUrl(file) })));
                    eventListingData['files'] = {
                        connect: fileTransaction.map((file) => ({ id: file.id })),
                    };
                }
                const createdEventListing = await db_1.default.eventListing.create({
                    data: eventListingData,
                    include: { files: true },
                });
                onlineEventData.sellerId = userId;
                onlineEventData.eventListingId = createdEventListing.id;
                event = { ...createdEventListing };
                event.onlineEvent = await db_1.default.onlineEvent.create({
                    data: onlineEventData,
                });
            }
            else if (data.eventType === client_1.EnumEventType.ONSITE) {
                if (!data.onsiteEvent) {
                    return Promise.reject(new common_1.BadRequestException('Onsite event details are missing'));
                }
                const onsiteEventData = data.onsiteEvent;
                delete data.onsiteEvent;
                const eventListingData = { ...data, sellerId: userId };
                if (files && files?.length > 0) {
                    const uploadedFiles = await this.imageService.uploadImages(files);
                    const fileTransaction = await db_1.default.$transaction(uploadedFiles.map((file) => db_1.default.asset.create({ data: transformUrl(file) })));
                    eventListingData['files'] = {
                        connect: fileTransaction.map((file) => ({ id: file.id })),
                    };
                }
                const createdEventListing = await db_1.default.eventListing.create({
                    data: eventListingData,
                    include: { files: true },
                });
                onsiteEventData.sellerId = userId;
                onsiteEventData.eventListingId = createdEventListing.id;
                event = { ...createdEventListing };
                event.onsiteEvent = await db_1.default.onsiteEvent.create({
                    data: onsiteEventData,
                });
            }
            else {
                return Promise.reject(new common_1.BadRequestException('Invalid event type'));
            }
            return event;
        }
        catch (e) {
            throw e;
        }
    }
    async getEvents() {
        return db_1.default.eventListing.findMany({
            where: { isActive: true, isRetired: false },
            include: { OnlineEvent: true, OnsiteEvent: true, files: true },
        });
    }
    async getHostedEventsBySellerId(sellerId) {
        return db_1.default.eventListing.findMany({
            where: {
                sellerId,
                isRetired: false,
            },
            include: {
                OnlineEvent: true,
                OnsiteEvent: true,
                files: true,
            },
        });
    }
    async getEvent(eventListingId) {
        const event = await db_1.default.eventListing.findFirst({
            where: {
                id: eventListingId,
            },
            include: {
                OnlineEvent: true,
                OnsiteEvent: true,
                files: true,
                EventBoostedCategory: true,
            },
        });
        if (!event) {
            return Promise.reject(new common_1.NotFoundException('Event not found!'));
        }
        if (event.isRetired) {
            return Promise.reject(new common_1.NotFoundException('Event has been deleted and not found!'));
        }
        return event;
    }
    async deleteEvent(eventListingId, userId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.isRetired) {
                return Promise.reject(new common_1.BadRequestException('The event has been deleted already.'));
            }
            if (eventListing.eventType === client_1.EnumEventType.ONLINE) {
                const onlineEvent = await db_1.default.onlineEvent.findFirst({
                    where: { eventListingId: eventListingId },
                });
                if (!onlineEvent) {
                    return Promise.reject(new common_1.NotFoundException('Online event not found'));
                }
                await db_1.default.onlineEvent.update({
                    where: {
                        id: onlineEvent.id,
                    },
                    data: {
                        isRetired: true,
                    },
                });
            }
            else {
                const onsiteEvent = await db_1.default.onsiteEvent.findFirst({
                    where: { eventListingId: eventListingId },
                });
                if (!onsiteEvent) {
                    return Promise.reject(new common_1.NotFoundException('Onsite event not found'));
                }
                await db_1.default.onsiteEvent.update({
                    where: {
                        id: onsiteEvent.id,
                    },
                    data: {
                        isRetired: true,
                    },
                });
            }
            await db_1.default.eventListing.update({
                where: {
                    id: eventListingId,
                },
                data: {
                    isRetired: true,
                },
            });
        }
        catch (e) {
            throw e;
        }
    }
    async createEventRequest(data, userId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: data.eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.isRetired) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found. The event has been deleted.'));
            }
            if (eventListing.eventType === client_1.EnumEventType.ONLINE) {
                const onlineEvent = await db_1.default.onlineEvent.findFirst({
                    where: { eventListingId: data.eventListingId },
                });
                if (!onlineEvent) {
                    return Promise.reject(new common_1.NotFoundException('Online event not found'));
                }
                const requestData = {
                    ...data,
                    buyerId: userId,
                    eventId: onlineEvent.id,
                };
                return db_1.default.buyersOnlineEventRequest.create({ data: requestData });
            }
            else {
                const onsiteEvent = await db_1.default.onsiteEvent.findFirst({
                    where: { eventListingId: data.eventListingId },
                });
                if (!onsiteEvent) {
                    return Promise.reject(new common_1.NotFoundException('Onsite event not found'));
                }
                const requestData = {
                    ...data,
                    buyerId: userId,
                    eventId: onsiteEvent.id,
                };
                return db_1.default.buyersOnsiteEventRequest.create({ data: requestData });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getEventRequestsByEventId(eventListingId, userId) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.eventType === client_1.EnumEventType.ONLINE) {
                return await db_1.default.buyersOnlineEventRequest.findMany({
                    where: { eventListingId: eventListingId },
                });
            }
            else {
                return await db_1.default.buyersOnsiteEventRequest.findMany({
                    where: { eventListingId: eventListingId },
                });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async updateEventRequestStatus(data) {
        try {
            const eventListing = await db_1.default.eventListing.findFirst({
                where: { id: data.eventListingId },
            });
            if (!eventListing) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found'));
            }
            if (eventListing.isRetired) {
                return Promise.reject(new common_1.NotFoundException('Event listing not found. The event has been deleted.'));
            }
            if (eventListing.eventType === client_1.EnumEventType.ONLINE) {
                return await db_1.default.buyersOnlineEventRequest.update({
                    where: { id: data.eventRequestId },
                    data: { status: data.status },
                });
            }
            else {
                return await db_1.default.buyersOnsiteEventRequest.update({
                    where: { id: data.eventRequestId },
                    data: { status: data.status },
                });
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getReservationsForBuyer(buyerId) {
        const onlineEventRequests = await db_1.default.buyersOnlineEventRequest.findMany({
            where: {
                buyerId,
            },
            include: {
                Event: true,
                EventListing: true,
            },
        });
        const onsiteEventRequests = await db_1.default.buyersOnsiteEventRequest.findMany({
            where: {
                buyerId,
            },
            include: {
                Event: true,
                EventListing: true,
            },
        });
        return {
            online: onlineEventRequests,
            onsite: onsiteEventRequests,
        };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], EventsService);
//# sourceMappingURL=events.service.js.map