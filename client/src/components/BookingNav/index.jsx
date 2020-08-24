import React from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const BookingNav = () => {
  const { t } = useTranslation();

  return (
    <div className="bookingNav">
      <Button color="secondary" disabled>
        <FontAwesomeIcon icon={faArrowLeft}/>&nbsp;&nbsp;
        <strong>{t('bookingSession.bookingNav.back')}</strong>
      </Button>
      <Button className="next" color="success">
        <strong>{t('bookingSession.bookingNav.next')}</strong>&nbsp;&nbsp;
        <FontAwesomeIcon icon={faArrowRight}/>
      </Button>
    </div>
  );
};

export default BookingNav;
