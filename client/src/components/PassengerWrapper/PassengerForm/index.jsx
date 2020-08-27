import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from 'reactstrap';
import formatDate from '../../../utils/formatDate';
import countries from '../../../constants/countries.json';
import './styles.scss';

const PassengerForm = ({
  index,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
}) => {
  const { t } = useTranslation();
  return (
    <div className="myForm passengerForm">
      <div className="title">{t('bookingSession.passengerForm.title')}</div>
      <div className="form">
        <FormGroup>
          <Label className="form-label required" for="fullName">
            {t('bookingSession.passengerForm.fullName')}
          </Label>
          <Input
            name={`passengers[${index}].fullName`}
            id={`passengers[${index}].fullName`}
            className="form-input"
            onChange={event => handleChange(event)}
            onBlur={handleBlur}
            value={values.passengers[index].fullName}
            invalid={
              touched.passengers?.length &&
              touched.passengers?.[index]?.fullName &&
              errors.passengers?.[index]?.fullName !== undefined
            }
            placeholder={t('bookingSession.passengerForm.fullName')}
          />
          {touched.passengers?.length &&
            touched.passengers?.[index]?.fullName &&
            errors.passengers?.[index]?.fullName && (
              <FormFeedback>
                {errors.passengers?.[index]?.fullName}
              </FormFeedback>
            )}
          <FormText>{t('bookingSession.passengerForm.nameDesc')}</FormText>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label required" for="dateOfBirth">
                {t('bookingSession.passengerForm.dateOfBirth')}
              </Label>
              <Input
                type="date"
                name={`passengers[${index}].dateOfBirth`}
                id={`passengers[${index}].dateOfBirth`}
                max={formatDate(new Date())}
                onChange={event => handleChange(event)}
                onBlur={handleBlur}
                className="form-input"
                invalid={
                  touched.passengers?.length &&
                  touched.passengers?.[index]?.dateOfBirth &&
                  errors.passengers?.[index]?.dateOfBirth !== undefined
                }
                placeholder={t('bookingSession.passengerForm.dateOfBirth')}
              />
              {touched.passengers?.length &&
                touched.passengers?.[index]?.dateOfBirth &&
                errors.passengers?.[index]?.dateOfBirth && (
                  <FormFeedback>
                    {errors.passengers?.[index]?.dateOfBirth}
                  </FormFeedback>
                )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="form-label required" for="country">
                {t('bookingSession.passengerForm.country')}
              </Label>
              <Input
                type="select"
                name={`passengers[${index}].country`}
                id={`passengers[${index}].country`}
                className="form-input"
                onChange={event => handleChange(event)}
                onBlur={handleBlur}
                invalid={
                  touched.passengers?.length &&
                  touched.passengers[index]?.chooseCountry &&
                  errors.passengers?.[index]?.chooseCountry !== undefined
                }
              >
                <option value="" hidden>
                  {t('bookingSession.passengerForm.chooseCountry')}
                </option>
                {Object.values(countries).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              {touched.passengers?.length &&
                touched.passengers?.[index]?.chooseCountry &&
                errors.passengers?.[index]?.chooseCountry && (
                  <FormFeedback invalid>
                    {errors.passengers?.[index]?.chooseCountry}
                  </FormFeedback>
                )}
            </FormGroup>
          </Col>
        </Row>
        <Label className="form-label required" for="service">
          {t('bookingSession.passengerForm.services')}
        </Label>
        <FormGroup check inline className="checkbox">
          <Label check>
            <Input
              type="checkbox"
              name={`passengers[${index}].luggage`}
              id={`passengers[${index}].luggage`}
              onChange={handleChange}
              value={values.passengers[index].luggage}
            />
            <span>{t('bookingSession.passengerForm.luggage')}</span>
          </Label>
        </FormGroup>
        <FormGroup check inline className="checkbox">
          <Label check>
            <Input
              type="checkbox"
              name={`passengers[${index}].checkIn`}
              id={`passengers[${index}].checkIn`}
              onChange={handleChange}
              value={values.passengers[index].checkIn}
            />
            <span>{t('bookingSession.passengerForm.checkIn')}</span>
          </Label>
        </FormGroup>
        <FormGroup check inline className="checkbox">
          <Label check>
            <Input
              type="checkbox"
              name={`passengers[${index}].lounge`}
              id={`passengers[${index}].lounge`}
              onChange={handleChange}
              value={values.passengers[index].lounge}
            />
            <span>{t('bookingSession.passengerForm.lounge')}</span>
          </Label>
        </FormGroup>
      </div>
    </div>
  );
};

export default PassengerForm;
