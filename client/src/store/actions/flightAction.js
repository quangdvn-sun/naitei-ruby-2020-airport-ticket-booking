import { GET_ONE_WAY_FLIGHTS_DATA, GET_ROUND_TRIP_FLIGHTS_DATA } from './types';
import { railsApi } from '../../api/railsApi';
import history from '../../utils/history';

export const getOneWayFlights = flightData => async dispatch => {
  try {
    const { data } = await railsApi.post('/flights', { flight: flightData });

    dispatch({ type: GET_ONE_WAY_FLIGHTS_DATA, payload: data.data });
    history.push('booking');
  } catch (err) {}
};

export const getRoundTripFlights = flightData => async dispatch => {
  try {
    const { data } = await railsApi.post('/flights', { flight: flightData });

    dispatch({ type: GET_ROUND_TRIP_FLIGHTS_DATA, payload: data.data });
    history.push('booking');
  } catch (err) {}
};
