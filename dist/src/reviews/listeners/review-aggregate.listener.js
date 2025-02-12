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
exports.ReviewAggregateListner = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../../../common/constants/events");
const db_1 = require("../../../config/db");
const places_service_1 = require("../../places/places.service");
const review_aggregate_event_1 = require("../event/review-aggregate.event");
let ReviewAggregateListner = class ReviewAggregateListner {
    constructor(placeService) {
        this.placeService = placeService;
    }
    async handleAggregatePlaceReviews(event) {
        const reviews = await db_1.default.review.findMany({
            where: { place_id: event.placeId },
            select: {
                cleanliness: true,
                facilities: true,
                location: true,
                roomComfort: true,
                serviceQuality: true,
                valueForMoney: true,
            },
        });
        const aggregateReviews = () => {
            const ratings = [
                'cleanliness',
                'facilities',
                'location',
                'roomComfort',
                'serviceQuality',
                'valueForMoney',
            ];
            return (ratings.reduce((acc, rating) => {
                return (acc +
                    reviews.reduce((total, review) => total + review[rating], 0) /
                        reviews.length);
            }, 0) / ratings.length).toFixed(1);
        };
        const rating = +aggregateReviews();
        console.log(`handleAggregatePlaceReviews : ${rating}`);
        await this.placeService.update(event.placeId, {
            rating,
        });
    }
};
exports.ReviewAggregateListner = ReviewAggregateListner;
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.EVENTS.review.placeReviewAggregate),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_aggregate_event_1.ReviewAggregateEvent]),
    __metadata("design:returntype", Promise)
], ReviewAggregateListner.prototype, "handleAggregatePlaceReviews", null);
exports.ReviewAggregateListner = ReviewAggregateListner = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], ReviewAggregateListner);
//# sourceMappingURL=review-aggregate.listener.js.map