import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FieldConfig, useFormikContext } from 'formik';
import dayjs from 'dayjs';

interface Props extends FieldConfig {
  label: string;
}

export default function DatePickerModel({ label, ...props }: Props) {
  const { setFieldValue } = useFormikContext();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFieldValue(props.name, dayjs(date).format('DD/MM/YYYY'));
    } else {
      setFieldValue(props.name, ''); // Si aucune date n'est sélectionnée, vous pouvez choisir de définir une valeur vide ou null selon vos besoins.
    }
  };

  return (
    <DatePicker
      disablePast
      sx={{
        border: {
          borderColor: 'blue',
          backgroundColor: '#fff',
          borderRadius: '5px',
        },
      }}
      label={label}
      onChange={handleDateChange}
    />
  );
}
