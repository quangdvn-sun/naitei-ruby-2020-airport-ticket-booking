import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flight from './Flight';
import { Row, Col } from 'reactstrap';
import './styles.scss';

const initialState = {
  index: null,
  price: 0
}

const AllFlights = ({ flights, from, to, onFlightChanged }) => {
  const { t } = useTranslation();
  const [chosenFlight, setChosenFlight] = useState(initialState);

  const chosenFlightChangedHandler = newFlight => {
    setChosenFlight({...chosenFlight, ...newFlight});
  }

  return (
    <div className="allFlights">
      <Row>
        <Col sx="6"></Col>
        <Col sx="6" className="flightLabel eco">
          {t('bookingSession.allFlights.economy')}
        </Col>
        <Col sx="6" className="flightLabel business">
          {t('bookingSession.allFlights.business')}
        </Col>
      </Row>
      {flights.map((flight, index) => (
        <Flight
          key={index}
          row={index * 2}
          data={{ ...flight, from, to }}
          chosenFlight={chosenFlight}
          onChosenFlightChanged={chosenFlightChangedHandler}
          onFlightChanged={onFlightChanged}
        />
      ))}
    </div>
  );
};

export default AllFlights;
