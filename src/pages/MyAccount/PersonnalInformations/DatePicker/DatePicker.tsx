// MUI
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, frFR } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface Props {
  setDateValue: React.Dispatch<React.SetStateAction<string>>;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function BasicDatePicker({ setDateValue }: Props) {
  const [value, setValue] = useState<dayjs.Dayjs | null>(null);

  // ----------------------------FUNCTIONS------------------------------//
  const handleChange = (date: Date | dayjs.Dayjs | null) => {
    if (date) {
      setValue(dayjs(date));
      setDateValue(dayjs(date).format());
    } else {
      setDateValue('');
    }
  };

  // ----------------------------RETURN----------------------------------//

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="fr"
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date de naissance"
          value={value}
          onChange={handleChange}
          disableFuture
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
