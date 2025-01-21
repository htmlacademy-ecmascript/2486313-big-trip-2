import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter{

  #filterModel = null;
  #pointsModel = null;
  #activeFilter = null;

  constructor({filterModel, pointsModel}) {
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#activeFilter = filterModel.getActiveFilter();

    this.#filterModel.addObserver(this.#handleFilteredPoints);
  }

  #handleFilteredPoints(updateType, activeFilter) {
    switch(activeFilter) {
      case FilterType.FUTURE:
        return this.#pointsModel.points().filter((pointData) => new Date(pointData.dateFrom) < new Date());
      case FilterType.EVERYTHING:
        return this.#pointsModel.points();
      case FilterType.PRESENT:
        return this.#pointsModel.points().filter((pointData) => new Date(pointData.dateFrom) === new Date());
      case FilterType.PAST:
        return this.#pointsModel.points().filter((pointData) => new Date(pointData.dateFrom) > new Date());
    }
  }

  init() {
    this.#handleFilteredPoints();
  }

}
