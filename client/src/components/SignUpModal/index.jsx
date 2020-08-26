import React from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'reactstrap';

function SignUpModal() {
  const { t } = useTranslation();

  return <NavLink className="auth-link">{t('signUp.title')}</NavLink>;
}

export default SignUpModal;
