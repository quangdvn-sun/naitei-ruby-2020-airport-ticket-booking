import React from 'react';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const ProgressTab = ({ label, index, active, completed }) => {
  return (
    <Col className={`progressTab ${active ? 'active' : ''}`}>
      <span className="index">
        {completed ? (
          <FontAwesomeIcon className="completed" icon={faCheck} />
        ) : (
          index
        )}
      </span>
      <span>{label}</span>
    </Col>
  );
};

export default ProgressTab;
