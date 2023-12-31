// REACT
import { useEffect, useState } from 'react';
// MUI
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
// FORMIK
import { FieldConfig, useField, useFormikContext } from 'formik';
// API
import { useGetAddressListMutation } from '../../../../store/queries/queries-address';
// CSS
import './style.scss';
// Interface
interface Props extends FieldConfig {
  label: string;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function AddressTextField({ label, ...props }: Props) {
  const [fetchAddress, { data, isSuccess }] = useGetAddressListMutation({
    fixedCacheKey: 'departureDatas',
  });
  const [isAddressesMatch, setisAddressesMatch] = useState(false);
  const [field, meta] = useField(props);
  const [value, setValue] = useState('');

  const { setFieldValue } = useFormikContext();

  // ----------------------------FUNCTIONS------------------------------//

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value);
    setValue(event.target.value);
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (value.length > 7) {
      fetchAddress(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // DropDown spawn conditions
  useEffect(() => {
    if (data && data.features.length > 0) {
      const firstFeatureLabel = data.features[0].properties.label;
      if (firstFeatureLabel === field.value || value.length < 7) {
        setisAddressesMatch(false);
      } else {
        setisAddressesMatch(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, field.value]);

  // ----------------------------RETURN----------------------------------//

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
        onChange={handleChange}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
      {isSuccess && isAddressesMatch && (
        <div className="dropdown">
          <Box sx={{ border: 1, fontSize: '1.1rem', p: 1 }}>
            {data?.features?.map((item) => (
              <div
                className="dropdown-address"
                onClick={() => {
                  setFieldValue(field.name, item.properties.label);
                  setValue(item.properties.label);
                }}
                onKeyDown={() => {
                  setFieldValue(field.name, item.properties.label);
                  setValue(item.properties.label);
                }}
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
