import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import LoginForm from '../Forms/Auth/LoginForm/LoginForm';
import RegisterForm from '../Forms/Auth/RegisterForm/RegisterForm';
import { logout } from '../../store/reducers/users';
import './styles.scss';

function NotConnected() {
  useEffect(() => {
    console.log('les composants login et register se charge');
  }, []);
  return (
    <>
      <LoginForm />
      <RegisterForm />
    </>
  );
}

function Connected() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Button
        size="small"
        color="secondary"
        onClick={() => navigate('/myaccount')}
        variant="contained"
        sx={{ fontSize: 10 }}
      >
        Mon Compte
      </Button>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={() => dispatch(logout())}
        sx={{ fontSize: 10 }}
      >
        Se Déconnecter
      </Button>
    </Stack>
  );
}

function Header() {
  const isLogged = useAppSelector((state) => state.user.isLogged);
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">àdeuxpas.com</Link>
      </div>
      <div className="header__buttons">
        {isLogged ? <Connected /> : <NotConnected />}
      </div>
    </header>
  );
}

export default Header;
