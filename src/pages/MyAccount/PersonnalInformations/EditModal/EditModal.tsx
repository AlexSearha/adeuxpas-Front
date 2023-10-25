// REACT
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// MUI
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usePatchUserInfosMutation } from '../../../../store/queries/queries-user';
import { useAppSelector } from '../../../../hooks/redux';
import Loading from '../../../../components/Loading/Loading';
import BasicDatePicker from '../DatePicker/DatePicker';
import { useGetAddressListMutation } from '../../../../store/queries/queries-address';

interface EditModalProps {
  label: string;
  id: string;
  type: string;
  title: string;
  propName: string;
  isDatePicker: boolean;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function EditModal({
  label,
  id,
  type,
  title,
  propName,
  isDatePicker,
}: EditModalProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [fetchPatchEdit, { isLoading, isSuccess }] =
    usePatchUserInfosMutation();
  const [
    fetchAddress,
    { data: fetchAddressDatas, isSuccess: fetchAddressIsSuccess },
  ] = useGetAddressListMutation();
  const [isAddressesMatch, setisAddressesMatch] = useState(false);

  const userId = useAppSelector((state) => state.userInformationsReducer.id);

  // ----------------------------FUNCTIONS------------------------------//

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (dateValue !== '') {
      fetchPatchEdit({ userId, dateofbirth: dateValue });
    } else {
      fetchPatchEdit({ userId, [propName]: value });
    }
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (value.length > 7 && propName === 'address') {
      fetchAddress(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // DropDown spawn conditions
  useEffect(() => {
    if (fetchAddressDatas && fetchAddressDatas.features.length > 0) {
      const firstFeatureLabel = fetchAddressDatas.features[0].properties.label;
      if (firstFeatureLabel === value || value.length < 7) {
        setisAddressesMatch(true);
      } else {
        setisAddressesMatch(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAddressDatas, value]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ----------------------------RETURN----------------------------------//

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Modifier
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez entrer vos nouvelles coordonnées pour modifier vos
            informations
          </DialogContentText>
          {isDatePicker ? (
            <BasicDatePicker setDateValue={setDateValue} />
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id={id}
              label={label}
              type={type}
              fullWidth
              variant="standard"
              size="small"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          )}
        </DialogContent>
        <DialogContent>
          {!isAddressesMatch && fetchAddressIsSuccess && (
            <Box sx={{ border: 1, fontSize: '1.1rem', p: 1 }}>
              {fetchAddressDatas?.features.map((item) => (
                <div
                  className="dropdown-address"
                  tabIndex={0}
                  role="button"
                  onClick={() => setValue(item.properties.label)}
                  onKeyDown={() => setValue(item.properties.label)}
                  key={item.properties.id}
                >
                  {item.properties.label}
                </div>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          {isLoading ? (
            <Loading />
          ) : (
            <Button onClick={handleSubmit}>Modifier</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
