const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const MILLISECONDS_IN_MINUTES = 36e5;
const HOURS_IN_DAY = 24;

const dateFormats = {
  fullDateTime: 'YYYY-MM-DDTHH:mm',
  yearMonthDay: 'YYYY-MM-DD',
  monthDay: 'MMM D',
  hoursMinutes: 'HH:mm',
  fullDateIncompleteYear: 'YY/MM/DD HH:mm',
};

const defaultNewPoint = [
  {
    id: 0,
    basePrice: 0,
    dateFrom: new Date().toISOString(),
    dateTo: new Date().toISOString(),
    destination: 0,
    isFavorite: false,
    offers: [],
    type: POINT_TYPES[0],
  }
];

const UserAction = {
  ADD_POINT: 'ADD_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export {POINT_TYPES, MILLISECONDS_IN_MINUTES, HOURS_IN_DAY, defaultNewPoint, dateFormats, UpdateType, UserAction, FilterType};
