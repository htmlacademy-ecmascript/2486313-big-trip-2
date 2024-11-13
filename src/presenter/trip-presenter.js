import PointsPresenter from './points-presenter.js';
export default class TripPresenter {

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    const pointsPresenter = new PointsPresenter(this.pointsContainer, this.pointsModel);
    pointsPresenter.init();
  }
}
