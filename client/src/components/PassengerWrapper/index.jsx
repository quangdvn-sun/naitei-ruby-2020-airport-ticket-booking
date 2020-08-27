import React from 'react';
import { Form, Col } from 'reactstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import PassengerHeader from './PassengerHeader';
import PassengerForm from './PassengerForm';
import CustomerHeader from './CustomerHeader';
import CustomerForm from './CustomerForm';
import allServices from '../../constants/services.json';
import './styles.scss';

const validationSchema = Yup.object().shape({
  customer: Yup.object().shape({
    fullName: Yup.string().required('Please enter your full name.'),
    email: Yup.string()
      .label('Email')
      .email()
      .trim()
      .required('Please enter your email.'),
    phone: Yup.string()
      .matches(/^[0-9]{7,11}$/, 'Phone number is not in correct format.')
      .required('Please enter your phone number.'),
  }),
  passengers: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().required('Please enter a valid name.'),
      dateOfBirth: Yup.string().required(
        'Please enter or choose a valid date of birth.'
      ),
      country: Yup.string().required('Please choose a country of residence.'),
      luggage: Yup.boolean(),
      checkin: Yup.boolean(),
      lounge: Yup.boolean(),
    })
  ),
});

const PassengerWrapper = ({ bindSubmit, proceedSecondStep, onSubmitDetails }) => {
  const { booking_total } = useSelector(state => state.booking);

  const initialValues = {
    customer: {
      fullName: '',
      email: '',
      phone: '',
    },
    passengers: Array.from(Array(booking_total)).map(() => ({
      fullName: '',
      dateOfBirth: '',
      country: '',
      luggage: false,
      checkin: false,
      lounge: false,
    })),
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      isInitialValid={false}
      onSubmit={({ customer, passengers }, actions) => {
        const details = {
          booking_user: {
            name: customer.fullName,
            email: customer.email,
            phone: customer.phone
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
              service_ids: services
            };
          })
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

        const handleFormChanged = async (event) => {
          await handleChange(event);
          proceedSecondStep(isValid);
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
              <PassengerHeader />
              {Array.from(Array(booking_total)).map((item, index) => (
                <PassengerForm
                  handleBlur={handleBlur}
                  handleChange={handleFormChanged}
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
