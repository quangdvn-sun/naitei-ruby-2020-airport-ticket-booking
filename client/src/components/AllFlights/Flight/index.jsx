import React from 'react';
import { Row, Col } from 'reactstrap';
import SelectClass from './SelectClass';
import FlightTime from './FlightTime';
import priceRate from '../../../constants/priceRate';
import seatType from '../../../constants/seatType';
import './styles.scss';

const Flight = ({
  row,
  data,
  chosenFlight,
  onChosenFlightChanged,
  onFlightChanged,
}) => {
  const selected = (row === chosenFlight.index || row + 1 === chosenFlight.index);

  return (
    <Row className={`flight ${selected ? 'selected' : ''}`}>
      <Col sx="4">
        <FlightTime data={data} />
      </Col>
      <SelectClass
        index={row}
        chosenFlight={chosenFlight}
        onChosenFlightChanged={onChosenFlightChanged}
        onFlightChanged={payload =>
          onFlightChanged({
            flight_id: data.id,
            seat_type_id: seatType.economy,
            ...payload,
          })
        }
        classType="eco"
        remained={data.normal_total_seat - data.normal_reserved_seat}
        price={data.base_price * priceRate.economy}
      />
      <SelectClass
        index={row + 1}
        chosenFlight={chosenFlight}
        onChosenFlightChanged={onChosenFlightChanged}
        onFlightChanged={payload =>
          onFlightChanged({
            flight_id: data.id,
            seat_type_id: seatType.business,
            ...payload,
          })
        }
        classType="business"
        remained={data.business_total_seat - data.business_reserved_seat}
        price={data.base_price * priceRate.business}
      />
    </Row>
  );
};

export default Flight;
