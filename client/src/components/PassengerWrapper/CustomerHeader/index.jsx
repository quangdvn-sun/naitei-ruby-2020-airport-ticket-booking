import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const CustomerHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="customerHeader">
      <FontAwesomeIcon className="icon" icon={faUser} />
      <span>
        <strong>{t('bookingSession.customerHeader.whoIsBooking')}</strong>
      </span>
      <span className="description">
        {t('bookingSession.customerHeader.contactInfo')}
      </span>
    </div>
  );
};

export default CustomerHeader;
