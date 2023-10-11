// LAYOUTS
import LoginForm from '../Auth/LoginForm/LoginForm';
import RegisterForm from '../Auth/RegisterForm/RegisterForm';
// CSS
import './styles.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

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
