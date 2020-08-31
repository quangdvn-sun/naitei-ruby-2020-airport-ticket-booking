import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const PaymentHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="paymentHeader">
      <FontAwesomeIcon className="icon" icon={faWallet} />
      <span>
        <strong>{t('bookingSession.paymentHeader.lastStep')}</strong>
      </span>
      <span className="description">
        {t('bookingSession.paymentHeader.paymentMethod')}
      </span>
    </div>
  );
};

export default PaymentHeader;
