import { render, replace, remove } from '../framework/render.js';
import NewSort from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class TripPresenter {
  containerPointsView = new ContainerPointsView();
  sort = new NewSort();


  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }


  init() {

    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = this.pointsModel.getOffers();
    this.boardDestinations = this.pointsModel.getDestinations();

    render(this.sort, this.pointsContainer);
    render(this.containerPointsView, this.pointsContainer);

    for(let i = 0; i < this.boardPoints.length; i++) {
      const pointView = new NewPointView({
        points: this.boardPoints[i],
        offers: this.boardOffers,
        destinations: this.boardDestinations,
      });

      const editPointView = new EditFormView({
        points: this.boardPoints[i],
        offers: this.boardOffers,
        destinations: this.boardDestinations,
      });
      render(pointView, this.containerPointsView.element);


      pointView.setListenerClick(() => {
        replace(editPointView, pointView);
      });
      pointView.getListenerClick();

      editPointView.setListenerClick(() => {
        replace(pointView, editPointView);
      });

      editPointView.getListenerClick();

      window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          remove(editPointView);
          render(pointView, this.containerPointsView.element);
        }
      });


    }

  }
}
