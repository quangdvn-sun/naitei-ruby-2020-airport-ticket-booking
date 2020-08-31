import {
  GET_ONE_WAY_FLIGHTS_DATA,
  GET_ROUND_TRIP_FLIGHTS_DATA,
} from '../actions/types';

const initialState = {
  time: {
    first: null,
    second: null
  },
  locations: {
    from: null,
    to: null
  },
  firstRouteFlights: [],
  type: null
};

const flightReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ONE_WAY_FLIGHTS_DATA:
      const { flights } = payload;
      return {
        ...state,
        time: payload.time,
        locations: payload.locations,
        type: payload.flight_type,
        firstRouteFlights: [...flights],
      };
    case GET_ROUND_TRIP_FLIGHTS_DATA:
      const { first, second } = payload;
      return {
        ...state,
        time: payload.time,
        locations: payload.locations,
        type: payload.flight_type,
        firstRouteFlights: [...first.flights],
        secondRouteFlights: [...second.flights],
      };
    default:
      return state;
  }
};

export default flightReducer;
