import PointsPresenter from './points-presenter.js';
export default class TripPresenter {

  #pointsModel = null;
  #filterModel = null;

  constructor({pointsContainer, pointsModel, filterModel}) {
    this.pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    const pointsPresenter = new PointsPresenter({pointsContainer: this.pointsContainer, pointsModel: this.#pointsModel, filterModel: this.#filterModel});
    pointsPresenter.init();
  }
}
