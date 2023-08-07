import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux';
import { Feature } from '../../../@types';

export default function CardActivityChosen() {
  const chosenActivity = useAppSelector(
    (state) => state.search.activityAddress
  );
  const [activity, setActivity] = useState<Feature[]>([]);

  async function handleActivity() {
    try {
      setActivity(chosenActivity);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    handleActivity();
    console.log(chosenActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenActivity, activity]);

  return (
    // <Box>
      <Card style={{ flex: "1", maxWidth: "100%" }}>
        <CardMedia
          sx={{ height: '50%', width: '100%', justifyContent: 'center' }}
          component="img"
          height="80%"
          width="25%"
          image={activity.photo}
          title={activity.nom}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" fontSize={15}>
            {activity.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={12}>
            {activity.address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">En savoir plus</Button>
        </CardActions>
      </Card>
    // </Box>
  );
}
