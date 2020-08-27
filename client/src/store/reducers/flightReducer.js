import {
  GET_ONE_WAY_FLIGHTS_DATA,
  GET_ROUND_TRIP_FLIGHTS_DATA,
} from '../actions/types';

const initialState = {
  time: {
    first: '2020-09-01',
    second: '2020-09-11'
  },
  locations: {
    from: 'HAN',
    to: 'HCM'
  },
  firstRouteFlights: [
    {
      id: 926,
      departure_day: '2020-09-01T00:00:00.000+07:00',
      departure_time: 14,
      normal_total_seat: 80,
      normal_reserved_seat: 19,
      business_total_seat: 80,
      business_reserved_seat: 38,
      base_price: 55,
      plane: 'VN-JY-585',
      plane_type: 'Airbus A340',
      shift: 'Noon',
      flight_route: 1,
      flight_duration: 2.5,
      flight_status: 'Undepart'
    },
    {
      id: 700,
      departure_day: '2020-09-01T00:00:00.000+07:00',
      departure_time: 7,
      normal_total_seat: 125,
      normal_reserved_seat: 53,
      business_total_seat: 125,
      business_reserved_seat: 75,
      base_price: 55,
      plane: 'VN-ML-917',
      plane_type: 'Boeing 747',
      shift: 'Morning',
      flight_route: 1,
      flight_duration: 2.5,
      flight_status: 'Undepart'
    },
    {
      id: 534,
      departure_day: '2020-09-01T00:00:00.000+07:00',
      departure_time: 14,
      normal_total_seat: 150,
      normal_reserved_seat: 85,
      business_total_seat: 150,
      business_reserved_seat: 96,
      base_price: 55,
      plane: 'VN-TS-346',
      plane_type: 'Boeing 737',
      shift: 'Noon',
      flight_route: 1,
      flight_duration: 2.5,
      flight_status: 'Undepart'
    }
  ],
  secondRouteFlights: [
    {
      id: 256,
      departure_day: '2020-09-11T00:00:00.000+07:00',
      departure_time: 21,
      normal_total_seat: 150,
      normal_reserved_seat: 48,
      business_total_seat: 150,
      business_reserved_seat: 88,
      base_price: 55,
      plane: 'VN-NS-831',
      plane_type: 'Boeing 737',
      shift: 'Night',
      flight_route: 2,
      flight_duration: 2.5,
      flight_status: 'Undepart'
    },
    {
      id: 145,
      departure_day: '2020-09-11T00:00:00.000+07:00',
      departure_time: 7,
      normal_total_seat: 150,
      normal_reserved_seat: 126,
      business_total_seat: 150,
      business_reserved_seat: 73,
      base_price: 55,
      plane: 'VN-JG-664',
      plane_type: 'Boeing 737',
      shift: 'Morning',
      flight_route: 2,
      flight_duration: 2.5,
      flight_status: 'Undepart'
    },
    {
      id: 46,
      departure_day: '2020-09-11T00:00:00.000+07:00',
      departure_time: 7,
      normal_total_seat: 125,
      normal_reserved_seat: 118,
      business_total_seat: 125,
      business_reserved_seat: 18,
      base_price: 55,
      plane: 'VN-IS-545',
      plane_type: 'Boeing 747',
      shift: 'Morning',
      flight_route: 2,
      flight_duration: 2.5,
      flight_status: 'Undepart'
    }
  ],
  type: 2
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
