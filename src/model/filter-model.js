import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable{

  #activeFilter = FilterType.EVERYTHING;

  constructor() {
    super();
  }

  getActiveFilter() {
    return this.#activeFilter;
  }

  setActiveFilter(updateType, activeFilter) {
    this.#activeFilter = activeFilter;
    this._notify(updateType, activeFilter);
  }

}
