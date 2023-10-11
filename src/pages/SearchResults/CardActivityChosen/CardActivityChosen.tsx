// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
// LAYOUTS
import Loading from '../../../components/Loading/Loading';
// REDUX
import { useAppSelector } from '../../../hooks/redux';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function CardActivityChosen() {
  const chosenActivity = useAppSelector(
    (state) => state.userSearchReducer.addressArrival
  );

  // ----------------------------RETURN----------------------------------//

  return (
    <Box>
      {!chosenActivity ? (
        <Loading />
      ) : (
        <Card style={{ flex: '1', maxWidth: '100%' }}>
          <CardMedia
            sx={{ height: '50%', width: '100%', justifyContent: 'center' }}
            component="img"
            height="80%"
            width="25%"
            image={chosenActivity?.photo}
            title={chosenActivity?.label}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" fontSize={15}>
              {chosenActivity?.label}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize={12}>
              {chosenActivity?.address}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">En savoir plus</Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}
