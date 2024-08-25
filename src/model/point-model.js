import { getRandomPoint } from '../mocks/points.js';
import { offers } from '../mocks/offers.js';
import { destinations } from '../mocks/destinations.js';

const POINT_COUNT = 3;

export default class PointModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  constructor() {
    this.offers = offers;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
