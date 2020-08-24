import { SET_TICKET_NUMBER } from './types';

export const setTicketNumber = ticketNumber => {
  return { type: SET_TICKET_NUMBER, payload: ticketNumber };
};
