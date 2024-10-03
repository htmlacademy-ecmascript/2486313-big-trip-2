import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: 1,
    basePrice: 130,
    dateFrom: '2025-07-09T12:55:00.000Z',
    dateTo: '2025-07-09T13:25:00.000Z',
    destination: 1,
    isFavorite: false,
    offers: [2,4],
    type: 'taxi'
  },
  {
    id: 2,
    basePrice: 1100,
    dateFrom: '2024-09-28T10:00:00.000Z',
    dateTo: '2024-09-28T10:01:00.000Z',
    destination: 2,
    isFavorite: true,
    offers: [3,8,10],
    type: 'train'
  },
  {
    id: 3,
    basePrice: 580,
    dateFrom: '2024-07-11T22:55:00.000Z',
    dateTo: '2024-07-16T11:23:00.000Z',
    destination: 3,
    isFavorite: false,
    offers: [],
    type: 'ship'
  },
];


function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
