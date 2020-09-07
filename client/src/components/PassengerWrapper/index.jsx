import React from 'react';
import { Form, Col } from 'reactstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import PassengerHeader from './PassengerHeader';
import PassengerForm from './PassengerForm';
import CustomerHeader from './CustomerHeader';
import CustomerForm from './CustomerForm';
import allServices from '../../constants/services';
import './styles.scss';

const PassengerWrapper = ({
  bindSubmit,
  proceedSecondStep,
  onSubmitDetails,
  onTotalPriceChanged,
}) => {
  const { t } = useTranslation();
  const { booking_total } = useSelector(state => state.booking);
  const { user } = useSelector(state => state.auth);

  const initialValues = {
    customer: {
      fullName: user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
    },
    passengers: Array.from(Array(booking_total)).map(() => ({
      fullName: '',
      dateOfBirth: '',
      country: '',
      luggage: false,
      checkin: false,
      lounge: false,
    })),
  };

  const validationSchema = Yup.object().shape({
    customer: Yup.object().shape({
      fullName: Yup.string().required(t('validations.fullName.exist')),
      email: Yup.string()
        .label('Email')
        .email()
        .trim()
        .required(t('validations.email')),
      phone: Yup.string()
        .trim()
        .matches(/^[0-9]{7,11}$/, t('validations.phoneNumber.format'))
        .required(t('validations.phoneNumber.exist')),
    }),
    passengers: Yup.array().of(
      Yup.object().shape({
        fullName: Yup.string().trim().required(t('validations.passengerName')),
        dateOfBirth: Yup.string().required(t('validations.dateOfBirth')),
        country: Yup.string().required(t('validations.country')),
        luggage: Yup.boolean(),
        checkin: Yup.boolean(),
        lounge: Yup.boolean(),
      })
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ customer, passengers }, actions) => {
        const details = {
          booking_user: {
            name: customer.fullName,
            email: customer.email,
            phone: customer.phone,
          },
          booking_details: passengers.map(passenger => {
            const services = [];
            Object.keys(allServices).forEach(key => {
              if (passenger[key]) {
                services.push(allServices[key]);
              }
            });
            return {
              booking_name: passenger.fullName,
              booking_dob: passenger.dateOfBirth,
              booking_nation: passenger.country,
              service_ids: services,
            };
          }),
        };
        onSubmitDetails(details);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        submitForm,
        isValid,
        errors,
        touched,
      }) => {
        bindSubmit(submitForm);

        const handleFormChanged = event => {
          handleChange(event);
          proceedSecondStep(isValid && values.customer.email);
        };
        return (
          <Col className="passengerWrapper" xs="9">
            <Form onSubmit={handleSubmit}>
              <CustomerHeader />
              <CustomerForm
                handleBlur={handleBlur}
                handleChange={handleFormChanged}
                values={values}
                errors={errors}
                touched={touched}
              />
              <br />
              <br />
              <PassengerHeader />
              {Array.from(Array(booking_total)).map((item, index) => (
                <PassengerForm
                  handleBlur={handleBlur}
                  handleChange={handleFormChanged}
                  changeTotalPrice={onTotalPriceChanged}
                  values={values}
                  key={index}
                  index={index}
                  errors={errors}
                  touched={touched}
                />
              ))}
            </Form>
          </Col>
        );
      }}
    </Formik>
  );
};

export default PassengerWrapper;
