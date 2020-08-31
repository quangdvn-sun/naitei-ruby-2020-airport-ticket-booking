import React from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const BookingNav = ({ canProceed, onProceed, canGoBack, lastStep }) => {
  const { t } = useTranslation();

  return (
    <div className="bookingNav">
      <Button color="primary" disabled={!canGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        &nbsp;&nbsp;
        <strong>{t('bookingSession.bookingNav.back')}</strong>
      </Button>
      <Button
        className="next"
        color="success"
        disabled={!canProceed}
        onClick={onProceed}
      >
        <strong>
          {lastStep
            ? t('bookingSession.bookingNav.confirm')
            : t('bookingSession.bookingNav.next')}
        </strong>
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export default BookingNav;
