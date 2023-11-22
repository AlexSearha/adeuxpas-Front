// REACT
import { useState } from 'react';
// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
// MUI ICONS
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// LAYOUTS
import Loading from '../../../components/Loading/Loading';
// REDUX
import { useAppSelector } from '../../../hooks/redux';
import {
  useAddOneFavoriteMutation,
  useDeleteOneFavoriteMutation,
} from '../../../store/queries/queries-favorites';
import { FavoriteApiMain } from '../../../@types';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function CardActivityChosen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const chosenActivity = useAppSelector(
    (state) => state.userSearchReducer.addressArrival
  );
  const userId = useAppSelector((state) => state.userInformationsReducer.id);
  const {
    addressArrival,
    addressDeparture,
    direction,
    departureCoordinates,
    arrivalDate,
    departureDate,
    category,
    activity,
  } = useAppSelector((state) => state.userSearchReducer);
  const [
    fetchPostFavorite,
    { data: fetchPostData, isLoading: fetchPostIsLoading },
  ] = useAddOneFavoriteMutation();
  const [fetchDeleteFavorite, { isLoading: fetchDeletIsLoading }] =
    useDeleteOneFavoriteMutation();

  // ----------------------------FUNCTIONS------------------------------//

  const handleClickPutToFavorite = () => {
    if (userId && departureCoordinates) {
      fetchPostFavorite({
        id: userId,
        address_departure: addressDeparture,
        address_destination: addressArrival?.address,
        cardinal_point: direction,
        gps_latitude: addressArrival?.latitude,
        gps_longitude: addressArrival?.longitude,
        date_of_arrival: arrivalDate,
        date_of_departure: departureDate,
        sub_category_id: chosenActivity?.sub_category_id,
        category_id: category,
        activity_id: activity,
        member_id: userId,
      } as unknown as FavoriteApiMain);
    }
  };

  const handleClickDeleteToFavorite = () => {
    if (userId && fetchPostData) {
      fetchDeleteFavorite({ userId, favoriteId: fetchPostData[0].id });
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleClickDeleteToFavorite();
      setIsFavorite(false);
    } else {
      handleClickPutToFavorite();
      setIsFavorite(true);
    }
  };
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
            {(fetchDeletIsLoading || fetchPostIsLoading) && <Loading />}
            {!isFavorite ? (
              <FavoriteBorderIcon onClick={handleToggleFavorite} />
            ) : (
              <FavoriteIcon
                sx={{ color: 'red' }}
                onClick={handleToggleFavorite}
              />
            )}
          </CardActions>
        </Card>
      )}
    </Box>
  );
}
