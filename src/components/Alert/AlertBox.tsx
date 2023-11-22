// MUI
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface AlertMessageProps {
  message: string;
}

export function AlertError({ message }: AlertMessageProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{message}</Alert>
    </Stack>
  );
}

export function AlertWarning({ message }: AlertMessageProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">{message}</Alert>
    </Stack>
  );
}

export function AlertInfo({ message }: AlertMessageProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="info">{message}</Alert>
    </Stack>
  );
}

export function AlertSuccess({ message }: AlertMessageProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{message}</Alert>
    </Stack>
  );
}
