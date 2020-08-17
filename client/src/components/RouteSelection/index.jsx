import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  FormText,
} from 'reactstrap';
import './styles.scss';

function RouteSelection() {
  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      <div className='booking-form'>
        <Form>
          <Row form>
            <Col sm='6'>
              <FormGroup>
                <Label className='form-label' for='departures'>
                  {t('routeSeclection.from')}
                </Label>
                <CustomInput
                  className='form-control'
                  type='select'
                  name='select'
                  id='departures'>
                  <option value=''>{t('routeSeclection.destination')}</option>
                  <option>{t('routeSeclection.hn')}</option>
                  <option>{t('routeSeclection.dn')}</option>
                  <option>{t('routeSeclection.hcm')}</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label className='form-label' for='arrive'>
                  {t('routeSeclection.to')}
                </Label>
                <CustomInput
                  className='form-control'
                  type='select'
                  name='select'
                  id='arrive'>
                  <option value=''>{t('routeSeclection.destination')}</option>
                  <option>{t('routeSeclection.hn')}</option>
                  <option>{t('routeSeclection.dn')}</option>
                  <option>{t('routeSeclection.hcm')}</option>
                </CustomInput>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm='6'>
              <FormGroup>
                <Label className='form-label' for='arrive'>
                  {t('routeSeclection.flightTypes')}
                </Label>
                <CustomInput
                  className='form-control'
                  type='select'
                  name='select'
                  id='arrive'>
                  <option value=''>{t('routeSeclection.types')}</option>
                  <option>{t('routeSeclection.roundTrip')}</option>
                  <option>{t('routeSeclection.oneWay')}</option>
                </CustomInput>
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label className='form-label' for='ticket-number'>
                  {t('routeSeclection.ticketNumber')}
                </Label>
                <CustomInput
                  type='number'
                  className='form-control'
                  min='1'
                  defaultValue='1'
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col sm='6'>
              <FormGroup>
                <Label className='form-label' for='departure-date'>
                  {t('routeSeclection.departureDate')}
                </Label>
                <Input className='form-control' type='date' required />
              </FormGroup>
            </Col>
            <Col sm='6'>
              <FormGroup>
                <Label className='form-label' for='return date-date'>
                  {t('routeSeclection.returnDate')}
                </Label>
                <Input className='form-control' type='date' required />
              </FormGroup>
            </Col>
          </Row>
          <div className='form-btn'>
            <Button className='submit-btn'>
              {t('routeSeclection.checkAvai')}
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default RouteSelection;
