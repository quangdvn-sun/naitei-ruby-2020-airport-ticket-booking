import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import destination from '../../../constants/destination';
import './styles.scss';

const FlightHeader = ({ from, to, departureDate, inbound }) => {
  const { t } = useTranslation();
  const fromFullName = destination.find(item => item.subname === from).fullname,
        toFullName = destination.find(item => item.subname === to).fullname;

  return (
    <div className="flightHeader">
      <FontAwesomeIcon
        icon={faPlane}
        className={`icon ${inbound ? 'inbound' : ''}`}
      />
      <span>
        <strong>{t('bookingSession.flightHeader.chooseFlight')}</strong>
      </span>
      <span className="fromTo">
        <strong>{fromFullName}</strong> ({from}){' '}
        {t('bookingSession.flightHeader.to')} <strong>{toFullName}</strong> (
        {to})
      </span>
      <div className="departureDate">
        {moment(departureDate).format('dddd, Do MMMM YYYY')}
      </div>
    </div>
  );
};

export default FlightHeader;
