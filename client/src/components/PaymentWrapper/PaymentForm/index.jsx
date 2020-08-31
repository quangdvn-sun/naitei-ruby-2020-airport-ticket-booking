import React from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCreditCard,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import paymentMethods from '../../../constants/paymentMethods';
import './styles.scss';

const PaymentForm = ({ paymentMethod, setPaymentMethod }) => {
  const { t } = useTranslation();
  return (
    <div className="paymentForm myForm active">
      <div className="title">{t('bookingSession.paymentForm.title')}</div>
      <div className="form">
        <span className="form-label required">
          {t('bookingSession.paymentForm.choosePayment')}
        </span>
        <br />
        <Row className="methods">
          <Col xs="6">
            <div
              className={`method ${paymentMethod === paymentMethods.creditCard ? 'checked' : ''}`}
              onClick={() => {
                if (paymentMethod === paymentMethods.creditCard) {
                  setPaymentMethod(null);
                } else {
                  setPaymentMethod(paymentMethods.creditCard);
                }
              }}
            >
              <FontAwesomeIcon className="icon" icon={faCreditCard} />
              <span className="desc">{t('bookingSession.paymentForm.useCreditCard')}</span>
              <br />
              <span className="checkbox">
                {paymentMethod === paymentMethods.creditCard ? (
                  <FontAwesomeIcon className="checkIcon" icon={faCheck} />
                ) : null}
              </span>
            </div>
          </Col>
          <Col xs="6">
            <div
              className={`method ${paymentMethod === paymentMethods.cash ? 'checked' : ''}`}
              onClick={() => {
                if (paymentMethod === paymentMethods.cash) {
                  setPaymentMethod(null);
                } else {
                  setPaymentMethod(paymentMethods.cash);
                }
              }}
            >
              <FontAwesomeIcon className="icon" icon={faDollarSign} />
              <span className="desc">{t('bookingSession.paymentForm.useCash')}</span>
              <br />
              <span className="checkbox">
                {paymentMethod === paymentMethods.cash ? (
                  <FontAwesomeIcon className="checkIcon" icon={faCheck} />
                ) : null}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentForm;
