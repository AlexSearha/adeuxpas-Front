// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// REDUX
import { useDeleteOneFavoriteMutation } from '../../../../store/queries/queries-favorites';
// TYPES
import { FavoriteApiMain } from '../../../../@types';
import { useAppSelector } from '../../../../hooks/redux';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function FavoriteCard({ values }: { values: FavoriteApiMain }) {
  const { address_destination: text, id: favoriteId } = values;
  const userId = useAppSelector((state) => state.userInformationsReducer.id);
  const [fetchDelete] = useDeleteOneFavoriteMutation();

  // ----------------------------FUNCTIONS------------------------------//
  const handleClickDelete = () => {
    if (userId && favoriteId) {
      fetchDelete({ userId, favoriteId });
    }
  };

  // ----------------------------RETURN----------------------------------//

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Détails</Button>
        <Button size="small" onClick={handleClickDelete}>
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
}
