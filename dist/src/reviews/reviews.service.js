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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../../common/constants/events");
const database_error_1 = require("../../common/errors/database.error");
const db_1 = require("../../config/db");
const places_service_1 = require("../places/places.service");
const review_aggregate_event_1 = require("./event/review-aggregate.event");
let ReviewsService = class ReviewsService {
    constructor(placeService, eventEmitter) {
        this.placeService = placeService;
        this.eventEmitter = eventEmitter;
    }
    async create(userId, createReviewDto, placeId) {
        try {
            const review = await db_1.default.review.create({
                data: { user_id: userId, place_id: placeId, ...createReviewDto },
                include: {
                    place: {
                        select: {
                            rating: true,
                        },
                    },
                },
            });
            if (placeId)
                this.eventEmitter.emit(events_1.EVENTS.review.placeReviewAggregate, new review_aggregate_event_1.ReviewAggregateEvent({ placeId }));
            return review;
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
    async findAll(filters) {
        try {
            const reviews = await db_1.default.review.findMany({
                where: filters,
            });
            return reviews;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async findOne(reviewId) {
        try {
            const reviews = await db_1.default.review.findUniqueOrThrow({
                where: { id: reviewId },
            });
            return reviews;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async update(reviewId, updateReviewDto) {
        try {
            const review = await db_1.default.review.update({
                where: { id: reviewId },
                data: updateReviewDto,
            });
            return review;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async removeFromListing(reviewId, listingId) {
        try {
            const reviews = await db_1.default.review.delete({
                where: { id: reviewId },
            });
            if (listingId?.placeId)
                this.eventEmitter.emit(events_1.EVENTS.review.placeReviewAggregate, new review_aggregate_event_1.ReviewAggregateEvent({ placeId: listingId.placeId }));
            return reviews;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [places_service_1.PlacesService,
        event_emitter_1.EventEmitter2])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map