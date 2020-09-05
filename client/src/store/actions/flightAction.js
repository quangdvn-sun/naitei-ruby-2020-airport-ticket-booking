import { GET_ONE_WAY_FLIGHTS_DATA, GET_ROUND_TRIP_FLIGHTS_DATA } from './types';
import { railsApi } from '../../api/railsApi';
import history from '../../utils/history';
import { notifyError } from '../../services/alertService';

export const getOneWayFlights = flightData => async dispatch => {
  try {
    const { data } = await railsApi.post('/customers/flights', { flight: flightData });

    dispatch({
      type: GET_ONE_WAY_FLIGHTS_DATA,
      payload: {
        ...data.data,
        time: flightData.time,
        locations: flightData.locations,
      },
    });
    history.push('/booking');
  } catch (err) {
    notifyError(err.response.data.message);
  }
};

export const getRoundTripFlights = flightData => async dispatch => {
  try {
    const { data } = await railsApi.post('/customers/flights', { flight: flightData });

    dispatch({
      type: GET_ROUND_TRIP_FLIGHTS_DATA,
      payload: {
        ...data.data,
        time: flightData.time,
        locations: flightData.locations,
      },
    });
    history.push('/booking');
  } catch (err) {
    notifyError(err.response.data.message);
  }
};
