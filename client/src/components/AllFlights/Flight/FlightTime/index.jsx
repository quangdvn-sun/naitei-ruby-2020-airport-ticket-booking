import React from 'react';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import './styles.scss';

const FlightTime = ({ data }) => {
  const {
    from,
    to,
    departure_day,
    departure_time,
    flight_duration,
    plane,
    plane_type,
  } = data;

  const departureTime = moment(departure_day).add(departure_time, 'h').format('HH:mm'),
    arriveTime = moment(departure_day)
      .add(departure_time + flight_duration, 'h')
      .format('HH:mm'),
    elaspedTime = moment(departure_day).add(flight_duration, 'h').format('H[h] mm[m]');

  return (
    <Row className="flightTime">
      <Col sx="4" className="time">
        <span>
          <strong>{departureTime}</strong>
        </span>
        <br />
        <span className="city">{from}</span>
      </Col>
      <Col sx="4" className="elapsedTime">
        <span className="value">{elaspedTime}</span>
        <br />
        <span>{plane}</span>
        <br />
        <span>
          <strong>{plane_type}</strong>
        </span>
      </Col>
      <Col sx="4" className="time">
        <span>
          <strong>{arriveTime}</strong>
        </span>
        <br />
        <span className="city">{to}</span>
      </Col>
    </Row>
  );
};

export default FlightTime;
