import React, { Fragment, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import ProgressTabs from '../../components/ProgressTabs';
import FlightWrapper from '../../components/FlightWrapper';
import PassengerWrapper from '../../components/PassengerWrapper';
import CartInfo from '../../components/CartInfo';
import BookingNav from '../../components/BookingNav';
import {
  CHANGE_STEP,
  CHANGE_OUTBOUND_FLIGHT,
  CHANGE_INBOUND_FLIGHT
} from './types';
import flightType from '../../constants/flightType.json';
import './styles.scss';
import { setFlightDetails, setPassengerDetails, submitBookingDetails } from '../../store/actions';

const initialState = {
  currentStep: 0,
  total_price: 0,
  flight_details: {
    first: {
      flight_id: null,
      seat_type_id: null,
    },
    second: {
      flight_id: null,
      seat_type_id: null,
    },
  }
};

const reducer = (
  state,
  {
    type,
    payload: {
      currentStep,
      delta_price,
      flight_id,
      seat_type_id,
    },
  }
) => {
  switch (type) {
    case CHANGE_STEP:
      return {
        ...state,
        currentStep,
      };
    case CHANGE_OUTBOUND_FLIGHT:
      return {
        ...state,
        total_price: state.total_price + delta_price,
        flight_details: {
          ...state.flight_details,
          first: {
            flight_id,
            seat_type_id,
          },
        },
      };
    case CHANGE_INBOUND_FLIGHT:
      return {
        ...state,
        total_price: state.total_price + delta_price,
        flight_details: {
          ...state.flight_details,
          second: {
            flight_id,
            seat_type_id,
          },
        },
      };
    default:
      return state;
  }
};

const BookingSession = () => {
  let wrapper, bookingNav;
  let submitFormHandler;

  const reduxDispatch = useDispatch();
  const { flight_type } = useSelector(state => state.booking);
  const bookings = useSelector(state => state.booking);
  const [state, dispatch] = useReducer(reducer, initialState);

  const canProceedFirstStep =
    (parseInt(flight_type) === flightType.oneWay &&
      state.flight_details.first.flight_id !== null) ||
    (parseInt(flight_type) === flightType.roundTrip &&
      state.flight_details.first.flight_id !== null &&
      state.flight_details.second.flight_id !== null);

  const [canProceedSecondStep, setProceedSecondStep] = useState(false);

  const proceedSecondStepHandler = isValid => {
    setProceedSecondStep(isValid);
  };

  const submitFlightDetails = () => {
    reduxDispatch(setFlightDetails(state));
    dispatch({
      type: CHANGE_STEP,
      payload: {
        currentStep: state.currentStep + 1,
      },
    });
  };

  const submitPassengerDetails = payload => {
    reduxDispatch(setPassengerDetails(payload));
    dispatch({
      type: CHANGE_STEP,
      payload: {
        currentStep: state.currentStep + 1,
      },
    });
    reduxDispatch(submitBookingDetails(bookings, payload));
  };

  const bindSubmit = submitForm => {
    submitFormHandler = submitForm;
  };

  const callSubmitForm = e => {
    if (submitFormHandler) {
      submitFormHandler(e);
    }
  };

  if (state.currentStep === 0) {
    wrapper = <FlightWrapper onFlightChanged={dispatch} />;
    bookingNav = (
      <BookingNav
        onProceed={submitFlightDetails}
        canProceed={canProceedFirstStep}
      />
    );
  } else if (state.currentStep === 1) {
    wrapper = (
      <PassengerWrapper
        bindSubmit={bindSubmit}
        proceedSecondStep={proceedSecondStepHandler}
        onSubmitDetails={submitPassengerDetails}
      />
    );
    bookingNav = (
      <BookingNav
        onProceed={callSubmitForm}
        canProceed={canProceedSecondStep}
        canGoBack
      />
    );
  }

  return (
    <Fragment>
      <div className="bookingSession">
        <ProgressTabs activeTab={state.currentStep} />
        <Row className="bookingContainer">
          {wrapper}
          <CartInfo totalPrice={state.total_price} />
        </Row>
      </div>
      {bookingNav}
    </Fragment>
  );
};

export default BookingSession;
