import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const SelectClass = ({
  classType,
  index,
  price,
  remained,
  onFlightChanged,
  chosenFlight,
  onChosenFlightChanged,
}) => {
  const { t } = useTranslation();
  const { booking_total } = useSelector(state => state.booking);

  const selectedChangedHandler = () => {
    if (chosenFlight.index === index) {
      onFlightChanged({
        flight_id: null,
        seat_type_id: null,
        delta_price: -price * booking_total,
      });
      onChosenFlightChanged({
        index: null,
        price: 0,
      });
    } else {
      onFlightChanged({
        delta_price: (price - chosenFlight.price) * booking_total,
      });
      onChosenFlightChanged({ index, price });
    }
  };
  if (booking_total > remained) {
    return (
      <Col xs="4" className={`selectClass ${classType}`}>
        <div className="soldOut">{t('bookingSession.allFlights.soldOut')}</div>
      </Col>
    );
  } else {
    return (
      <Col
        xs="4"
        className={`selectClass ${classType}`}
        onClick={selectedChangedHandler}
      >
        <span className="select">
          {chosenFlight.index === index
            ? t('bookingSession.allFlights.selected')
            : t('bookingSession.allFlights.selectFlight')}
          &nbsp;&nbsp;
          <span className="checkbox">
            {chosenFlight.index === index && <FontAwesomeIcon icon={faCheck} />}
          </span>
        </span>
        <br />
        <span className="price">{price.toFixed(2)} USD</span>
        <br />
        <br />
        {remained < 10 ? (
          <span className="remained">
            {t('bookingSession.allFlights.remained').replace('?', remained)}
          </span>
        ) : (
          ''
        )}
      </Col>
    );
  }
};

export default SelectClass;
