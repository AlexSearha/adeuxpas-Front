// REACT
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// MUI
import { Button, TextField } from '@mui/material';
import { AlertError, AlertSuccess } from '../../components/Alert/AlertBox';
import { usePatchResetPasswordMutation } from '../../store/queries/queries-auth';
import Loading from '../../components/Loading/Loading';
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
  const [passwordValue, setPasswordValue] = useState('');
  const [checkPasswordValue, setCheckPasswordValue] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [
    fetchResetPassword,
    {
      isLoading: fetchResetIsLoading,
      isSuccess: fetchResetIsSuccess,
      isError: fetchResetIsError,
    },
  ] = usePatchResetPasswordMutation();
  const navigate = useNavigate();

  // ----------------------------FUNCTIONS------------------------------//

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const bothPasswords = passwordValue || checkPasswordValue;
      if (bothPasswords.length === 0) {
        setErrorMessage(
          `Les mots de passe doivent être au moins de 8 characteres`
        );
        return;
      }
      const data: DataProps = {
        password: passwordValue,
        token,
      };
      await fetchResetPassword(data);
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

  useEffect(() => {
    if (fetchResetIsSuccess) {
      setSuccessMessage(
        'Votre mot de passe à été modifier, veuillez vous identifier'
      );
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } else if (fetchResetIsError) {
      setFetchErrorMessage(
        'Le delai de modification de votre mot de passe est expiré, veuillez reitérer votre demande'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchResetIsSuccess, fetchResetIsError]);

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
        onFocus={handleFocus}
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
      {fetchResetIsSuccess && <AlertSuccess message={successMessage} />}
      {fetchResetIsLoading && <Loading />}
      {fetchResetIsError && <AlertError message={fetchErrorMessage} />}
    </form>
  );
}
