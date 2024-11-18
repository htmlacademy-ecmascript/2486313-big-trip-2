import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFullDateIncompleteYear } from '../utils.js';
import { POINT_TYPES } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEditForm (point, offers, destinations) {

  const { basePrice, type, isTypePoint, isCityPoint, dueDateFrom, dueDateTo } = point;
  const typeOffers = offers.find((off) => off.type === point.isTypePoint).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointDestinations = destinations.find((des) => des.id === isCityPoint);


  return (`<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${isTypePoint}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${POINT_TYPES.map((typePoint) => (`<div class="event__type-item">
                          <input id="event-type-${typePoint}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typePoint}" ${typePoint === type ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${typePoint}" for="event-type-${typePoint}-${point.id}">${typePoint}</label>
                        </div>`)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${point.id}">
                      ${isTypePoint}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${pointDestinations.name}" list="destination-list-${point.id}">
                    <datalist id="destination-list-${point.id}">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dueDateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dueDateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${point.id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${typeOffers.map((typeOffer) => (`<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${point.id}" type="checkbox" name="event-offer-luggage" ${pointOffers.map((off) => off.id).includes(typeOffer.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-luggage-${point.id}">
                          <span class="event__offer-title">${typeOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${typeOffer.price}</span>
                        </label>
                      </div>`)).join('')}
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestinations.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${pointDestinations.pictures.map((picture) => (`
                        <img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>
                      `))}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`);
}

export default class EditFormView extends AbstractStatefulView{
  #offers = null;
  #destinations = null;
  #DatepickerStart = null;
  #DatepickerEnd = null;

  constructor({point, offers, destinations}) {
    super();
    this._setState(EditFormView.restoreTaskToState(point));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handlerUpdateTypePoint();
    this.#handlerOnClickOffer();
    this.#handlerOnRestoreCity();
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  static restoreTaskToState(pointData) {
    return {
      ...pointData,
      isTypePoint: pointData.type,
      isCityPoint: pointData.destination,
      dueDateFrom: getFullDateIncompleteYear(pointData.dateFrom),
      dueDateTo: getFullDateIncompleteYear(pointData.dateTo),
    };
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.onButtonClick);
    this.#handlerUpdateTypePoint();
    this.#handlerOnClickOffer();
    this.#handlerOnRestoreCity();
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #dueDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dueDateFrom: userDate,
    });
  };

  #dueDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dueDateTo: userDate,
    });
  };

  #setDatepickerStart () {
    if (this.element.querySelector('[name="event-start-time"]').click) {
      this.#DatepickerStart = flatpickr(this.element.querySelector('[name="event-start-time"]'), {
        dateFormat: 'y/m/d H:i',
        defaultDate: this._state.dueDateFrom,
        minDate: 'today',
        enableTime: true,
        onChange: this.#dueDateFromChangeHandler,
      });
    }
  }

  #setDatepickerEnd () {
    if (this.element.querySelector('[name="event-end-time"]').click) {
      this.#DatepickerStart = flatpickr(this.element.querySelector('[name="event-end-time"]'), {
        dateFormat: 'y/m/d H:i',
        defaultDate: this._state.dueDateTo,
        minDate: 'today',
        enableTime: true,
        onChange: this.#dueDateToChangeHandler,
      });
    }
  }

  #handlerOnRestoreCity () {
    this.element.querySelector('.event__input').addEventListener('change', (evt) => {
      evt.preventDefault();
      const newIdCityPoint = this.#destinations.find((des) => des.name === evt.target.value);
      this.updateElement({
        isCityPoint: newIdCityPoint.id,
      });
    });
  }

  #handlerUpdateTypePoint () {
    this.element.querySelectorAll('.event__type-item').forEach((typeItem) => {
      typeItem.addEventListener('click', () => {
        this.updateElement({
          isTypePoint: typeItem.querySelector('label').textContent
        });
      });
    });
  }

  #handlerOnClickOffer () {
    this.element.querySelectorAll('.event__offer-selector').forEach((offerPoint) => {
      offerPoint.addEventListener('click', () => {
        if (offerPoint.querySelector('input').checked) {
          offerPoint.querySelector('input').checked = false;
        } else {
          offerPoint.querySelector('input').checked = true;
        }
      });
    });
  }


  get template() {
    return createEditForm(this._state, this.#offers, this.#destinations);
  }

  setListenerClick(onButtonClick) {
    this.onButtonClick = onButtonClick;
  }

  getListenerClick() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.onButtonClick);
  }


}
