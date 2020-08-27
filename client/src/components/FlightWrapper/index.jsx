import React, { Fragment } from 'react';
import { Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import FlightHeader from './FlightHeader';
import AllFlights from '../AllFlights';
import {
  CHANGE_OUTBOUND_FLIGHT,
  CHANGE_INBOUND_FLIGHT,
} from '../../containers/BookingSession/types';
import flightType from '../../constants/flightType.json';
import './styles.scss';

const FlightWrapper = ({ onFlightChanged }) => {
  const { flight_type } = useSelector(state => state.booking);
  const {
    time,
    locations: { from, to },
    firstRouteFlights,
    secondRouteFlights,
  } = useSelector(state => state.flight);

  return (
    <Col className="flightWrapper" xs="9">
      <FlightHeader from={from} to={to} departureDate={time.first} />
      <AllFlights
        from={from}
        to={to}
        flights={firstRouteFlights}
        onFlightChanged={payload =>
          onFlightChanged({ type: CHANGE_OUTBOUND_FLIGHT, payload })
        }
      />
      {parseInt(flight_type) === flightType.roundTrip && (
        <Fragment>
          <br />
          <br />
          <FlightHeader
            inbound
            from={to}
            to={from}
            departureDate={time.second}
          />
          <AllFlights
            from={to}
            to={from}
            flights={secondRouteFlights}
            onFlightChanged={payload =>
              onFlightChanged({ type: CHANGE_INBOUND_FLIGHT, payload })
            }
          />
        </Fragment>
      )}
    </Col>
  );
};

export default FlightWrapper;
