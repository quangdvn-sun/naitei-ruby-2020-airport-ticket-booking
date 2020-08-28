import React from 'react';
import { Col } from 'reactstrap';
import PaymentHeader from './PaymentHeader';
import PaymentForm from './PaymentForm';
import './styles.scss';

const PaymentWrapper = ({ paymentMethod, onPaymentMethodChanged }) => {
  return (
    <Col className="paymentWrapper" xs="9">
      <PaymentHeader />
      <PaymentForm
        paymentMethod={paymentMethod}
        setPaymentMethod={onPaymentMethodChanged}
      />
    </Col>
  );
};

export default PaymentWrapper;
