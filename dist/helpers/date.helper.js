"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenDate = exports.timeHasElapsed = exports.isValidDate = exports.dateDifferenceFromNow = exports.getDateDifference = void 0;
const luxon_1 = require("luxon");
const getDateDifference = (startDate, endDate) => {
    const startDateTime = startDate.getTime();
    const endDateTime = endDate.getTime();
    const timeDifference = startDateTime > endDateTime
        ? startDateTime - endDateTime
        : endDateTime - startDateTime;
    return timeDifference / (1000 * 3600 * 24);
};
exports.getDateDifference = getDateDifference;
const dateDifferenceFromNow = (date) => {
    const end = luxon_1.DateTime.fromJSDate(date);
    return end.diffNow(['day']).days;
};
exports.dateDifferenceFromNow = dateDifferenceFromNow;
const isValidDate = (date) => {
    return !isNaN(date.getDate());
};
exports.isValidDate = isValidDate;
const timeHasElapsed = (date, input) => {
    const end = luxon_1.DateTime.fromJSDate(date);
    const difference = end
        .diffNow(['days', 'hours', 'seconds', 'minutes'])
        .toObject();
    if (input.days && input.days > -difference.days)
        return false;
    if (input.seconds && input.seconds > -difference.seconds)
        return false;
    if (input.minutes && input.minutes > -difference.minutes)
        return false;
    if (input.days && input.days > -difference.days)
        return false;
    return true;
};
exports.timeHasElapsed = timeHasElapsed;
const shortenDate = (date) => {
    return date.toLocaleDateString('en-us', { dateStyle: 'short' });
};
exports.shortenDate = shortenDate;
//# sourceMappingURL=date.helper.js.map