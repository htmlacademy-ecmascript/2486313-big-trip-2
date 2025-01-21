import { render } from './framework/render.js';
import DataInfoTrip from './view/data-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
const pointsContainer = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({filterModel, pointsModel});
filterPresenter.init();

render(new DataInfoTrip, tripMain, 'afterbegin');

const createNewPoint = new TripPresenter({pointsContainer, pointsModel, filterModel});

createNewPoint.init();


