import { combineReducers } from 'redux';
import flightReducer from './flightReducer';
import bookingReducer from './bookingReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  flight: flightReducer,
  booking: bookingReducer,
  auth: authReducer
});

export default rootReducer;
