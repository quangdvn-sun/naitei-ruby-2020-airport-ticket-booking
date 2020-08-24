import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'reactstrap';
import './styles.scss';

function CustomerInfo() {
  const { t } = useTranslation();

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
              <Col md={{ size: 6, pull: 7 }}></Col>
            </Row>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}

export default CustomerInfo;
