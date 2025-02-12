"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingManager = exports.PlaceBookingCalculator = exports.IBookingCalculator = void 0;
const api_error_1 = require("../../../common/errors/api.error");
const date_helper_1 = require("../../../helpers/date.helper");
class IBookingCalculator {
}
exports.IBookingCalculator = IBookingCalculator;
class PlaceBookingCalculator {
    constructor(bookingData) {
        this.bookingData = bookingData;
        this.startDate = new Date(bookingData.startDate);
        this.endDate = new Date(bookingData.endDate);
        if (!(0, date_helper_1.isValidDate)(this.startDate))
            throw new api_error_1.ApiError('Must specify a valid start_date');
        if (!(0, date_helper_1.isValidDate)(this.endDate))
            throw new api_error_1.ApiError('Must specify a valid end_date');
    }
    getBookingTotal() {
        const dateDifference = (0, date_helper_1.getDateDifference)(this.startDate, this.endDate);
        const total = this.getSelectedPackages()
            .map((room) => room.price * dateDifference)
            .reduce((acc, curr) => (acc += curr), 0);
        return total;
    }
    getSelectedPackages() {
        const rooms = this.bookingData.rooms.filter((room) => this.bookingData.selectedRoomIds.includes(room.id));
        return rooms;
    }
    hasInvalidPackage() {
        return (this.getSelectedPackages().length !==
            this.bookingData.selectedRoomIds.length);
    }
}
exports.PlaceBookingCalculator = PlaceBookingCalculator;
class BookingManager {
    constructor(bookingCalculator) {
        this.bookingCalculator = bookingCalculator;
    }
    getBookingTotal() {
        return this.bookingCalculator.getBookingTotal();
    }
}
exports.BookingManager = BookingManager;
//# sourceMappingURL=booking-helper.js.map