import React, { Fragment, useState } from 'react';
import { Row } from 'reactstrap';
import ProgressTabs from '../../components/ProgressTabs';
import './styles.scss';
import FlightWrapper from '../../components/FlightWrapper';
import CartInfo from '../../components/CartInfo';
import BookingNav from '../../components/BookingNav';

const BookingSession = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const totalPriceChangedHandler = price => {
    setTotalPrice(prevState => prevState + price);
  };
  return (
    <Fragment>
      <div className="bookingSession">
        <ProgressTabs activeTab={0} />
        <Row className="bookingContainer">
          <FlightWrapper onTotalPriceChanged={totalPriceChangedHandler} />
          <CartInfo totalPrice={totalPrice} />
        </Row>
      </div>
      <BookingNav />
    </Fragment>
  );
};

export default BookingSession;
