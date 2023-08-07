import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FieldConfig, useField, useFormikContext } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

import {
  fetchAddresses,
  getGpsCoordinates,
} from '../../../../store/reducers/addresses';
import { Root } from '../../../../@types';

import './style.scss';

interface Props extends FieldConfig {
  label: string;
}

export default function AddressTextField({ label, ...props }: Props) {
  // const isLoading = useAppSelector((state) => state.user.isLoading);
  const addressListResult = useAppSelector<Root>(
    (state) => state.address.addresses
  );
  const [isApiResponse, setIseApiResponse] = useState<boolean>(false);
  const [isAddressesMatch, setisAddressesMatch] = useState<boolean>(true);
  const [field, meta] = useField(props);

  // Dispatch
  const dispatch = useAppDispatch();

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    function getCoordinates() {
      if (!isAddressesMatch) {
        const latitude = addressListResult.features[0].geometry.coordinates;
        console.log('REDUX: envoi des coordonnées dans le payload');
        dispatch(getGpsCoordinates(latitude));
      }
    }
    getCoordinates();
  }, [isAddressesMatch, dispatch, addressListResult.features]);

  // Fetch Address API
  useEffect(() => {
    dispatch(fetchAddresses(field.value));
  }, [dispatch, field.value]);

  // DropDown spawn conditions
  useEffect(() => {
    function addressApiTestLength() {
      if (addressListResult.features !== undefined) {
        if (addressListResult.features.length > 0) {
          setIseApiResponse(true);
        } else {
          setIseApiResponse(false);
        }
      }
    }

    function matchAddresses() {
      if (addressListResult.features !== undefined) {
        if (addressListResult.features.length > 0) {
          const isMatching = addressListResult.features.find(
            (address) => field.value === address.properties.label
          );
          if (isMatching !== undefined) {
            setisAddressesMatch(false);
            console.log(addressListResult.features[0].geometry.coordinates);
          } else {
            setisAddressesMatch(true);
          }
        }
      }
    }

    addressApiTestLength();
    matchAddresses();
  }, [addressListResult, field.value]);

  return (
    <div className="address-textfield">
      <TextField
        fullWidth
        variant="outlined"
        sx={{
          border: {
            borderColor: 'blue',
            backgroundColor: '#fff',
            borderRadius: '5px',
          },
        }}
        label={label}
        {...props}
        {...field}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
      {isApiResponse && isAddressesMatch && (
        <div className="dropdown">
          <Box sx={{ border: 1, fontSize: '1.1rem', p: 1 }}>
            {addressListResult.features?.map((item) => (
              <div
                className="dropdown-address"
                onClick={() => setFieldValue(field.name, item.properties.label)}
                onKeyDown={() =>
                  setFieldValue(field.name, item.properties.label)
                }
                tabIndex={0}
                role="button"
                key={item.properties.id}
              >
                {item.properties.label}
              </div>
            ))}
          </Box>
        </div>
      )}
    </div>
  );
}
