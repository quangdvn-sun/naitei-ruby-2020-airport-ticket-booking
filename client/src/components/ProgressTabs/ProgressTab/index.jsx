import React from 'react';
import { Col } from 'reactstrap';
import './styles.scss';

const ProgressTab = ({ label, index, active }) => {
  return (
    <Col className={`progressTab ${active ? 'active' : ''}`}>
      <span className="index">{index}</span>
      <span>{label}</span>
    </Col>
  );
};

export default ProgressTab;
