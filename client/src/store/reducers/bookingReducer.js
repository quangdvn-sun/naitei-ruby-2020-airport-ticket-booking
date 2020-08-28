import { SET_BOOKING_INFO, SET_FLIGHT_DETAILS, SET_PASSENGER_DETAILS, SET_PAYMENT_METHOD } from '../actions/types';

const initialState = {
  booking_user: {
    name: null,
    email: null,
    phone: null
  },
  flight_type: 2,
  customer_id: null,
  payment_method_id: null,
  flight_details: {
    first: {
      flight_id: null,
      seat_type_id: null
    },
    second: {
      flight_id: null,
      seat_type_id: null
    }
  },
  total_price: 0,
  booking_total: 2,
  booking_details: []
};

const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOKING_INFO:
      return {
        ...state,
        flight_type: payload.flightType,
        booking_total: payload.bookingTotal
      };
    case SET_FLIGHT_DETAILS:
      return {
        ...state,
        total_price: payload.total_price,
        flight_details: payload.flight_details
      }
    case SET_PASSENGER_DETAILS:
      return {
        ...state,
        total_price: payload.total_price,
        booking_user: payload.booking_user,
        booking_details: payload.booking_details
      }
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        payment_method_id: payload.payment_method_id,
        customer_id: payload.customer_id
      }
    default:
      return state;
  }
};

export default bookingReducer;
