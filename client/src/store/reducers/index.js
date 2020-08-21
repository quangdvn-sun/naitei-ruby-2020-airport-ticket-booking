import { combineReducers } from 'redux';
import flightReducer from './flightReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  flight: flightReducer,
  booking: bookingReducer,
});

export default rootReducer;
