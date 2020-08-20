import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

function PassengerInfo() {
  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      <div className='passenger-info'>
        <Row form>
          <Label className='form-label' for='name'>
            {t('passengerInfo.title')}
          </Label>
        </Row>
        <Row form>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='name'>
                {t('passengerInfo.name')}
              </Label>
              <Input className='form-control' placeholder='Name'></Input>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='service'>
                {t('passengerInfo.service')}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" /> {t('passengerInfo.service1')}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" /> {t('passengerInfo.service2')}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" /> {t('passengerInfo.service3')}
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='birth'>
                {t('passengerInfo.birth')}
              </Label>
              <Input className='form-control' type='date'></Input>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='country'>
                {t('passengerInfo.country')}
              </Label>
              <Input className='form-control' placeholder='Country'></Input>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default PassengerInfo;
