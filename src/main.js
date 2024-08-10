import { render } from './render.js';
import NewFiltersTitle from './view/filters-title-view.js';
import DataInfoTrip from './view/data-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripFilters = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');


render(new DataInfoTrip(), tripMain, 'afterbegin');
render(new NewFiltersTitle(), tripFilters);


const createNewPoint = new TripPresenter({pointsContainer: pointsContainer});

createNewPoint.init();

