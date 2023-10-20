// REACT
import { useEffect, useState } from 'react';
// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // Typography,
  createTheme,
} from '@mui/material';
import TextField from '@mui/material/TextField';
// EMAIL
import { validate } from 'email-validator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// REDUX
import { usePostLoginMutation } from '../../../store/queries/queries-auth';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateUserInformations } from '../../../store/reducers/user';
// CSS
// import './style.scss';

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

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(
    (state) => state.userInformationsReducer
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fetchLogin, { data: dataLogin, isSuccess: isSuccessLogin }] =
    usePostLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: 'testest@hotmail.fr',
      password: 'coucou',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email requis'),
      password: Yup.string().required('Mot de passe requis'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (validate(formik.values.email)) {
        console.log('values: ', values);
        fetchLogin(values);
      }
      resetForm();
    },
  });

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (dataLogin && dataLogin.refreshToken) {
      const userInfosToUpdate = dataLogin.userInformations;
      dispatch(updateUserInformations(userInfosToUpdate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLogin]);

  useEffect(() => {
    if (userId === null) {
      handleClose();
    }
  }, [userId]);
  // ----------------------------RETURN----------------------------------//

  return (
    <div className="buttons">
      {userId ? (
        <Button
          className="button"
          variant="contained"
          size="small"
          color="secondary"
          sx={{ m: 0.5, fontSize: 10 }}
          // onClick={handleOpen}
        >
          Mon Compte
        </Button>
      ) : (
        <>
          <Button
            className="button"
            variant="contained"
            size="small"
            color="secondary"
            sx={{ m: 0.5, fontSize: 10 }}
            onClick={handleOpen}
          >
            Connexion
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Bonjour !</DialogTitle>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <Box className="register-form" sx={{ flexGrow: 1, mt: '1rem' }}>
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Button
                    sx={{ color: 'white' }}
                    type="submit"
                    variant="contained"
                  >
                    se connecter{' '}
                  </Button>
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>annuler</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
