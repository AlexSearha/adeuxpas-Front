import TextField from '@mui/material/TextField';
import { FieldConfig, useField, useFormikContext } from 'formik';

interface Props extends FieldConfig {
  label: string;
}

export default function SelectNumberField({ label, ...props }: Props) {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

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
