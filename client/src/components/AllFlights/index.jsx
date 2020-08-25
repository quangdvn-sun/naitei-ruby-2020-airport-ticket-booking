import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flight from './Flight';
import { Row, Col } from 'reactstrap';
import './styles.scss';

const AllFlights = ({ flights, from, to, onTotalPriceChanged }) => {
  const { t } = useTranslation();
  const [chosenFlight, setChosenFlight] = useState(null);
  const [chosenPrice, setChosenPrice] = useState(null);

  const chosenFlightChangedHandler = (value) => {
    setChosenFlight(value);
  }
  const chosenPriceChangedHandler = (value) => {
    setChosenPrice(value);
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
          chosenPrice={chosenPrice}
          onChosenPriceChanged={chosenPriceChangedHandler}
          onTotalPriceChanged={onTotalPriceChanged}
        />
      ))}
    </div>
  );
};

export default AllFlights;
