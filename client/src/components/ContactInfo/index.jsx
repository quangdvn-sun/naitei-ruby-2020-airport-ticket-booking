import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import { Row, Col, Label, FormGroup, Input } from 'reactstrap';

function ContactInfo() {
  const { t, i18n } = useTranslation();
  
  return (
    <Fragment>
      <div className='contact-info'>
        <Row form>
          <Label className='form-label' for='name'>
            {t('contactInfo.title')}
          </Label>
        </Row>
        <Row form>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='name'>
                {t('contactInfo.name')}
              </Label>
              <Input className='form-control' type='text' placeholder='Name'></Input>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='email'>
                {t('contactInfo.email')}
              </Label>
              <Input type='email' className='form-control' placeholder='Email'></Input>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md='6'>
            <Label className='form-label' for='tel'>
              {t('contactInfo.telephone')}
            </Label>
            <Input className='form-control' type='text' pattern='^[0-9\-\+]{9,15}$'></Input>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='address'>
                {t('contactInfo.address')}
              </Label>
              <Input className='form-control' type='text' placeholder='Address'></Input>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='birth'>
                {t('contactInfo.birth')}
              </Label>
              <Input className='form-control' type='date'/>
            </FormGroup>
          </Col>
          <Col md='6'>
            <FormGroup>
              <Label className='form-label' for='country'>
                {t('contactInfo.country')}
              </Label>
              <Input className='form-control' type='text' placeholder='Country'></Input>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default ContactInfo;
