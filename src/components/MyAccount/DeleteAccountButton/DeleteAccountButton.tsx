// REACT
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// REDUX
import { useDeleteAccountMutation } from '../../../store/queries/queries-user';
import { useAppSelector } from '../../../hooks/redux';
import Loading from '../../Loading/Loading';
import { useLazyGetLogoutQuery } from '../../../store/queries/queries-auth';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [fetchDeleteAccount, { isSuccess, isError, isLoading }] =
    useDeleteAccountMutation();
  const [fetchlogout] = useLazyGetLogoutQuery();
  const userId = useAppSelector((state) => state.userInformationsReducer.id);
  const navigate = useNavigate();
  // ----------------------------FUNCTIONS------------------------------//

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDeleteAccount = () => {
    if (userId) {
      fetchDeleteAccount(userId);
    }
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    console.log('isSuccess: ', isSuccess);
    console.log('isError: ', isError);
    if (isSuccess) {
      setTimeout(() => {
        fetchlogout();
        navigate('/');
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // useEffect(() => {
  //   if (!userId) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId]);

  // ----------------------------RETURN----------------------------------//

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Supprimer mon compte
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-delete-account"
        aria-describedby="alert-dialog-warning-delete-account"
      >
        <DialogTitle id="alert-dialog-delete-account">
          Suppression de compte
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ATTENTION, cette action entrainera la suppression définitive de
            votre compte ainsi que toutes les options enregistrées sur celui-ci,
            êtes vous certain de vouloir poursuivre cette action ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Non
          </Button>
          <Button onClick={handleClickDeleteAccount} autoFocus>
            Oui
          </Button>
        </DialogActions>
        <DialogContent>
          {isLoading && <Loading />}
          {isSuccess && (
            <p>
              Votre compte à bien été supprimé, vous allez maintenant être
              redirigé vers la page d&apos;accueil dans 5 secondes
            </p>
          )}
          {isError && (
            <p>
              La suppression n&apos;a pas été faite du un problème technique,
              veuillez recommencer plus tard
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
