// REACT
import React, { useEffect, useState } from 'react';
// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// REDUX
import { usePostResetPasswordMutation } from '../../../../store/queries/queries-auth';
// COMPONENTS
import { AlertError, AlertSuccess } from '../../../Alert/AlertBox';
import Loading from '../../../Loading/Loading';
// Interace
interface ResetPasswordModalProps {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}
// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function ResetPasswordModal({
  setCloseModal,
}: ResetPasswordModalProps) {
  const [open, setOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [
    fetchResetPassword,
    {
      isLoading: fetchResetPasswordIsLoading,
      isSuccess: fetchResetPasswordIsSuccess,
      isError: fetchResetPasswordIsError,
    },
  ] = usePostResetPasswordMutation();

  // ----------------------------FUNCTIONS------------------------------//

  const handleClickOpen = () => {
    setOpen(true);
    setCloseModal(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchResetPassword(emailValue);
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (fetchResetPasswordIsSuccess) {
      setTimeout(() => {
        setOpen(false);
        setCloseModal(false);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchResetPasswordIsSuccess]);

  // ----------------------------RETURN----------------------------------//

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        Mot de passe oublié
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Réinitialisation de votre mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Merci de mentionner l&apos;adresse email qui est associée à votre
            compte, vous reçevrez alors un e-mail de reinitialisation de votre
            mot de passe.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Adresse email"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Réinitialiser</Button>
        </DialogActions>
        {fetchResetPasswordIsLoading && <Loading />}
        {fetchResetPasswordIsSuccess && (
          <AlertSuccess message="Un e-mail de reinitialisation vient de vous être envoyé" />
        )}
        {fetchResetPasswordIsError && (
          <AlertError
            message={`Aucun compte ne correspond à l'adresse mail ${emailValue}`}
          />
        )}
      </Dialog>
    </>
  );
}
