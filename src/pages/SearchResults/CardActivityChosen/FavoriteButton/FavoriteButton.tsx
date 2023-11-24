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
interface FavoriteButtonProps {
  chosenActivity: ActivitiesMain;
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function FavoriteButton({
  chosenActivity,
}: FavoriteButtonProps) {
  const [
    getFavoriteAddress,
    { data: getFavoriteAddressData, isSuccess: getFavoriteAddressIsSuccess },
  ] = useLazyGetFavoriteAddressQuery();
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
  const [fetchPostFavorite] = useAddOneFavoriteMutation();
  const [fetchDeleteFavorite] = useDeleteOneFavoriteMutation();

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
    if (userId && getFavoriteAddressData?.id) {
      fetchDeleteFavorite({ userId, favoriteId: getFavoriteAddressData.id });
    }
  };

  const handleToggleFavorite = () => {
    if (isFavoriteExist) {
      handleClickDeleteToFavorite();
      setIsFavoriteExist(false);
    } else {
      handleClickPutToFavorite();
      setIsFavoriteExist(true);
    }
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (userId) {
      getFavoriteAddress({ userId, favoriteAddress: addressArrival?.address });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (getFavoriteAddressIsSuccess && getFavoriteAddressData !== null) {
      setIsFavoriteExist(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFavoriteAddressIsSuccess]);

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
