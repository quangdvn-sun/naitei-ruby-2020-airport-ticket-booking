import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  Label,
  Input,
  FormFeedback,
  NavLink,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../store/actions';
import './style.scss';

const initialStates = {
  full_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  address: '',
  age: '',
};

function SignUpModal() {
  const { t } = useTranslation();
  const [modalOpen, setModal] = useState(false);
  const dispatch = useDispatch();
  const { token, error } = useSelector(state => state.auth);
  const formikRef = useRef();

  const toggle = useCallback(() => {
    if (modalOpen) {
      formikRef.current.resetForm({
        values: initialStates,
        touched: null,
        errors: null,
      });
    }
    setModal(!modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    if (token) {
      toggle();
    }
    if (error === 400) {
      formikRef.current.setFieldValue('password', '', false);
      formikRef.current.setFieldValue('password_confirmation', '', false);
    }
  }, [token, error, toggle]);

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
    password: Yup.string()
      .trim()
      .min(6, t('validations.password.min'))
      .required(t('validations.password.exist')),
    password_confirmation: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], t('validations.confirmPassword')),
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
      innerRef={formikRef}
      validationSchema={validationSchema}
      onSubmit={(values, action) => {
        dispatch(signUp(values));
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
        <Fragment>
          <NavLink className="auth-link" onClick={toggle}>
            {t('signUp.title')}
          </NavLink>
          <Modal isOpen={modalOpen} toggle={toggle}>
            <ModalHeader className="modalHeader" toggle={toggle}>
              <FontAwesomeIcon icon={faUserPlus} className="icon" />
              {t('signUp.title')}
            </ModalHeader>
            <ModalBody>
              <Form className="modalForm" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label className="form-label required" for="fullName">
                    {t('signUp.fullName')}
                  </Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={values.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={50}
                    invalid={
                      touched.full_name && errors.full_name !== undefined
                    }
                    placeholder={t('signUp.fullName')}
                  />
                  {touched.full_name && errors.full_name && (
                    <FormFeedback>{errors.full_name}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="form-label required" for="email">
                    {t('signUp.email')}
                  </Label>
                  <Input
                    className="form-input"
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={255}
                    invalid={touched.email && errors.email !== undefined}
                    placeholder={t('signUp.emailPlaceholder')}
                  />
                  {touched.email && errors.email && (
                    <FormFeedback>{errors.email}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="form-label required" for="password">
                    {t('signUp.password')}
                  </Label>
                  <Input
                    className="form-input"
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={15}
                    invalid={touched.password && errors.password !== undefined}
                    placeholder={t('signUp.passwordPlaceholder')}
                  />
                  {touched.password && errors.password && (
                    <FormFeedback>{errors.password}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="form-label required" for="confirmPassword">
                    {t('signUp.confirmPassword')}
                  </Label>
                  <Input
                    className="form-input"
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={values.password_confirmation}
                    maxLength={15}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={
                      touched.password_confirmation &&
                      errors.password_confirmation !== undefined
                    }
                    placeholder={t('signUp.confirmPlaceholder')}
                  />
                  {touched.password_confirmation &&
                    errors.password_confirmation && (
                      <FormFeedback>
                        {errors.password_confirmation}
                      </FormFeedback>
                    )}
                </FormGroup>
                <FormGroup>
                  <Label className="form-label required" for="phone">
                    {t('signUp.phone')}
                  </Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.phone && errors.phone !== undefined}
                    placeholder={t('signUp.phonePlaceholder')}
                  />
                  {touched.phone && errors.phone && (
                    <FormFeedback>{errors.phone}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="form-label required" for="address">
                    {t('signUp.address')}
                  </Label>
                  <Input
                    className="form-input"
                    type="text"
                    name="address"
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.address && errors.address !== undefined}
                    placeholder={t('signUp.addressPlaceholder')}
                  />
                  {touched.address && errors.address && (
                    <FormFeedback>{errors.address}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label className="form-label required" spellCheck for="age">
                    {t('signUp.age')}
                  </Label>
                  <Input
                    className="form-input"
                    type="number"
                    name="age"
                    id="age"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.age && errors.age !== undefined}
                    placeholder={t('signUp.agePlaceholder')}
                  />
                  {touched.age && errors.age && (
                    <FormFeedback>{errors.age}</FormFeedback>
                  )}
                </FormGroup>
                <Button
                  block
                  color="primary"
                  type="submit"
                  disabled={!isValid || !values.email}
                >
                  {t('signUp.title')}
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </Fragment>
      )}
    </Formik>
  );
}

export default SignUpModal;
