import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {

  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(point, boardOffers, boardDestinations, containerPointsView, onModeChange) {
    this.point = point;
    this.boardOffers = boardOffers;
    this.boardDestinations = boardDestinations;
    this.containerPointsView = containerPointsView;
    this.#handleModeChange = onModeChange;
  }

  #createPoint() {
    this.pointView = new NewPointView({
      points: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
      onPointClick: this.replaceCardToForm,
    });
  }

  #createEditPoint() {
    this.editPointView = new EditFormView({
      point: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
      onFormClick: this.replaceFormToCard,
    });
  }

  #openEditPoint() {
    this.pointView.setListenerClick(() => this.replaceCardToForm());
    this.pointView.getListenerClick();
  }

  #closeEditPoint() {
    this.editPointView.setListenerClick(() => this.replaceFormToCard());
    this.editPointView.getListenerClick();
  }

  replaceCardToForm() {
    replace(this.editPointView, this.pointView);
    window.addEventListener('keydown', this.#handlerEsc);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  replaceFormToCard() {
    replace(this.pointView, this.editPointView);
    window.removeEventListener('keydown', this.#handlerEsc);
    this.#mode = Mode.DEFAULT;
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.replaceFormToCard();
    }
  }

  #handlerEsc = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.replaceFormToCard();
    }
  };

  #drawPoint() {
    render(this.pointView, this.containerPointsView.element);
  }

  destroy() {
    remove(this.pointView);
    remove(this.editPointView);
  }

  // Реализация клика по звёздочки

  init() {
    this.#createPoint();
    this.#createEditPoint();
    this.#drawPoint();
    this.#openEditPoint();
    this.#closeEditPoint();
  }

}
