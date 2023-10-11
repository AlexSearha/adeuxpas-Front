// MUI
import { TextField } from '@mui/material';
// FORMIK
import { FieldConfig, useField } from 'formik';
// TYPE
interface Props extends FieldConfig {
  label: string;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function InputField({ label, ...props }: Props) {
  const [field, meta] = useField(props);

  // ----------------------------RETURN----------------------------------//

  return (
    <TextField
      fullWidth
      label={label}
      {...props}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
}

export default InputField;
