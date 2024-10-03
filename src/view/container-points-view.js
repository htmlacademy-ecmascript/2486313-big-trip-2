import AbstractView from '../framework/view/abstract-view.js';

function createNewEventTrip () {
  return '<ul class="trip-events__list"></ul>';
}

export default class ContainerPointsView extends AbstractView{

  get template() {
    return createNewEventTrip();
  }
}
