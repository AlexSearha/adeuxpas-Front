// REACT
import { useNavigate } from 'react-router';
// MUI
import { Button } from '@mui/material';
// CSS
import './style.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function PageNotFound() {
  const navigate = useNavigate();

  // ----------------------------FUNCTIONS------------------------------//

  const handleClick = () => {
    navigate('/');
  };

  // ----------------------------RETURN----------------------------------//

  return (
    <>
      <h1>404</h1>

      <h3>Vous êtes vous perdu ?</h3>
      <p>la page que vous cherchez n&apos;existe pas </p>
      <Button variant="contained" onClick={handleClick}>
        Retour
      </Button>
    </>
  );
}

export default PageNotFound;
