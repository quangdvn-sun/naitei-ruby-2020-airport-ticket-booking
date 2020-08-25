import React from 'react';
import { Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import ProgressTab from './ProgressTab';
import './styles.scss';

const ProgressTabs = ({ activeTab }) => {
  const { t } = useTranslation();

  return (
    <Row className="progressTabs">
      {Object.values(t('bookingSession.progressTabs')).map((item, index) => (
        <ProgressTab
          label={item}
          key={index}
          index={index + 1}
          active={activeTab === index}
        />
      ))}
    </Row>
  );
};

export default ProgressTabs;
