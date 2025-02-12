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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_service_1 = require("./service/payment.service");
const events_service_1 = require("../events/events.service");
const payment_error_message_constant_1 = require("./constant/payment-error-message.constant");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const create_event_payment_dto_1 = require("./dto/event/create-event-payment.dto");
const create_place_payment_dto_1 = require("./dto/place/create-place-payment.dto");
const places_service_1 = require("../places/places.service");
const payout_dto_1 = require("./dto/payout.dto");
const payment_class_1 = require("./service/payment.class");
const event_buyer_history_service_1 = require("../event-buyer-history/event-buyer-history.service");
const event_booster_buyer_history_service_1 = require("../event-booster-buyer-history/event-booster-buyer-history.service");
const place_buyer_history_service_1 = require("../places-buyer-history/place-buyer-history.service");
const create_event_buyer_history_dto_1 = require("../event-buyer-history/dto/create-event-buyer-history.dto");
const create_event_booster_buyer_history_dto_1 = require("../event-booster-buyer-history/dto/create-event-booster-buyer-history.dto");
const create_place_buyer_history_dto_1 = require("../places-buyer-history/dto/create-place-buyer-history.dto");
let PaymentController = class PaymentController {
    constructor(paymentService, eventService, eventBuyerHistoryService, eventBoosterBuyerHistoryService, placesService, placeBuyerHistoryService) {
        this.paymentService = paymentService;
        this.eventService = eventService;
        this.eventBuyerHistoryService = eventBuyerHistoryService;
        this.eventBoosterBuyerHistoryService = eventBoosterBuyerHistoryService;
        this.placesService = placesService;
        this.placeBuyerHistoryService = placeBuyerHistoryService;
    }
    findOne(id) {
        return this.paymentService.findOneById(id);
    }
    async payout(payoutDto) {
        return await this.paymentService.payout(payoutDto);
    }
    async createOrderForEventBuyer(req, createEventPaymentDto) {
        const { eventId } = createEventPaymentDto;
        const event = await this.eventService.getEvent(eventId);
        if (!event) {
            throw new common_1.NotFoundException(payment_error_message_constant_1.errorMessage.eventNotFound);
        }
        const paymentSetting = await this.paymentService.getPaymentSetting();
        const { eventType, price } = event;
        const { platformCurrency } = paymentSetting;
        let totalAmount;
        let paymentContext;
        let haveNextPayment;
        let nextPaymentAmount;
        if (eventType == client_1.EnumEventType.ONLINE) {
            totalAmount = price;
            paymentContext = client_1.PaymentContext.CUSTOMER_BUY_EVENT_ONLINE;
            haveNextPayment = false;
            nextPaymentAmount = 0;
        }
        else if (eventType == client_1.EnumEventType.ONSITE) {
            const { platformCharge } = paymentSetting;
            totalAmount = (price * platformCharge) / 100;
            paymentContext = client_1.PaymentContext.CUSTOMER_BUY_EVENT_ONSITE;
            haveNextPayment = true;
            nextPaymentAmount = price - totalAmount;
        }
        const payment = new payment_class_1.Payment({
            totalAmount,
            paymentCurrency: platformCurrency,
        });
        const createPaymentDto = payment.getCreatePaymentDto();
        const createdPayment = await this.paymentService.createPayment(createPaymentDto);
        const savePaymentDto = {
            userId: req.user.id,
            paymentContext,
            paymentMetadata: {
                totalAmount,
                haveNextPayment,
                nextPaymentAmount,
            },
            createdPayment,
        };
        const paymentRecord = await this.paymentService.savePaymentRecord(savePaymentDto);
        const createEventBuyerHistoryDto = new create_event_buyer_history_dto_1.CreateEventBuyerHistoryDto();
        createEventBuyerHistoryDto.eventId = eventId;
        createEventBuyerHistoryDto.paymentId = paymentRecord.id;
        await this.eventBuyerHistoryService.create(req.user.id, createEventBuyerHistoryDto);
        return paymentRecord;
    }
    async createOrderForSellerBoostingEvent(req, createEventPaymentDto) {
        const { eventId } = createEventPaymentDto;
        const event = await this.eventService.getEvent(eventId);
        if (!event) {
            throw new common_1.NotFoundException(payment_error_message_constant_1.errorMessage.eventNotFound);
        }
        const paymentSetting = await this.paymentService.getPaymentSetting();
        const { EventBoostedCategory, maxBoostedDay } = event;
        const { charge } = EventBoostedCategory;
        const { platformCurrency } = paymentSetting;
        const totalAmount = charge * maxBoostedDay;
        const payment = new payment_class_1.Payment({
            totalAmount,
            paymentCurrency: platformCurrency,
        });
        const createPaymentDto = payment.getCreatePaymentDto();
        const createdPayment = await this.paymentService.createPayment(createPaymentDto);
        const savePaymentDto = {
            userId: req.user.id,
            paymentContext: client_1.PaymentContext.SELLER_BOOST_EVENT,
            paymentMetadata: {
                totalAmount,
                haveNextPayment: false,
                nextPaymentAmount: 0,
            },
            createdPayment,
        };
        const paymentRecord = await this.paymentService.savePaymentRecord(savePaymentDto);
        const createEventBoosterBuyerHistoryDto = new create_event_booster_buyer_history_dto_1.CreateEventBoosterBuyerHistoryDto();
        createEventBoosterBuyerHistoryDto.eventId = eventId;
        createEventBoosterBuyerHistoryDto.paymentId = paymentRecord.id;
        await this.eventBoosterBuyerHistoryService.create(req.user.id, createEventBoosterBuyerHistoryDto);
        return paymentRecord;
    }
    async createOrderForCustomerBokingngPlace(req, createPlacePaymentDto) {
        const { placeId, longOfStay } = createPlacePaymentDto;
        const place = await this.placesService.findOne(placeId);
        if (!place) {
            throw new common_1.NotFoundException(payment_error_message_constant_1.errorMessage.placeNotFoud);
        }
        const paymentSetting = await this.paymentService.getPaymentSetting();
        const { price } = place;
        const { platformCurrency, platformCharge } = paymentSetting;
        const totalAmount = (price * longOfStay * platformCharge) / 100;
        const nextPaymentAmount = price * longOfStay - totalAmount;
        const payment = new payment_class_1.Payment({
            totalAmount,
            paymentCurrency: platformCurrency,
        });
        const createPaymentDto = payment.getCreatePaymentDto();
        const createdPayment = await this.paymentService.createPayment(createPaymentDto);
        const savePaymentDto = {
            userId: req.user.id,
            paymentContext: client_1.PaymentContext.CUSTOMER_BOOK_PLACE,
            paymentMetadata: {
                totalAmount,
                haveNextPayment: true,
                nextPaymentAmount,
            },
            createdPayment,
        };
        const paymentRecord = await this.paymentService.savePaymentRecord(savePaymentDto);
        const createPlaceBuyerHistoryDto = new create_place_buyer_history_dto_1.CreatePlaceBuyerHistoryDto();
        createPlaceBuyerHistoryDto.longOfStay = longOfStay;
        createPlaceBuyerHistoryDto.paymentId = paymentRecord.id;
        createPlaceBuyerHistoryDto.placeId = placeId;
        await this.placeBuyerHistoryService.create(req.user.id, createPlaceBuyerHistoryDto);
        return paymentRecord;
    }
    async approveOrder(orderID) {
        const capturedPayment = await this.paymentService.capturePayment(orderID);
        return await this.paymentService.updatePaymentRecord(orderID, capturedPayment);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('service/payout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payout_dto_1.PayoutDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "payout", null);
__decorate([
    (0, common_1.Post)('/order/event'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_payment_dto_1.CreateEventPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createOrderForEventBuyer", null);
__decorate([
    (0, common_1.Post)('order/boosting-event'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_payment_dto_1.CreateEventPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createOrderForSellerBoostingEvent", null);
__decorate([
    (0, common_1.Post)('order/place'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_place_payment_dto_1.CreatePlacePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createOrderForCustomerBokingngPlace", null);
__decorate([
    (0, common_1.Post)('capture-order/:orderID'),
    __param(0, (0, common_1.Param)('orderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "approveOrder", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.Controller)('payment'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        events_service_1.EventsService,
        event_buyer_history_service_1.EventBuyerHistoryService,
        event_booster_buyer_history_service_1.EventBoosterBuyerHistoryService,
        places_service_1.PlacesService,
        place_buyer_history_service_1.PlaceBuyerHistoryService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map