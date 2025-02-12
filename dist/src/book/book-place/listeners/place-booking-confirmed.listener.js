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
var PlaceBookingConfirmedListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceBookingConfirmedListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const email_service_1 = require("../../../../common/services/email/email.service");
const events_1 = require("../../../../common/constants/events");
const place_booked_event_1 = require("../events/place-booked.event");
const email_render_helpers_1 = require("../../../../common/services/email/email-render.helpers");
const node_1 = require("@sentry/node");
const shortenDate = (date) => date.toLocaleDateString('en-us', { dateStyle: 'short' });
let PlaceBookingConfirmedListener = PlaceBookingConfirmedListener_1 = class PlaceBookingConfirmedListener {
    constructor(emailSerivce) {
        this.emailSerivce = emailSerivce;
        this.logger = new common_1.Logger(PlaceBookingConfirmedListener_1.name);
    }
    async handleBuyerConfirmationEmail(booking) {
        try {
            const htmlEmailBody = await (0, email_render_helpers_1.parseEjsFile)({
                template: 'email.ejs',
                data: { name: booking.buyer.firstName }
            });
            const textEmailBody = `Your booking for ${booking.place.title} has been confirmed for dates ${shortenDate(booking.startDate)} - ${shortenDate(booking.endDate)}. Total: ${booking.total}`;
            this.emailSerivce.sendEmail(booking.buyer.email, 'Your booking has been confirmed!', {
                text: textEmailBody,
                html: htmlEmailBody
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send confirmation email');
        }
    }
    async handleSellerConfirmationEmail(booking) {
        const textEmailBody = `You have your new booking for  ${booking.place.title} on ${shortenDate(booking.startDate)} - ${shortenDate(booking.endDate)}. Total: ${booking.total}`;
        try {
            this.emailSerivce.sendEmail('adam@webrevived.com', `You have confirmed the booking for`, { text: textEmailBody });
        }
        catch (error) {
            (0, node_1.setContext)('Data', { error });
            throw new common_1.InternalServerErrorException(error, 'Failed to send confirmation email');
        }
    }
};
exports.PlaceBookingConfirmedListener = PlaceBookingConfirmedListener;
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.EVENTS.booking.placeBookingConfirmed),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_booked_event_1.PlaceBookedEvent]),
    __metadata("design:returntype", Promise)
], PlaceBookingConfirmedListener.prototype, "handleBuyerConfirmationEmail", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.EVENTS.booking.placeBookingConfirmed),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [place_booked_event_1.PlaceBookedEvent]),
    __metadata("design:returntype", Promise)
], PlaceBookingConfirmedListener.prototype, "handleSellerConfirmationEmail", null);
exports.PlaceBookingConfirmedListener = PlaceBookingConfirmedListener = PlaceBookingConfirmedListener_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], PlaceBookingConfirmedListener);
//# sourceMappingURL=place-booking-confirmed.listener.js.map