import React, { Fragment, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from 'reactstrap';
import ProgressTabs from '../../components/ProgressTabs';
import FlightWrapper from '../../components/FlightWrapper';
import PassengerWrapper from '../../components/PassengerWrapper';
import PaymentWrapper from '../../components/PaymentWrapper';
import CartInfo from '../../components/CartInfo';
import BookingNav from '../../components/BookingNav';
import {
  CHANGE_STEP,
  CHANGE_TOTAL_PRICE,
  CHANGE_OUTBOUND_FLIGHT,
  CHANGE_INBOUND_FLIGHT,
  CHANGE_PAYMENT_METHOD,
  CHANGE_PASSENGER_DETAILS,
} from './types';
import flightType from '../../constants/flightType';
import './styles.scss';
import {
  setFlightDetails,
  setPassengerDetails,
  postBookingDetails,
  setPaymentMethod,
} from '../../store/actions';

const initialState = {
  currentStep: 0,
  payment_method: null,
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
  },
  booking_user: {
    name: null,
    email: null,
    phone: null,
  },
  booking_details: [],
};

const reducer = (
  state,
  {
    type,
    payload: {
      currentStep,
      payment_method,
      delta_price,
      flight_id,
      seat_type_id,
      booking_user,
      booking_details,
    },
  }
) => {
  switch (type) {
    case CHANGE_STEP:
      return {
        ...state,
        currentStep,
      };
    case CHANGE_PAYMENT_METHOD:
      return {
        ...state,
        payment_method,
      };
    case CHANGE_TOTAL_PRICE:
      return {
        ...state,
        total_price: state.total_price + delta_price,
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
    case CHANGE_PASSENGER_DETAILS:
      return {
        ...state,
        booking_user,
        booking_details,
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
  const { user } = useSelector(state => state.auth);
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

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitFlightDetails = () => {
    reduxDispatch(setFlightDetails(state));
    dispatch({
      type: CHANGE_STEP,
      payload: {
        currentStep: state.currentStep + 1,
      },
    });
    scrollTop();
  };

  const submitPassengerDetails = async payload => {
    reduxDispatch(
      setPassengerDetails({ ...payload, total_price: state.total_price })
    );
    dispatch({
      type: CHANGE_PASSENGER_DETAILS,
      payload,
    });
    dispatch({
      type: CHANGE_STEP,
      payload: {
        currentStep: state.currentStep + 1,
      },
    });
    scrollTop();
  };

  const submitBookingDetails = async () => {
    const details = await reduxDispatch(
      setPaymentMethod({
        method: state.payment_method,
        customer_id: user.id,
      })
    );
    reduxDispatch(postBookingDetails(details));
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
        onTotalPriceChanged={price =>
          dispatch({
            type: CHANGE_TOTAL_PRICE,
            payload: { delta_price: price },
          })
        }
      />
    );
    bookingNav = (
      <BookingNav
        onProceed={callSubmitForm}
        canProceed={canProceedSecondStep}
        canGoBack
      />
    );
  } else if (state.currentStep === 2) {
    wrapper = (
      <PaymentWrapper
        paymentMethod={state.payment_method}
        onPaymentMethodChanged={method =>
          dispatch({
            type: CHANGE_PAYMENT_METHOD,
            payload: { payment_method: method },
          })
        }
      />
    );
    bookingNav = (
      <BookingNav
        lastStep
        onProceed={submitBookingDetails}
        canProceed={state.paymentMethod !== null}
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
