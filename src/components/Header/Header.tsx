import React from 'react';
import LoginForm from '../Auth/LoginForm/LoginForm';
import RegisterForm from '../Auth/RegisterForm/RegisterForm';
// import LoginButton from '../LoginButton/LoginButton';
// import SignUpButton from '../SignUpButton/SignUpButton';

import './styles.scss';

function Header() {
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <a href="/">àdeuxpas.com </a>
        </div>
        <div className="header__buttons">
          <LoginForm />
          <RegisterForm />
        </div>
      </header>
    </div>
  );
}

export default Header;
