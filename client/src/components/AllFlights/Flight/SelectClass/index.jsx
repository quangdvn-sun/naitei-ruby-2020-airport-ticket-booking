import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const SelectClass = ({
  classType,
  index,
  price,
  onTotalPriceChanged,
  chosenFlight,
  onChosenFlightChanged,
  chosenPrice,
  onChosenPriceChanged,
}) => {
  const { t } = useTranslation();

  const selectedChangedHandler = () => {
    if (chosenFlight === index) {
      onTotalPriceChanged(-price);
      onChosenPriceChanged(null);
      onChosenFlightChanged(null);
    } else {
      onTotalPriceChanged(price - chosenPrice);
      onChosenPriceChanged(price);
      onChosenFlightChanged(index);
    }
  };
  return (
    <Col
      xs="4"
      className={`selectClass ${classType}`}
      onClick={selectedChangedHandler}
    >
      <span className="select">
        {t('bookingSession.allFlights.selectFlight')}&nbsp;&nbsp;
        <span className="checkbox">
          {chosenFlight === index && <FontAwesomeIcon icon={faCheck} />}
        </span>
      </span>
      <br />
      <span className="price">{price.toFixed(2)} USD</span>
    </Col>
  );
};

export default SelectClass;
