// MUI
import { Box } from '@mui/material';
// CSS
import './styles.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function Banner() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '150%',
        padding: '10px',
      }}
    >
      <h1 className="slogan">
        Partez en week-end à moins de 200km de chez vous.
      </h1>
    </Box>
  );
}

export default Banner;
