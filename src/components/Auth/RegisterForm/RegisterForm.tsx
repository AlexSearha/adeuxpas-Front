// REACT
import { useState } from 'react';
// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import TextField from '@mui/material/TextField';
// EMAIL
import { validate } from 'email-validator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// REDUX
import {
  useLazyGetLogoutQuery,
  usePostRegisterMutation,
} from '../../../store/queries/queries-auth';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { resetUserInformations } from '../../../store/reducers/user';
// CSS
import './style.scss';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(
    (state) => state.userInformationsReducer
  );
  const [fetchRegister, { data: registerData, isSuccess: isSuccessRegister }] =
    usePostRegisterMutation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fetchLogout] = useLazyGetLogoutQuery();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      email: '',
      password: '',
      checkpass: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Champ requis'),
      email: Yup.string()
        .email('Adresse e-mail invalide')
        .required('Email requis'),
      password: Yup.string().required('Mot de passe requis'),
      checkpass: Yup.string()
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
        .required('Confirmation mot de passe requise'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (
        formik.values.password === formik.values.checkpass &&
        validate(formik.values.email)
      ) {
        fetchRegister(values);
      } else {
        alert(
          'Veuillez corriger les erreurs avant de soumettre le formulaire.'
        );
      }
      resetForm();
    },
  });

  // ----------------------------FUNCTIONS------------------------------//

  const handleLogOut = () => {
    handleClose();
    dispatch(resetUserInformations());
    fetchLogout();
  };

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
          onClick={handleLogOut}
        >
          Deconnexion
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
            Inscription
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Créer votre compte</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Et si on faisait connaissance ?
              </DialogContentText>
              <form onSubmit={formik.handleSubmit}>
                <Box className="register-form" sx={{ flexGrow: 1, mt: '1rem' }}>
                  <TextField
                    required
                    id="firstname"
                    name="firstname"
                    label="Pseudo"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                  />
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
                    id="password"
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
                  <TextField
                    id="check-password"
                    label="Confirmation mot de passe"
                    name="checkpass"
                    type="password"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.checkpass}
                    error={
                      formik.touched.checkpass &&
                      Boolean(formik.errors.checkpass)
                    }
                    helperText={
                      formik.touched.checkpass && formik.errors.checkpass
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
