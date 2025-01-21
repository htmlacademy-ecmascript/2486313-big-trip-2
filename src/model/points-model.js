import { getRandomPoint } from '../mocks/points.js';
import { offers } from '../mocks/offers.js';
import { destinations } from '../mocks/destinations.js';
import Observable from '../framework/observable.js';

const POINT_COUNT = 5;

export default class PointsModel extends Observable {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  constructor() {
    super();
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

  updatePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Нет такого элемента!');
    }

    this.points = [
      ...this.points.slice(0, index),
      update,
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {

    this.points = [
      update,
      ...this.points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Нет такого элемента!');
    }

    this.points = [
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
