import AbstractView from '../framework/view/abstract-view.js';
import { remove, replace } from '../framework/render.js';
import { getDifferencesDates } from '../utils.js';

function createNewSort () {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;
}

export default class NewSort extends AbstractView{

  get template() {
    return createNewSort();
  }

  getSortTime(points) {
    const sortTime = this.element.querySelector('#sort-time');
    sortTime.addEventListener('click', () => {
      for (let i = 0; i < points.length; i++) {
        const differenceDateFrom = getDifferencesDates(points[i].dateFrom, points[i].dateTo);
        const differenceDateTo = getDifferencesDates(points[i + 1].dateFrom, points[i + 1].dateTo);
        if (differenceDateFrom >= differenceDateTo) {
          replace(points[i], points[i + 1]);
        }
        replace(points[i + 1], points[i]);
      }
    });
  }

}
