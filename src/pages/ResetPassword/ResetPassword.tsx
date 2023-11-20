// REACT
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// MUI
import { Button, TextField } from '@mui/material';
import { AlertSuccess } from '../../components/Alert/AlertBox';
import { usePatchResetPasswordMutation } from '../../store/queries/queries-auth';
// INTERFACES
interface DataProps {
  password: string;
  token: string | undefined;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [checkPasswordValue, setCheckPasswordValue] = useState<string>('');
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [
    fetchResetPassword,
    { isLoading: fetchResetIsLoading, isSuccess: fetchResetIsSuccess },
  ] = usePatchResetPasswordMutation();
  const navigate = useNavigate();

  // ----------------------------FUNCTIONS------------------------------//

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: DataProps = {
      password: passwordValue,
      token,
    };
    try {
      const result = await fetchResetPassword(data);
      if (result) {
        setSuccessMessage(
          'Votre mot de passe à été modifier, veuillez vous identifier'
        );
        setTimeout(() => {
          navigate('/connexion');
        }, 5000);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPasswordValue(value);
    } else if (name === 'confirmPassword') {
      setCheckPasswordValue(value);
    }
  };

  const handleFocus = () => {
    setErrorState(false);
    setErrorMessage('');
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (passwordValue !== checkPasswordValue) {
      setErrorState(true);
      setErrorMessage('Les mots de passes doivent correspondre');
    } else {
      handleFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkPasswordValue, passwordValue]);

  // ----------------------------RETURN----------------------------------//

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="password"
        name="password"
        label="Nouveau mot de passe"
        value={passwordValue}
        inputProps={{ minLength: 8 }}
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="Confirmez mot de passe"
        value={checkPasswordValue}
        onChange={handleChange}
        onFocus={handleFocus}
        error={errorState}
        helperText={errorMessage}
      />
      <Button variant="contained" type="submit">
        Reinitialiser
      </Button>
      <AlertSuccess message={successMessage} />
    </form>
  );
}
