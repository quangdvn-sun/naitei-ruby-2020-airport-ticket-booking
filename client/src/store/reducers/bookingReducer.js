import { SET_TICKET_NUMBER } from '../actions/types';

const initialState = {
  ticketNumber: null,
};

const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TICKET_NUMBER:
      return { ...state, ticketNumber: payload };

    default:
      return state;
  }
};

export default bookingReducer;
