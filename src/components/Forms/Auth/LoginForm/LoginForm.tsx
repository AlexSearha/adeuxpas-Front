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
import { login } from '../../../../store/reducers/users';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const errorState = useAppSelector((state) => state.user.error);

  // dispatch actions
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: 'alex@hotmail.com',
      password: 'coucou',
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
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (errorState === 'Request failed with status code 401') {
      setErrorMessage('Votre e-mail ou votre mot de passe est incorrect');
    } else {
      setErrorMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <DialogTitle>Bonjour !</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box className="register-form" sx={{ flexGrow: 1, mt: '1rem' }}>
              {!!errorState && <Alert severity="error">{errorMessage}</Alert>}
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
