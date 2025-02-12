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
var PlaceBookedListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceBookedListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../../../../common/constants/events");
const email_service_1 = require("../../../../common/services/email/email.service");
const place_booked_event_1 = require("../events/place-booked.event");
const parseDate = (date) => date.toLocaleDateString('en-us', { dateStyle: 'short' });
let PlaceBookedListener = PlaceBookedListener_1 = class PlaceBookedListener {
    constructor(emailService) {
        this.emailService = emailService;
        this.logger = new common_1.Logger(PlaceBookedListener_1.name);
    }
    async handleBuyerConfirmationEmail(event) {
        const textEmailBody = `Your booking has been sent to the seller. Seller has 5 days to confirm the booking. No money will be taken out until the seller confirms.`;
        const email = await this.emailService.sendEmail(event.buyer.email, `You have sucessfully booked your stay ${event.place.title}`, { text: textEmailBody });
        this.logger.debug(email);
    }
    async handleSellerConfirmationEmail(event) {
        const textEmailBody = `${event.buyer.firstName} has booked a trip with you for dates ${parseDate(event.startDate)} - ${parseDate(event.endDate)}`;
        const email = await this.emailService.sendEmail(event.seller.email, `${event.buyer.firstName} has booked a trip with you!`, { text: textEmailBody });
        this.logger.debug(email);
    }
};
exports.PlaceBookedListener = PlaceBookedListener;
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.EVENTS.booking.placeBooking),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_booked_event_1.PlaceBookedEvent]),
    __metadata("design:returntype", Promise)
], PlaceBookedListener.prototype, "handleBuyerConfirmationEmail", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.EVENTS.booking.placeBooking),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_booked_event_1.PlaceBookedEvent]),
    __metadata("design:returntype", Promise)
], PlaceBookedListener.prototype, "handleSellerConfirmationEmail", null);
exports.PlaceBookedListener = PlaceBookedListener = PlaceBookedListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], PlaceBookedListener);
//# sourceMappingURL=place-booked.listener.js.map