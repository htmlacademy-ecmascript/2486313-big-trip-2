import PointsPresenter from './points-presenter.js';
import PointsModel from '../model/point-model.js';
const pointsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
export default class TripPresenter {

  init() {
    const pointsPresenter = new PointsPresenter({pointsContainer, pointsModel});
    pointsPresenter.init();
  }
}
