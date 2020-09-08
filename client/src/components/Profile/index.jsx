import React, { useState } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import EditInfo from './EditInfo';
import BookingHistory from './BookingHistory';
import './styles.scss';

const Profile = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  return (
    <Row className="profile">
      <Col xs="2">
        <ListGroup>
          <ListGroupItem active={tab === 0} action onClick={() => setTab(0)}>
            {t('profilePage.basicInfo')}
          </ListGroupItem>
          <ListGroupItem active={tab === 1} action onClick={() => setTab(1)}>
            {t('profilePage.bookingHistory')}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col xs={tab === 0 ? '9' : '10'}>
        {tab === 0 ? <EditInfo /> : <BookingHistory />}
      </Col>
    </Row>
  );
};

export default Profile;
