import NewPointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {

  #handleModeChange = null;
  #handleDataChange = null;
  #mode = Mode.DEFAULT;

  constructor(point, boardOffers, boardDestinations, containerPointsView, onModeChange, onDataChange) {
    this.point = point;
    this.boardOffers = boardOffers;
    this.boardDestinations = boardDestinations;
    this.containerPointsView = containerPointsView;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  #createPoint() {
    this.pointView = new NewPointView({
      points: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
      onClickFavorite: this.#handleOnClickFavorite,
      onClickOpenPoint: this.#replaceCardToForm,
    });
  }

  #createEditPoint() {
    this.editPointView = new EditFormView({
      point: this.point,
      offers: this.boardOffers,
      destinations: this.boardDestinations,
      onClickDelete: this.#handleClickDeletePoint,
      onClickCloseEditPoint: this.#replaceFormToCard,
    });
  }

  #handleClickDeletePoint = () => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      {...this.point}
    );
  };

  #replaceCardToForm = () => {
    replace(this.editPointView, this.pointView);
    window.addEventListener('keydown', this.#handlerEsc);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.pointView, this.editPointView);
    window.removeEventListener('keydown', this.#handlerEsc);
    this.#mode = Mode.DEFAULT;
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #handlerEsc = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #drawPoint() {
    render(this.pointView, this.containerPointsView.element);
  }

  destroy() {
    remove(this.pointView);
    remove(this.editPointView);
  }

  #handleOnClickFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.point, isFavorite: !this.point.isFavorite}
    );
  };

  init() {
    this.#createPoint();
    this.#createEditPoint();
    this.#drawPoint();
  }

}
