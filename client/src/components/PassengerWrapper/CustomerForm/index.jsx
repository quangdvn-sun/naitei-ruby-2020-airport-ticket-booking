import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import './styles.scss';

const CustomerForm = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);

  const handleInputBlur = event => {
    setActive(false);
    handleBlur(event);
  };

  const handleInputFocus = () => {
    setActive(true);
  };

  return (
    <div className={`myForm customerForm ${active ? 'active' : ''}`}>
      <div className="title">{t('bookingSession.customerForm.title')}</div>
      <div className="form">
        <FormGroup>
          <Label className="form-label required" for="fullName">
            {t('bookingSession.customerForm.fullName')}
          </Label>
          <Input
            name="customer.fullName"
            id="customer.fullName"
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            value={values.customer.fullName}
            invalid={
              touched.customer?.fullName &&
              errors.customer?.fullName !== undefined
            }
            className="form-input"
            placeholder={t('bookingSession.customerForm.fullName')}
          />
          {touched.customer?.fullName && errors.customer?.fullName && (
            <FormFeedback>{errors.customer?.fullName}</FormFeedback>
          )}
          <FormText>{t('bookingSession.customerForm.nameDesc')}</FormText>
        </FormGroup>
        <FormGroup>
          <Label className="form-label required" for="email">
            {t('bookingSession.customerForm.email')}
          </Label>
          <Input
            name="customer.email"
            id="customer.email"
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            value={values.customer.email}
            invalid={
              touched.customer?.email && errors.customer?.email !== undefined
            }
            placeholder={t('bookingSession.customerForm.email')}
            className="form-input"
          />
          {touched.customer?.email && errors.customer?.email && (
            <FormFeedback>{errors.customer?.email}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label className="form-label required" for="phone">
            {t('bookingSession.customerForm.phone')}
          </Label>
          <Input
            name="customer.phone"
            id="customer.phone"
            onChange={handleChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            value={values.customer.phone}
            invalid={
              touched.customer?.phone && errors.customer?.phone !== undefined
            }
            placeholder={t('bookingSession.customerForm.phone')}
            className="form-input"
          />
          {touched.customer?.phone && errors.customer?.phone && (
            <FormFeedback>{errors.customer?.phone}</FormFeedback>
          )}
          <FormText>{t('bookingSession.customerForm.phoneDesc')}</FormText>
        </FormGroup>
      </div>
    </div>
  );
};

export default CustomerForm;
