import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  DropdownMenu,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import logo from '../../assets/images/logo.png';
import './styles.scss';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Fragment>
      <Navbar color='light' expand='sm' light>
        <NavbarBrand href='/'>
          <img src={logo} width='130' height='60' />
        </NavbarBrand>
        <Collapse navbar>
          <Nav className='ml-auto' navbar>
            <NavItem className='nav-item'>
              <NavLink href='#'>{t('header.help')}</NavLink>
            </NavItem>

            <NavItem className='nav-item'>
              <NavLink href='#'>{t('header.signin')}</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {t('header.languages')}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => changeLanguage('en')}>
                  {t('header.eng')}
                </DropdownItem>
                <DropdownItem onClick={() => changeLanguage('vi')}>
                  {t('header.viet')}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Header;
