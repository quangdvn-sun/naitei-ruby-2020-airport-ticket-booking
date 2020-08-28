import React from 'react';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const Message = ({ text, type }) => {
  return (
    <div className="toastMessage">
      <FontAwesomeIcon
        className="icon"
        icon={type == 'error' ? faExclamationCircle : faCheck}
      />
      <span className="text">{text}</span>
    </div>
  );
};

const ToastAlert = () => {
  return <ToastContainer autoClose={2000}/>;
};

export { ToastAlert, Message };
