import React from 'react';
import { Row, Col } from 'reactstrap';
import SelectClass from './SelectClass';
import FlightTime from './FlightTime';
import priceRate from '../../../constants/priceRate.json';
import './styles.scss';

const Flight = ({
  row,
  data,
  chosenFlight,
  onChosenFlightChanged,
  chosenPrice,
  onChosenPriceChanged,
  onTotalPriceChanged,
}) => {
  return (
    <Row className="flight">
      <Col sx="4">
        <FlightTime data={data} />
      </Col>
      <SelectClass
        index={row}
        chosenFlight={chosenFlight}
        onChosenFlightChanged={onChosenFlightChanged}
        chosenPrice={chosenPrice}
        onChosenPriceChanged={onChosenPriceChanged}
        onTotalPriceChanged={onTotalPriceChanged}
        classType="eco"
        price={data.base_price * priceRate.economy}
      />
      <SelectClass
        index={row + 1}
        chosenFlight={chosenFlight}
        onChosenFlightChanged={onChosenFlightChanged}
        chosenPrice={chosenPrice}
        onChosenPriceChanged={onChosenPriceChanged}
        onTotalPriceChanged={onTotalPriceChanged}
        classType="business"
        price={data.base_price * priceRate.business}
      />
    </Row>
  );
};

export default Flight;
