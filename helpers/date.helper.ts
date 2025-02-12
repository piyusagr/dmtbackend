import { DateTime } from 'luxon';

export const getDateDifference = (startDate: Date, endDate: Date) => {
  const startDateTime = startDate.getTime();
  const endDateTime = endDate.getTime();

  const timeDifference =
    startDateTime > endDateTime
      ? startDateTime - endDateTime
      : endDateTime - startDateTime;

  return timeDifference / (1000 * 3600 * 24);
};

export const dateDifferenceFromNow = (date: Date) => {
  const end = DateTime.fromJSDate(date);

  return end.diffNow(['day']).days;
};

export const isValidDate = (date: Date) => {
  return !isNaN(date.getDate());
};

interface DateDifferenceLessThanInput {
  hours?: number;
  seconds?: number;
  days?: number;
  minutes?: number;
}

export const timeHasElapsed = (
  date: Date,
  input: DateDifferenceLessThanInput,
) => {
  const end = DateTime.fromJSDate(date);

  const difference = end
    .diffNow(['days', 'hours', 'seconds', 'minutes'])
    .toObject() as {
    minutes: number;
    days: number;
    hours: number;
    seconds: number;
  };

  if (input.days && input.days > -difference.days) return false;

  if (input.seconds && input.seconds > -difference.seconds) return false;

  if (input.minutes && input.minutes > -difference.minutes) return false;

  if (input.days && input.days > -difference.days) return false;

  return true;
};

export const shortenDate = (date: Date) => {
  return date.toLocaleDateString('en-us', { dateStyle: 'short' });
};
