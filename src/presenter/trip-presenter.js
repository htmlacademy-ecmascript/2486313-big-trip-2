import { render } from '../render.js';
import NewSort from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import NewPointView from '../view/point-view.js';
import EditForm from '../view/edit-form.js';

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
    render(new EditForm({
      points: this.boardPoints[0],
      offers: this.boardOffers,
      destinations: this.boardDestinations,
    }), this.pointsContainer);
    render(this.containerPointsView, this.pointsContainer);

    for(let i = 0; i < this.boardPoints.length; i++) {
      render(new NewPointView({
        points: this.boardPoints[i],
        offers: this.boardOffers,
        destinations: this.boardDestinations,
      }), this.containerPointsView.getElement());
    }

  }
}
