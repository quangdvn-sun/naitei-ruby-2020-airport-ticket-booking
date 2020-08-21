import { GET_ONE_WAY_FLIGHTS_DATA, GET_ROUND_TRIP_FLIGHTS_DATA } from './types';
import { railsApi } from '../../api/railsApi';
import history from '../../utils/history';

export const getOneWayFlights = flightData => async dispatch => {
  try {
    const { data } = await railsApi.post('/flights', { flight: flightData });

    dispatch({ type: GET_ONE_WAY_FLIGHTS_DATA, payload: data.data });
    history.push('booking');
    console.log(history);
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getRoundTripFlights = flightData => async dispatch => {
  try {
    const { data } = await railsApi.post('/flights', { flight: flightData });

    dispatch({ type: GET_ROUND_TRIP_FLIGHTS_DATA, payload: data.data });
    history.push('booking');
    console.log(history);
  } catch (err) {
    console.log(err.response.data.message);
  }
};

// export const getAllRestaurants = () => async (dispatch, getState) => {
//   try {
//     const { data } = await goFoodApi.get('/business/', reqConfig(getState));

//     dispatch({ type: GET_ALL_RESTAURANTS, payload: data.data });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const getAllEvents = () => async (dispatch, getState) => {
//   try {
//     const { data } = await goFoodApi.get('/event', reqConfig(getState));
//     dispatch({ type: GET_ALL_EVENTS, payload: data.data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const getRestaurantDetail = id => async dispatch => {
//   try {
//     const { data } = await goFoodApi.get(`/business/${id}`);

//     dispatch({ type: GET_RESTAURANTS_DETAIL, payload: data.data });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const clearRestaurantsDetail = () => dispatch => {
//   dispatch({ type: CLEAR_RESTAURANTS_DETAIL });
// };

// export const addBookmark = (id, sendData) => async (dispatch, getState) => {
//   try {
//     await goFoodApi.put(
//       `/business/${id}/bookmark`,
//       sendData,
//       reqConfig(getState)
//     );

//     dispatch({ type: ADD_BOOKMARK, payload: id });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const removeBookmark = id => async (dispatch, getState) => {
//   try {
//     await goFoodApi.delete(`/business/${id}/bookmark`, reqConfig(getState));

//     dispatch({ type: REMOVE_BOOKMARK, payload: id });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const markInterested = (id, sendData) => async (dispatch, getState) => {
//   try {
//     await goFoodApi.put(
//       `/event/${id}/interested`,
//       sendData,
//       reqConfig(getState)
//     );

//     dispatch({ type: REACT_EVENT, payload: id });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// export const markUninterested = id => async (dispatch, getState) => {
//   try {
//     await goFoodApi.put(`/event/${id}/uninterested`, {}, reqConfig(getState));

//     dispatch({ type: REACT_EVENT, payload: id });
//   } catch (err) {
//     console.log(err.message);
//   }
// };
