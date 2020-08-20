import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, CardHeader, CardBody, Card, Button, CardText, Form } from 'reactstrap';
import './styles.scss';
import PassengerInfo from '../../components/PassengerInfo';
import ContactInfo from '../../components/ContactInfo';

function CustomerInfo() {
  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      <div id='booking' className='section'>
        <div className='section-center'>
          <Container>
            <Row>
              <Col md={{ size: 6, push: 5 }}>
                <div className='booking-cta'>
                  <h1>{t('welcome.book')}</h1>
                  <p>{t('welcome.lorem')}</p>
                </div>
              </Col>
              <Col md={{ size: 6, pull: 7 }}>
                <Form>
                  <div className='info'>
                    <PassengerInfo/>
                  </div>
                  <div className='info'>
                   <PassengerInfo/>
                  </div>
                  <div className='info'>
                   <ContactInfo/>
                  </div>
                  <div>
                    <Button color="primary">{t('customerInfo.submit')}</Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}

export default CustomerInfo;
