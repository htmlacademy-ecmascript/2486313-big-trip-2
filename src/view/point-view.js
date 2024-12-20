import AbstractView from '../framework/view/abstract-view.js';
import { getDifferencesDates, getMonthDay, getFullDateTime, getHoursMinutes, getYearMonthDay } from '../utils.js';

function createEditPointTemplate(points, offers, destinations) {

  const { basePrice, dateFrom, dateTo, isFavorite, type } = points;
  const typeOffers = offers.find((off) => off.type === points.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => points.offers.includes(typeOffer.id));
  const pointDestinations = destinations.find((des) => des.id === points.destination);


  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${getYearMonthDay(dateFrom)}">${getMonthDay(dateFrom)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${pointDestinations.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${getFullDateTime(dateFrom)}">${getHoursMinutes(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${getFullDateTime(dateTo)}">${getHoursMinutes(dateTo)}</time>
                  </p>
                  <p class="event__duration">${getDifferencesDates(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${pointOffers.map((offer) => (`<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`)).join('')}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">${!isFavorite ? 'Add to favorite' : ''}</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
  `;
}

export default class NewPointView extends AbstractView{

  #points = null;
  #offers = null;
  #destinations = null;

  constructor({points, offers, destinations}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createEditPointTemplate(this.#points, this.#offers, this.#destinations);
  }

  setListenerClick(onButtonClick) {
    this.onButtonClick = onButtonClick;
  }

  getListenerClick() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.onButtonClick);
  }

  setListenerFavorite(checkFavorite) {
    this.checkFavorite = checkFavorite;
  }

  getListenerFavorite() {
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.checkFavorite);
  }

}

