// REACT
import { Link } from 'react-router-dom';
// MUI
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// ICONS
import Loading from '../../../components/Loading/Loading';
import FavoriteCard from './FavoriteCard/FavoriteCard';
// REDUX
import { useAppSelector } from '../../../hooks/redux';
import { useGetAllFavoritesQuery } from '../../../store/queries/queries-favorites';
// CSS
import './style.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function Favoris() {
  const userId = useAppSelector((state) => state.userInformationsReducer.id);
  const { data: allFavoritesList, isLoading: allFavoritesIsLoading } =
    useGetAllFavoritesQuery(userId);

  // ----------------------------RETURN----------------------------------//

  return (
    <>
      <Link to="/myaccount">
        <ArrowBackIosIcon
          sx={{ color: 'black', marginLeft: '1.5rem', marginTop: '1rem' }}
        />
      </Link>
      <div className="favorite-main">
        {allFavoritesIsLoading ? (
          <Loading />
        ) : (
          allFavoritesList?.map((list) => (
            <FavoriteCard key={list.id} values={list} />
          ))
        )}
      </div>
    </>
  );
}

export default Favoris;
