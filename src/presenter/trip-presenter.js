import { render } from '../render.js';
import NewSort from '../view/sort-view.js';
import ContainerPointsView from '../view/container-points-view.js';
import NewPointView from '../view/points-view.js';
import EditForm from '../view/edit-form.js';

export default class TripPresenter {

  constructor({pointsContainer}) {
    this.pointsContainer = pointsContainer;
  }

  init() {
    render(new NewSort(), this.pointsContainer);
    render(new ContainerPointsView(), this.pointsContainer);

    const ContainerPoints = document.querySelector('.trip-events__list');
    for(let i = 0; i < 3; i++) {
      render(new NewPointView(), ContainerPoints);
    }
    const point = document.querySelector('.trip-events__item');
    render(new EditForm(), point);
  }
}
