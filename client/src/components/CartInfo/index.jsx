import React from 'react';
import { Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CityImage from '../../assets/images/city.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import destination from '../../constants/destination.json';
import flightType from '../../constants/flightType.json';
import './styles.scss';

const CartInfo = ({ totalPrice }) => {
  const { t } = useTranslation();
  const {
    type,
    locations: { from, to },
  } = useSelector(state => state.flight);
  const { ticketNumber } = useSelector(state => state.booking);

  const fromFullName = destination.find(item => item.subname === from).fullname,
    toFullName = destination.find(item => item.subname === to).fullname;

  return (
    <Col className="cartInfo" xs="3">
      <img src={CityImage} alt="city image" />
      <div className="fromTo">
        <span>
          {fromFullName} {t('bookingSession.cartInfo.to')} {toFullName}
        </span>
        <br />
        <span className="info">
          {t(
            `bookingSession.cartInfo.${
              type === flightType.oneWay ? 'oneWay' : 'roundTrip'
            }`
          )}
          &nbsp;|&nbsp;
          {ticketNumber} {t('bookingSession.cartInfo.person')}
        </span>
      </div>
      <div className="changeFlight">
        <FontAwesomeIcon icon={faPlane} className="icon" />
        &nbsp;&nbsp;{t('bookingSession.cartInfo.changeDetails')}
      </div>
      <div className="cartTotal">
        <span>
          <strong>{t('bookingSession.cartInfo.total')}</strong>
        </span>
        <span className="number">
          <strong>{totalPrice.toFixed(2)} {t('bookingSession.cartInfo.currency')}</strong>
        </span>
        <br />
        <span className="include">{t('bookingSession.cartInfo.include')}</span>
      </div>
    </Col>
  );
};

export default CartInfo;
