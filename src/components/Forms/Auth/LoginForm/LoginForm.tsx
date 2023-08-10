import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  createTheme,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { validate } from 'email-validator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { login, setIsLoggin } from '../../../../store/reducers/users';
import { LinearDeterminate } from '../../../Loading/Loading';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a0c695ff',
      contrastText: '#faf9f6ff',
    },
    secondary: {
      main: '#faf9f6ff',
      contrastText: '#a0c695ff',
    },
  },
});

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('');
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
    setIsAlert(false);
  };
  const handleClose = () => setOpen(false);
  const errorState = useAppSelector((state) => state.user.error);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email requis'),
      password: Yup.string().required('Mot de passe requis'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (validate(formik.values.email)) {
        await dispatch(login(values));
        try {
          setAlertType('success');
          setAuthMessage('Vous êtes desormais connecté');
          setIsAlert(true);
          setOpen(true);
          setTimeout(() => {
            dispatch(setIsLoggin());
            resetForm();
          }, 3500);
        } catch (error) {
          setAlertType('error');
          setAuthMessage('Veuillez recommencer');
        }
      }
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-extra-boolean-cast
    if (errorState === 'Request failed with status code 401') {
      setAlertType('error');
      setAuthMessage('Votre e-mail ou votre mot de passe est incorrect');
      setIsAlert(true);
    }
  }, [errorState]);

  return (
    <div className="buttons">
      <Button
        className="button"
        variant="contained"
        size="small"
        color="secondary"
        sx={{ m: 0.5, fontSize: 10 }}
        onClick={handleOpen}
      >
        Se connecter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box className="register-form" sx={{ flexGrow: 1, mt: '1rem' }}>
              {isAlert && <Alert severity={alertType}>{authMessage}</Alert>}
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="filled-password"
                label="Mot de passe"
                name="password"
                type="password"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button sx={{ color: 'white' }} type="submit" variant="contained">
                se connecter{' '}
              </Button>
              // TODO:
              <LinearDeterminate ms={3500} />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>annuler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
