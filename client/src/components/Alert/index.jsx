import React from 'react';
import { Row, Col } from 'reactstrap';
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
    <Row className="toastMessage">
      <Col xs="2">
        <FontAwesomeIcon
          className="icon"
          icon={type === 'error' ? faExclamationCircle : faCheck}
        />
      </Col>
      <Col xs="10" className="text">
        {text}
      </Col>
    </Row>
  );
};

const ToastAlert = () => {
  return <ToastContainer autoClose={2000}/>;
};

export { ToastAlert, Message };
