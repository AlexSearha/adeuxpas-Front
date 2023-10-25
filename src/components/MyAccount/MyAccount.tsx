// REACT
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
// MUI
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// Icons
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// REDUX
import { useAppSelector } from '../../hooks/redux';
// CSS
import './style.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function MyAccount() {
  const isLogged = useAppSelector(
    (state) => state.userInformationsReducer.isLogged
  );
  const navigate = useNavigate();

  // ----------------------------USEEFFECTS------------------------------//

  // useEffect(() => {
  //   if (!isLogged) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLogged]);

  // ----------------------------RETURN----------------------------------//
  return (
    <div className="myAccount">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          width: '100%',
          padding: '2rem',
        }}
      >
        <Card
          className="myAccount__card"
          style={{ width: '100%', minWidth: '100px' }}
        >
          <RecentActorsIcon style={{ margin: '1rem' }} fontSize="large" />
          <CardContent>
            <Typography variant="h5" component="div" fontSize="large">
              Informations Personnelles
            </Typography>
            <Typography color="text.secondary" fontSize="small">
              Nom, Prénom, Adresse, Email
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/myaccount/infos">Modifier</Link>
          </CardActions>
        </Card>
        <Card
          className="myAccount__card"
          style={{ width: '100%', minWidth: '100px' }}
        >
          <FavoriteBorderIcon style={{ margin: '1rem' }} fontSize="large" />
          <CardContent>
            <Typography variant="h5" component="div" fontSize="large">
              Favoris
            </Typography>
            <Typography color="text.secondary" fontSize="small">
              Consultez, supprimez vos favoris
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/myaccount/favoris">Modifier</Link>
          </CardActions>
        </Card>
        <Card
          className="myAccount__card"
          style={{ width: '100%', minWidth: '100px' }}
        >
          <SecurityIcon style={{ margin: '1rem' }} fontSize="large" />
          <CardContent>
            <Typography variant="h5" component="div" fontSize="large">
              Connexion et Sécurité
            </Typography>
            <Typography color="text.secondary" fontSize="small">
              Mise à jour du mot de passe, et sécuriez votre compte
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/myaccount/security">Modifier</Link>
          </CardActions>
        </Card>
        <Card
          className="myAccount__card"
          style={{ width: '100%', minWidth: '100px' }}
        >
          <NotificationsActiveIcon
            style={{ margin: '1rem' }}
            fontSize="large"
          />
          <CardContent>
            <Typography variant="h5" component="div" fontSize="large">
              Notifications
            </Typography>
            <Typography color="text.secondary" fontSize="small">
              Activez/Désactivez vos notifications
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/myaccount/notifications">Modifier</Link>
          </CardActions>
        </Card>
      </Box>
      <div>Supprimer mon compte</div>
    </div>
  );
}
