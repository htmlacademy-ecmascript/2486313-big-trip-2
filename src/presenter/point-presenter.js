
import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class PointPresenter {

  constructor(point, boardOffers, boardDestinations, containerPointsView) {
    this.point = point;
    this.boardOffers = boardOffers;
    this.boardDestinations = boardDestinations;
    this.containerPointsView = containerPointsView;
  }

  #createPoint() {
    this.pointView = new NewPointView({
      points: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
    });
  }

  #createEditPoint() {
    this.editPointView = new EditFormView({
      points: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
    });
  }

  #openEditPoint() {
    this.pointView.setListenerClick(() => {
      replace(this.editPointView, this.pointView);
      window.addEventListener('keydown', this.#handlerEsc);
    });
    this.pointView.getListenerClick();
  }

  #closeEditPoint() {
    this.editPointView.setListenerClick(() => {
      replace(this.pointView, this.editPointView);
      window.removeEventListener('keydown', this.#handlerEsc);
    });
    this.editPointView.getListenerClick();
  }

  #handlerEsc = (evt) => {
    if (evt.key === 'Escape') {
      if (evt.target !== this.pointView) {
        replace(this.pointView, this.editPointView);
        window.removeEventListener('keydown', this.#handlerEsc);
      }
    }
  };


  #drawPoint() {
    render(this.pointView, this.containerPointsView.element);
  }

  destroy() {
    remove(this.pointView);
    remove(this.editPointView);
  }

  init() {
    this.#createPoint();
    this.#createEditPoint();
    this.#drawPoint();
    this.#closeEditPoint();
    this.#openEditPoint();

  }

}
