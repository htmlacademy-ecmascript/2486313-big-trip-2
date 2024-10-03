import { render, replace, remove } from '../framework/render.js';
import NewSort from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import FiltersTitle from '../view/filters-title-view.js';
import { getDifferencesDates, compareNumbers } from '../utils.js';


const tripFilters = document.querySelector('.trip-controls__filters');
export default class TripPresenter {
  containerPointsView = new ContainerPointsView();
  sort = new NewSort();
  filterTitle = new FiltersTitle();

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {

    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = this.pointsModel.getOffers();
    this.boardDestinations = this.pointsModel.getDestinations();

    const drawPoints = (boardPoints) => {
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

    const deleteAllPoints = () => {
      document.querySelectorAll('.trip-events__item').forEach((point) => point.remove());
      document.querySelectorAll('.event--edit').forEach((point) => point.remove());
    };


    const detectClickOnFilter = () => {
      if (document.querySelector('#filter-future').checked) {
        const boardPointsFuture = this.boardPoints.filter((point) => point.dateFrom < new Date().toISOString());
        deleteAllPoints();
        drawPoints(boardPointsFuture);
      }
      if (document.querySelector('#filter-everything').checked) {
        deleteAllPoints();
        drawPoints(this.boardPoints);
      }
      if (document.querySelector('#filter-present').checked) {
        const boardPointsPresent = this.boardPoints.filter((point) => point.dateFrom === new Date().toISOString());
        deleteAllPoints();
        drawPoints(boardPointsPresent);
      }
      if (document.querySelector('#filter-past').checked) {
        const boardPointsPast = this.boardPoints.filter((point) => point.dateFrom > new Date().toISOString());
        deleteAllPoints();
        drawPoints(boardPointsPast);
      }
    };

    const detectClickOnSort = () => {
      if (document.querySelector('#sort-day').checked) {
        const boardPointsSortDay = this.boardPoints.sort((a, b) => b.dateFrom > a.dateFrom ? 1 : -1);
        deleteAllPoints();
        drawPoints(boardPointsSortDay);
      }
      if (document.querySelector('#sort-time').checked) {
        const boardPointsSortDay = this.boardPoints.sort((a, b) => getDifferencesDates(b.dateFrom, b.dateTo) > getDifferencesDates(a.dateFrom, a.dateTo) ? 1 : -1);
        deleteAllPoints();
        drawPoints(boardPointsSortDay);
      }
      if (document.querySelector('#sort-price').checked) {
        const boardPointsSortDay = this.boardPoints.sort((a, b) => b.basePrice > a.basePrice ? 1 : -1);
        deleteAllPoints();
        drawPoints(boardPointsSortDay);
      }
    };

    render(this.filterTitle, tripFilters);
    this.filterTitle.getListenerFilters(detectClickOnFilter);

    render(this.sort, this.pointsContainer);
    this.sort.getListenerSort(detectClickOnSort);

    render(this.containerPointsView, this.pointsContainer);

    drawPoints(this.boardPoints.sort((a, b) => b.dateFrom > a.dateFrom ? 1 : -1));

  }
}
