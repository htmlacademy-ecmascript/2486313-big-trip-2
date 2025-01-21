import { render } from '../framework/render.js';
import NewSortView from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import FiltersTitleView from '../view/filters-title-view.js';
import { getDifferencesDates } from '../utils.js';
import PointPresenter from './point-presenter.js';
import { UpdateType, UserAction } from '../const.js';


const tripFilters = document.querySelector('.trip-controls__filters');

export default class PointsPresenter {
  containerPointsView = new ContainerPointsView();
  sort = new NewSortView();
  filtersTitle = new FiltersTitleView();
  activeFilter = 'everything';
  activeSort = 'sort-day';
  #points = new Set();
  #pointsModel = null;
  #filterModel = null;
  #filteredPoints = null;

  constructor({pointsContainer, pointsModel, filterModel}) {
    this.pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#filteredPoints = this.#filterModel.setActiveFilter(UpdateType.MINOR, this.activeFilter);

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get pointsData() {
    return this.#pointsModel.getPoints();
  }

  get offers() {
    return this.#pointsModel.getOffers();
  }

  get destinations() {
    return this.#pointsModel.getDestinations();
  }

  #handleViewAction = (userAction, updateType, update) => {
    switch (userAction) {
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#points.forEach((pointPresenter) => pointPresenter.point.id === data.id);
        break;
      case UpdateType.MINOR:
        this.#redrawPoints();
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  get sortedPoints() {
    switch (this.activeSort) {
      case 'sort-day':
        return this.#filteredPoints.sort((a,b) => b.dateFrom > a.dateFrom ? 1 : -1);
      case 'sort-time':
        return this.#filteredPoints.sort((a,b) => getDifferencesDates(b.dateTo, b.dateFrom) > getDifferencesDates(a.dateTo, a.dateFrom) ? 1 : -1);
      case 'sort-price':
        return this.#filteredPoints.sort((a,b) => b.basePrice > a.basePrice ? 1 : -1);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(point, this.offers, this.destinations, this.containerPointsView, this.#handleModeChange, this.#handleViewAction);
    this.#points.add(pointPresenter);
  }

  destroyAllPoints() {
    this.#points.forEach((pointPresenter) => {
      pointPresenter.destroy();
    });
    this.#points.clear();
  }

  #handleModeChange = () => {
    this.#points.forEach((pointPresenter) => pointPresenter.resetView());
  };

  #redrawPoints() {
    this.destroyAllPoints();
    this.sortedPoints.forEach((pointData) => {
      this.#renderPoint(pointData);
    });
    this.#points.forEach((pointPresenter) => {
      pointPresenter.init();
    });
  }

  onClickFilterButtons = (evt) => {
    this.activeFilter = evt.target.value;
    this.#filteredPoints = this.#filterModel.setActiveFilter(UpdateType.MINOR, this.activeFilter);
    this.#redrawPoints();
  };

  onClickSortButtons = (evt) => {
    this.activeSort = evt.target.value;
    this.#redrawPoints();
  };


  init() {

    render(this.filtersTitle, tripFilters);
    this.filtersTitle.getListenerFilters(this.onClickFilterButtons);

    render(this.sort, this.pointsContainer);
    this.sort.getListenerSort(this.onClickSortButtons);

    render(this.containerPointsView, this.pointsContainer);

    this.#redrawPoints();

  }
}
