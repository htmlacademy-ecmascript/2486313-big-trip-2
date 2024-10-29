import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter {

  constructor(point, boardOffers, boardDestinations, containerPointsView) {
    this.point = point;
    this.boardOffers = boardOffers;
    this.boardDestinations = boardDestinations;
    this.containerPointsView = containerPointsView;
  }

  #createPoint() {
    const point = new NewPointView({
      points: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
    });
    return point;
  }

  #createEditPoint() {
    const editPoint = new EditFormView({
      points: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
    });
    return editPoint;
  }

  #openEditPoint(point, editPoint) {
    point.setListenerClick(() => {
      replace(editPoint, point);
      window.addEventListener('keydown', this.#handlerEsc);
    });
    point.getListenerClick();
  }

  #closeEditPoint(point, editPoint) {
    editPoint.setListenerClick(() => {
      replace(point, editPoint);
      window.removeEventListener('keydown', this.#handlerEsc);
    });
    editPoint.getListenerClick();
  }

  #handlerEsc = (evt, point, editPoint) => {
    if (evt.key === 'Escape') {
      if (editPoint) {
        replace(point, editPoint);
      }
    }
    window.removeEventListener('keydown', this.#handlerEsc);
  };

  #drawPoints(point) {
    render(point, this.containerPointsView.element);
  }

  init() {
    const point = this.#createPoint();
    const editPoint = this.#createEditPoint();
    this.#drawPoints(point);

    this.#closeEditPoint(point, editPoint);
    this.#openEditPoint(point, editPoint);

    this.#handlerEsc(point, editPoint);

  }

}
