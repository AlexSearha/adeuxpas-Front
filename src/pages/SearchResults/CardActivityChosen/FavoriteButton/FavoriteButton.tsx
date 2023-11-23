// REACT
import { useEffect, useState } from 'react';
// MUI
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// REDUX
import {
  useAddOneFavoriteMutation,
  useDeleteOneFavoriteMutation,
  useLazyGetFavoriteAddressQuery,
} from '../../../../store/queries/queries-favorites';
import { useAppSelector } from '../../../../hooks/redux';
// TYPES
import { ActivitiesMain, FavoriteApiMain } from '../../../../@types';

// INTERFACE
interface Props {
  chosenActivity: ActivitiesMain;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function FavoriteButton({ chosenActivity }: Props) {
  const [getFavoriteAddress, { data, isSuccess: getFavoriteAddressIsSuccess }] =
    useLazyGetFavoriteAddressQuery();
  const [isFavoriteExist, setIsFavoriteExist] = useState(false);
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
  const [fetchPostFavorite, { data: fetchPostData }] =
    useAddOneFavoriteMutation();
  const [fetchDeleteFavorite] = useDeleteOneFavoriteMutation();

  // ----------------------------FUNCTIONS------------------------------//

  const handleClickPutToFavorite = () => {
    if (userId && departureCoordinates) {
      console.log('handleClickPut');
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
      console.log('handleClickDelete');
      console.log('userId: ', userId);
      console.log('fetchPostData[0].id', fetchPostData[0].id);

      fetchDeleteFavorite({ userId, favoriteId: fetchPostData[0].id });
    }
  };

  const handleToggleFavorite = () => {
    if (isFavoriteExist) {
      console.log('DELETE');
      handleClickDeleteToFavorite();
      setIsFavoriteExist(false);
    } else {
      console.log('PUT');

      handleClickPutToFavorite();
      setIsFavoriteExist(true);
    }
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (userId) {
      console.log('GET Favorite Address');

      getFavoriteAddress({ userId, favoriteAddress: addressArrival?.address });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (getFavoriteAddressIsSuccess && data !== null) {
      console.log('Resultat du fetch favoris: ', data);

      setIsFavoriteExist(true);
    }
    console.log('Resultat du fetch favoris: ', data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFavoriteAddressIsSuccess]);

  useEffect(() => {
    console.log('isFavoriteExist: ', isFavoriteExist);
    console.log('fetchPostData: ', fetchPostData);
  }, [isFavoriteExist]);

  // ----------------------------RETURN----------------------------------//

  return (
    <div>
      {isFavoriteExist ? (
        <FavoriteIcon sx={{ color: 'red' }} onClick={handleToggleFavorite} />
      ) : (
        <FavoriteBorderIcon onClick={handleToggleFavorite} />
      )}
    </div>
  );
}
