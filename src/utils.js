import { MILLISECONDS_IN_MINUTES, HOURS_IN_DAY, dateFormats } from './const.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);


function getFullDateIncompleteYear(date) {
  return date ? dayjs.utc(date).format(dateFormats.fullDateIncompleteYear) : '';
}

function getMonthDay(date) {
  return date ? dayjs.utc(date).format(dateFormats.monthDay) : '';
}

function getYearMonthDay(date) {
  return date ? dayjs.utc(date).format(dateFormats.yearMonthDay) : '';
}

function getFullDateTime(date) {
  return date ? dayjs.utc(date).format(dateFormats.fullDateTime) : '';
}

function getHoursMinutes(date) {
  return date ? dayjs.utc(date).format(dateFormats.hoursMinutes) : '';
}

/**
 *
 * @param { Array } items - массив из которого нужно выбрать случайное значение
 * @returns случайное значение из массива
 */

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getDifferencesDates(dateFrom, dateTo) {
  const difference = dayjs.utc(dateTo).diff(dateFrom);

  if (difference < MILLISECONDS_IN_MINUTES) {
    return dayjs.utc(difference).format('mm[M]');
  } else if (difference > MILLISECONDS_IN_MINUTES && difference < MILLISECONDS_IN_MINUTES * HOURS_IN_DAY) {
    return dayjs.utc(difference).format('HH[H] mm[M]');
  } else {
    return dayjs.utc(difference).format('DD[D] HH[H] mm[M]');
  }
}

export { getRandomArrayElement, getDifferencesDates, getMonthDay, getFullDateTime, getHoursMinutes, getYearMonthDay, getFullDateIncompleteYear };
