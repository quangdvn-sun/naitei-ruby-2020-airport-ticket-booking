import React from 'react';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import EditInfo from './EditInfo';
import './styles.scss';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <Row className="profile">
      <Col xs="3">
        <ListGroup>
          <ListGroupItem active action>
            {t('profilePage.basicInfo')}
          </ListGroupItem>
          <ListGroupItem action>
            {t('profilePage.bookingHistory')}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col xs="9">
        <EditInfo />
      </Col>
    </Row>
  );
};

export default Profile;
