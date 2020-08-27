import { SET_BOOKING_INFO, SET_FLIGHT_DETAILS, SET_PASSENGER_DETAILS } from './types';
import { railsApi } from '../../api/railsApi';
import history from '../../utils/history';
import { notifyError, notifySuccess } from '../../services/alertService';

export const setBookingInfo = info => {
  return { type: SET_BOOKING_INFO, payload: info };
};

export const setFlightDetails = details => {
  return { type: SET_FLIGHT_DETAILS, payload: details };
};

export const setPassengerDetails = details => {
  return { type: SET_PASSENGER_DETAILS, payload: details };
};

export const submitBookingDetails = (bookings, details) => async dispatch => {
  try {
    const { data } = await railsApi.post('/bookings', { ...bookings, ...details });
    
    history.push('/');
    notifySuccess('Booking successful!');
  } catch (err) {
    notifyError(err.response.data.message);
  }
}
