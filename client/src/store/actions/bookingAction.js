import {
  SET_BOOKING_INFO,
  SET_FLIGHT_DETAILS,
  SET_PASSENGER_DETAILS,
  SET_PAYMENT_METHOD,
} from './types';
import { railsApi } from '../../api/railsApi';
import { notifyError, notifySuccess } from '../../services/alertService';
import history from '../../utils/history';

export const setBookingInfo = info => {
  return { type: SET_BOOKING_INFO, payload: info };
};

export const setFlightDetails = details => {
  return { type: SET_FLIGHT_DETAILS, payload: details };
};

export const setPassengerDetails = details => {
  return { type: SET_PASSENGER_DETAILS, payload: details };
};

export const setPaymentMethod = ({ method, customer_id }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: SET_PAYMENT_METHOD,
    payload: { payment_method_id: method, customer_id },
  });
  return Promise.resolve(getState().booking);
};

export const postBookingDetails = details => async dispatch => {
  try {
    const { data } = await railsApi.post('/bookings', details);
    history.push('/');
    notifySuccess('Booking successful!');
    return Promise.resolve(data);
  } catch (err) {
    notifyError(err.response.data.message);
  }
};
