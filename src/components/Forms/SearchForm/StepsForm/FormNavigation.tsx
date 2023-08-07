import { Button } from '@mui/material';
import { FormikValues } from 'formik';

interface Props {
  // eslint-disable-next-line react/require-default-props
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

function FormNavigation({ hasPrevious, onBackClick, isLastStep }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 20,
        justifyContent: 'space-around',
      }}
    >
      {hasPrevious && (
        <Button
          size="large"
          variant="contained"
          type="button"
          onClick={onBackClick}
        >
          Précédent
        </Button>
      )}

      <Button size="large" variant="contained" type="submit">
        {isLastStep ? 'Recherche' : 'Suivant'}
      </Button>
    </div>
  );
}

export default FormNavigation;
