import { TextField } from '@mui/material';
import { FieldConfig, useField } from 'formik';

interface Props extends FieldConfig {
  label: string;
}

function InputField({ label, ...props }: Props) {
  const [field, meta] = useField(props);
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
