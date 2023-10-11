// MUI
import { Button } from '@mui/material';
// FORMIK
import { FormikValues } from 'formik';
// TYPE
interface Props {
  // eslint-disable-next-line react/require-default-props
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

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
