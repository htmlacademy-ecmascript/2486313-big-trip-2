import { render, replace, remove } from '../framework/render.js';
import NewSortView from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import FiltersTitleView from '../view/filters-title-view.js';
import { getDifferencesDates, compareNumbers } from '../utils.js';


const tripFilters = document.querySelector('.trip-controls__filters');
export default class TripPresenter {
  containerPointsView = new ContainerPointsView();
  sort = new NewSortView();
  filtersTitle = new FiltersTitleView();

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {

    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = this.pointsModel.getOffers();
    this.boardDestinations = this.pointsModel.getDestinations();
    this.activeFilter = this.boardPoints;

    const deleteAllPoints = () => {
      document.querySelectorAll('.trip-events__item').forEach((point) => point.remove());
      document.querySelectorAll('.event--edit').forEach((editPoint) => editPoint.remove());
    };

    const redrawPoints = (boardPoints) => {
      deleteAllPoints();
      for(let i = 0; i < boardPoints.length; i++) {
        const pointView = new NewPointView({
          points: boardPoints[i],
          offers: this.boardOffers,
          destinations: this.boardDestinations,
        });

        const editPointView = new EditFormView({
          points: boardPoints[i],
          offers: this.boardOffers,
          destinations: this.boardDestinations,
        });
        render(pointView, this.containerPointsView.element);


        const handlerEsc = (evt) => {
          if (evt.key === 'Escape') {
            if (editPointView) {
              replace(pointView, editPointView);
            }
          }
          window.removeEventListener('keydown', handlerEsc);
        };

        pointView.setListenerClick(() => {
          replace(editPointView, pointView);
          window.addEventListener('keydown', handlerEsc);
        });
        pointView.getListenerClick();

        editPointView.setListenerClick(() => {
          replace(pointView, editPointView);
          window.removeEventListener('keydown', handlerEsc);
        });
        editPointView.getListenerClick();

      }
    };


    const detectClickOnFilter = () => {
      if (this.filtersTitle.element.querySelector('#filter-future').checked) {
        const boardPointsFuture = this.boardPoints.filter((point) => point.dateFrom < new Date().toISOString());
        redrawPoints(boardPointsFuture);
        this.activeFilter = boardPointsFuture;
      }
      if (this.filtersTitle.element.querySelector('#filter-everything').checked) {
        redrawPoints(this.boardPoints);
        this.activeFilter = this.boardPoints;
      }
      if (this.filtersTitle.element.querySelector('#filter-present').checked) {
        const boardPointsPresent = this.boardPoints.filter((point) => point.dateFrom === new Date().toISOString());
        redrawPoints(boardPointsPresent);
        this.activeFilter = boardPointsPresent;
      }
      if (this.filtersTitle.element.querySelector('#filter-past').checked) {
        const boardPointsPast = this.boardPoints.filter((point) => point.dateFrom > new Date().toISOString());
        redrawPoints(boardPointsPast);
        this.activeFilter = boardPointsPast;
      }
    };

    const detectClickOnSort = () => {
      if (this.sort.element.querySelector('#sort-day').checked) {
        const boardPointsSortDay = this.activeFilter.sort((a, b) => b.dateFrom > a.dateFrom ? 1 : -1);
        redrawPoints(boardPointsSortDay);
      }
      if (this.sort.element.querySelector('#sort-time').checked) {
        const boardPointsSortDay = this.activeFilter.sort((a, b) => getDifferencesDates(b.dateFrom, b.dateTo) > getDifferencesDates(a.dateFrom, a.dateTo) ? 1 : -1);
        redrawPoints(boardPointsSortDay);
      }
      if (this.sort.element.querySelector('#sort-price').checked) {
        const boardPointsSortDay = this.activeFilter.sort((a, b) => b.basePrice > a.basePrice ? 1 : -1);
        redrawPoints(boardPointsSortDay);
      }
    };

    render(this.filtersTitle, tripFilters);
    this.filtersTitle.getListenerFilters(detectClickOnFilter);

    render(this.sort, this.pointsContainer);
    this.sort.getListenerSort(detectClickOnSort);

    render(this.containerPointsView, this.pointsContainer);

    redrawPoints(this.boardPoints.sort((a, b) => b.dateFrom > a.dateFrom ? 1 : -1));

  }
}
