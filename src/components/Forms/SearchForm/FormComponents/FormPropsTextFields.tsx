// MUI
import TextField from '@mui/material/TextField';
// FORMIK
import { FieldConfig, useField, useFormikContext } from 'formik';
// TYPE
interface Props extends FieldConfig {
  label: string;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function SelectNumberField({ label, ...props }: Props) {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  // ----------------------------RETURN----------------------------------//

  return (
    <TextField
      type="number"
      sx={{
        border: {
          borderColor: 'blue',
          backgroundColor: '#fff',
          borderRadius: '5px',
          width: 200,
        },
      }}
      label={label}
      value={field.value}
      onChange={(e) => {
        setFieldValue(props.name, e.target.value);
      }}
      inputProps={{ min: 0, max: 10 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
