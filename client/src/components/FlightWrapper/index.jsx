import React from 'react';
import { Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import FlightHeader from './FlightHeader';
import AllFlights from '../AllFlights';
import './styles.scss';

const FlightWrapper = ({ onTotalPriceChanged }) => {
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
        onTotalPriceChanged={onTotalPriceChanged}
      />
      <br />
      <br />
      <FlightHeader inbound from={to} to={from} departureDate={time.second} />
      <AllFlights
        from={to}
        to={from}
        flights={secondRouteFlights}
        onTotalPriceChanged={onTotalPriceChanged}
      />
    </Col>
  );
};

export default FlightWrapper;
