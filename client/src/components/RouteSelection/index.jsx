import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Formik } from 'formik';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { getOneWayFlights, getRoundTripFlights } from '../../store/actions';
import formatDate from '../../utils/formatDate';
import destination from '../../constants/destination.json';
import flightType from '../../constants/flightType.json';
import * as Yup from 'yup';

const initialStates = {
  from: '',
  to: '',
  type: '',
  first: '',
  second: '',
  ticket_number: 1,
};

const validationSchema = Yup.object().shape({
  from: Yup.string().required('Please enter a departure location'),
  to: Yup.string().required('Please enter a arrival location'),
  type: Yup.string().required('Please enter a flight type'),
  first: Yup.string().required('Please enter your first trip date'),
  second: Yup.string().when('type', {
    is: val => val === '2',
    then: Yup.string().required('Please enter your second trip date'),
    otherwise: Yup.string().nullable(),
  }),
  ticket_number: Yup.string().required('Please enter your booked tickets'),
});

function RouteSelection() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleSearchFlights = flightData => {
    const { type, first, second, from, to } = flightData;
    const flight = {
      type: parseInt(type),
      time: {
        first,
        second,
      },
      locations: {
        from,
        to,
      },
    };
    parseInt(type) === flightType.oneWay
      ? dispatch(getOneWayFlights(flight))
      : dispatch(getRoundTripFlights(flight));
  };

  return (
    <Fragment>
      <Formik
        initialValues={initialStates}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSearchFlights(values);
        }}
      >
        {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
          <div className='booking-form'>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col sm='6'>
                  <FormGroup>
                    <Label className='form-label required' for='from'>
                      {t('routeSeclection.from')}
                    </Label>
                    <Input
                      className='form-control'
                      type='select'
                      name='from'
                      id='from'
                      onChange={handleChange}
                      value={values.from || ''}
                    >
                      <option value=''>
                        {t('routeSeclection.destination')}
                      </option>
                      {destination.map((place, index) => (
                        <option key={index} value={place.subname}>
                          {place.subname}
                        </option>
                      ))}
                    </Input>
                    {touched.from && errors.from ? (
                      <div className='error'>{errors.from}</div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm='6'>
                  {values.from ? (
                    <FormGroup>
                      <Label className='form-label required' for='to'>
                        {t('routeSeclection.to')}
                      </Label>
                      <Input
                        className='form-control'
                        type='select'
                        name='to'
                        id='to'
                        onChange={handleChange}
                        value={values.to || ''}
                      >
                        <option value=''>
                          {t('routeSeclection.destination')}
                        </option>
                        {destination
                          .filter(place => place.subname !== values.from)
                          .map((place, index) => (
                            <option key={index} value={place.subname}>
                              {place.subname}
                            </option>
                          ))}
                      </Input>
                      {touched.to && errors.to ? (
                        <div className='error'>{errors.to}</div>
                      ) : null}
                    </FormGroup>
                  ) : null}
                </Col>
              </Row>
              <Row form>
                <Col sm='6'>
                  <FormGroup>
                    <Label className='form-label required' for='type'>
                      {t('routeSeclection.flightTypes')}
                    </Label>
                    <Input
                      className='form-control'
                      type='select'
                      name='type'
                      id='type'
                      onChange={handleChange}
                      value={values.type || ''}
                    >
                      <option value=''>{t('routeSeclection.types')}</option>
                      <option value={1}>{t('routeSeclection.oneWay')}</option>
                      <option value={2}>
                        {t('routeSeclection.roundTrip')}
                      </option>
                    </Input>
                    {touched.type && errors.type ? (
                      <div className='error'>{errors.type}</div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm='6'>
                  <FormGroup>
                    <Label className='form-label required' for='ticket_number'>
                      {t('routeSeclection.ticketNumber')}
                    </Label>
                    <Input
                      type='number'
                      className='form-control'
                      min='1'
                      name='ticket_number'
                      id='ticket_number'
                      onChange={handleChange}
                      value={values.ticket_number}
                    />
                    {touched.ticket_number && errors.ticket_number ? (
                      <div className='error'>{errors.ticket_number}</div>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col sm='6'>
                  <FormGroup>
                    <Label className='form-label required' for='first'>
                      {t('routeSeclection.departureDate')}
                    </Label>
                    <Input
                      className='form-control'
                      type='date'
                      name='first'
                      id='first'
                      min={formatDate(new Date())}
                      onChange={handleChange}
                      value={values.first || ''}
                    />
                    {touched.first && errors.first ? (
                      <div className='error'>{errors.first}</div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col sm='6'>
                  {values.type === '2' && values.first ? (
                    <FormGroup>
                      <Label className='form-label required' for='second'>
                        {t('routeSeclection.returnDate')}
                      </Label>
                      <Input
                        className='form-control'
                        type='date'
                        name='second'
                        id='second'
                        min={formatDate(new Date(values.first))}
                        onChange={handleChange}
                        value={values.second || ''}
                      />
                      {touched.second && errors.second ? (
                        <div className='error'>{errors.second}</div>
                      ) : null}
                    </FormGroup>
                  ) : null}
                </Col>
              </Row>
              <div className='form-btn'>
                <Button
                  className='submit-btn'
                  type='submit'
                  disabled={!isValid || !values.first}
                >
                  {t('routeSeclection.checkAvai')}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </Fragment>
  );
}

export default RouteSelection;
