import { render } from './framework/render.js';
import DataInfoTrip from './view/data-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripMain = document.querySelector('.trip-main');

render(new DataInfoTrip(), tripMain, 'afterbegin');

const createNewPoint = new TripPresenter();

createNewPoint.init();


