import { render } from './framework/render.js';
import DataInfoTrip from './view/data-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/point-model.js';
const pointsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const tripMain = document.querySelector('.trip-main');

render(new DataInfoTrip(), tripMain, 'afterbegin');

const createNewPoint = new TripPresenter({pointsContainer, pointsModel});

createNewPoint.init();


