import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const PassengerHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="passengerHeader">
      <FontAwesomeIcon className="icon" icon={faUserFriends} />
      <span>
        <strong>{t('bookingSession.passengerHeader.whoIsFlying')}</strong>
      </span>
      <span className="description">
        {t('bookingSession.passengerHeader.dataAndServices')}
      </span>
    </div>
  );
};

export default PassengerHeader;
