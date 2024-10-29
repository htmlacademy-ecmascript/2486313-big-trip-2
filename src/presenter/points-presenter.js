import { render, replace } from '../framework/render.js';
import NewSortView from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import FiltersTitleView from '../view/filters-title-view.js';
import { getDifferencesDates } from '../utils.js';
import PointPresenter from './point-presenter.js';


const tripFilters = document.querySelector('.trip-controls__filters');

export default class PointsPresenter {
  containerPointsView = new ContainerPointsView();
  sort = new NewSortView();
  filtersTitle = new FiltersTitleView();
  activeFilter = 'everything';
  activeSort = 'sort-day';
  #points = new Set();

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  deleteAllPoints = () => {
    document.querySelectorAll('.trip-events__item').forEach((point) => point.remove());
    document.querySelectorAll('.event--edit').forEach((editPoint) => editPoint.remove());
  };

  get points() {
    const points = this.pointsModel.getPoints();
    return points;
  }

  #renderPoint(point, boardOffers, boardDestinations) {
    const pointPresenter = new PointPresenter(point, boardOffers, boardDestinations, this.containerPointsView);
    pointPresenter.init();
    this.#points.add(pointPresenter);
  }

  #renderPoints(boardOffers, boardDestinations) {
    this.points.forEach((point) => this.#renderPoint(point, boardOffers, boardDestinations));
  }

  #redrawPoints = (boardPoints) => {
    this.deleteAllPoints();
    for(let i = 0; i <= boardPoints.length; i++) {
      this.#renderPoint(boardPoints[i], this.boardOffers, this.boardDestinations);
    }
  };

  detectClickOnFilter = (evt) => {
    this.activeFilter = evt.target.value;
    if (this.activeFilter === 'future') {
      const boardPointsFuture = this.boardPoints.filter((point) => point.dateFrom < new Date().toISOString());
      this.activeFilter = boardPointsFuture;
      this.#redrawPoints(this.activeFilter);
    }
    if (this.activeFilter === 'everything') {
      this.activeFilter = this.boardPoints;
      this.#redrawPoints(this.activeFilter);
    }
    if (this.activeFilter === 'present') {
      const boardPointsPresent = this.boardPoints.filter((point) => point.dateFrom === new Date().toISOString());
      this.activeFilter = boardPointsPresent;
      this.#redrawPoints(this.activeFilter);
    }
    if (this.activeFilter === 'past') {
      const boardPointsPast = this.boardPoints.filter((point) => point.dateFrom > new Date().toISOString());
      this.activeFilter = boardPointsPast;
      this.#redrawPoints(this.activeFilter);
    }
  };

  detectClickOnSort = (evt) => {
    this.activeSort = evt.target.value;
    if (this.activeSort === 'sort-day') {
      const boardPointsSortDay = this.activeFilter.sort((a, b) => b.dateFrom > a.dateFrom ? 1 : -1);
      this.#redrawPoints(boardPointsSortDay);
    }
    if (this.activeSort === 'sort-time') {
      const boardPointsSortDay = this.activeFilter.sort((a, b) => getDifferencesDates(b.dateFrom, b.dateTo) > getDifferencesDates(a.dateFrom, a.dateTo) ? 1 : -1);
      this.#redrawPoints(boardPointsSortDay);
    }
    if (this.activeSort === 'sort-price') {
      const boardPointsSortDay = this.activeFilter.sort((a, b) => b.basePrice > a.basePrice ? 1 : -1);
      this.#redrawPoints(boardPointsSortDay);
    }
  };


  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = this.pointsModel.getOffers();
    this.boardDestinations = this.pointsModel.getDestinations();

    render(this.filtersTitle, tripFilters);
    this.filtersTitle.getListenerFilters(this.detectClickOnFilter);

    render(this.sort, this.pointsContainer);
    this.sort.getListenerSort(this.detectClickOnSort);

    render(this.containerPointsView, this.pointsContainer);

    this.#redrawPoints(this.boardPoints.sort((a, b) => b.dateFrom > a.dateFrom ? 1 : -1));

  }
}
