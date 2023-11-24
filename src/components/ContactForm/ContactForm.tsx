// MUI
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { validate } from 'email-validator';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// COMPONENTS
import { useLazySendEmailContactFormQuery } from '../../store/queries/queries-user';
import Loading from '../Loading/Loading';
import { AlertError, AlertSuccess } from '../Alert/AlertBox';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function ContactForm() {
  const [fetchSendEmail, { isLoading, isError, isSuccess }] =
    useLazySendEmailContactFormQuery();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Champ requis'),
      email: Yup.string()
        .email('Adresse e-mail invalide')
        .required('Email requis'),
      message: Yup.string().required('Votre message est requis'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (validate(formik.values.email)) {
        fetchSendEmail(values);
      }
      resetForm();
    },
  });

  // ----------------------------RETURN----------------------------------//

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className="register-form" sx={{ flexGrow: 1, mt: '1rem' }}>
          <TextField
            required
            id="firstname"
            name="firstname"
            label="Nom"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
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
            multiline
            id="message"
            label="Votre message"
            name="message"
            type="message"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          {isLoading && <Loading />}
          {isSuccess && <AlertSuccess message="Message envoyé !" />}
          {isError && <AlertError message="Erreur !" />}
          <Button sx={{ color: 'white' }} type="submit" variant="contained">
            Envoyer{' '}
          </Button>
        </Box>
      </form>
    </div>
  );
}
