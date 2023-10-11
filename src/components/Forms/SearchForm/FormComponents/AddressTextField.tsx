// REACT
import { useEffect, useState } from 'react';
// MUI
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
// FORMIK
import { FieldConfig, useField, useFormikContext } from 'formik';
// API
import { useGetAddressListMutation } from '../../../../store/rtk/rtk-address';
// CSS
import './style.scss';

interface Props extends FieldConfig {
  label: string;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function AddressTextField({ label, ...props }: Props) {
  const [getAddressData, { data, error, isLoading, isSuccess }] =
    useGetAddressListMutation({
      fixedCacheKey: 'departureDatas',
    });
  const [isAddressesMatch, setisAddressesMatch] = useState<boolean>(false);
  const [field, meta] = useField(props);

  const { setFieldValue } = useFormikContext();

  // ----------------------------FUNCTIONS------------------------------//

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, event.target.value);
    getAddressData(event.target.value);
  };

  // ----------------------------USEEFFECTS------------------------------//

  // DropDown spawn conditions
  useEffect(() => {
    if (data && data.features.length > 0) {
      const firstFeatureLabel = data.features[0].properties.label;
      if (firstFeatureLabel === field.value) {
        setisAddressesMatch(true);
      } else {
        setisAddressesMatch(false);
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
      {isSuccess && !isAddressesMatch && (
        <div className="dropdown">
          <Box sx={{ border: 1, fontSize: '1.1rem', p: 1 }}>
            {data?.features?.map((item) => (
              <div
                className="dropdown-address"
                onClick={() => {
                  setFieldValue(field.name, item.properties.label);
                }}
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
