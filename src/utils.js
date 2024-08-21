import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

/**
 *
 * @param { Array } items - массив из которого нужно выбрать случайное значение
 * @returns случайное значение из массива
 */

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export { getRandomArrayElement, humanizePointDate };
