import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import { updateInfo } from '../../../store/actions';

const EditInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const initialStates = {
    id: user.id,
    full_name: user.full_name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    age: user.age || '',
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string()
      .trim()
      .min(5, t('validations.fullName.min'))
      .required(t('validations.fullName.exist')),
    email: Yup.string()
      .label('Email')
      .email()
      .trim()
      .required(t('validations.email')),
    address: Yup.string().trim().required(t('validations.address')),
    phone: Yup.string()
      .trim()
      .matches(/^[0-9]{7,11}$/, t('validations.phoneNumber.format'))
      .required(t('validations.phoneNumber.exist')),
    age: Yup.number()
      .integer(t('validations.age.integer'))
      .min(1, t('validations.age.positive'))
      .required(t('validations.age.exist')),
  });

  return (
    <Formik
      initialValues={initialStates}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, action) => {
        dispatch(updateInfo(values));
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        errors,
        touched,
      }) => ( 
        <Card>
          <CardBody>
            <Row>
              <Col xs="12">
                <h4>{t('editProfile.title')}</h4>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Form onSubmit={handleSubmit} className="profileForm">
                  <FormGroup row>
                    <Label
                      className="form-label required"
                      for="full_name"
                      sm="4"
                    >
                      {t('editProfile.fullName')}
                    </Label>
                    <Col sm="8">
                      <Input
                        type="text"
                        name="full_name"
                        id="full_name"
                        placeholder={t('editProfile.namePlaceholder')}
                        value={values.full_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={50}
                        invalid={
                          touched.full_name && errors.full_name !== undefined
                        }
                      />
                      {touched.full_name && errors.full_name && (
                        <FormFeedback>{errors.full_name}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="form-label required" for="email" sm="4">
                      {t('editProfile.email')}
                    </Label>
                    <Col sm="8">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={255}
                        invalid={touched.email && errors.email !== undefined}
                        placeholder={t('editProfile.emailPlaceholder')}
                      />
                      {touched.email && errors.email && (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="form-label required" for="phone" sm="4">
                      {t('editProfile.phone')}
                    </Label>
                    <Col sm="8">
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder={t('editProfile.phonePlaceholder')}
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.phone && errors.phone !== undefined}
                      />
                      {touched.phone && errors.phone && (
                        <FormFeedback>{errors.phone}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="form-label required" for="address" sm="4">
                      {t('editProfile.address')}
                    </Label>
                    <Col sm="8">
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={
                          touched.address && errors.address !== undefined
                        }
                        placeholder={t('editProfile.addressPlaceholder')}
                      />
                      {touched.address && errors.address && (
                        <FormFeedback>{errors.address}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="form-label required" for="age" sm="4">
                      {t('editProfile.age')}
                    </Label>
                    <Col sm="8">
                      <Input
                        type="number"
                        name="age"
                        id="age"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={touched.age && errors.age !== undefined}
                        placeholder={t('editProfile.agePlaceholder')}
                      />
                      {touched.age && errors.age && (
                        <FormFeedback>{errors.age}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={{ size: 8, offset: 4 }}>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={!isValid || !values.email}
                      >
                        {t('editProfile.update')}
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </Formik>
  );
};

export default EditInfo;
