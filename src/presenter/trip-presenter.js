import { render } from '../render.js';
import NewSort from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import NewPointView from '../view/points-view.js';
import EditForm from '../view/edit-form.js';

export default class TripPresenter {
  containerPointsView = new ContainerPointsView();
  editForm = new EditForm();
  sort = new NewSort();

  constructor({pointsContainer, pointsModel}) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {

    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.sort, this.pointsContainer);
    render(this.editForm, this.pointsContainer);
    render(this.containerPointsView, this.pointsContainer);

    for(let i = 0; i <= this.boardPoints.length; i++) {
      render(new NewPointView({point: this.boardPoints[i]}), this.containerPointsView.getElement());
    }

  }
}
