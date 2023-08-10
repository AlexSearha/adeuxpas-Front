// React
import { Link } from 'react-router-dom';

// MUI
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SecurityIcon from '@mui/icons-material/Security';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// CSS
import './style.scss';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function MyAccount() {
  return (
    <>
      {/* <Header /> */}
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
            <RecentActorsIcon style={{ margin: '1rem' }} fontSize="medium" />
            <CardContent>
              <Typography variant="h5" component="div" fontSize="medium">
                Informations Personnelles
              </Typography>
              <Typography color="text.secondary" fontSize="small">
                Nom, Prénom, Adresse, Email
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to="/myaccount/informations"
                style={{
                  color: 'black',
                  marginLeft: '5px',
                  fontFamily: 'Roboto',
                }}
              >
                Modifier
              </Link>
            </CardActions>
          </Card>
          <Card
            className="myAccount__card"
            style={{ width: '100%', minWidth: '100px' }}
          >
            <FavoriteBorderIcon style={{ margin: '1rem' }} fontSize="medium" />
            <CardContent>
              <Typography variant="h5" component="div" fontSize="medium">
                Favoris
              </Typography>
              <Typography color="text.secondary" fontSize="small">
                Consultez, supprimez vos favoris
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to="/myaccount/favorites"
                style={{
                  color: 'black',
                  marginLeft: '5px',
                  fontFamily: 'Roboto',
                }}
              >
                Modifier
              </Link>
            </CardActions>
          </Card>
          <Card
            className="myAccount__card"
            style={{ width: '100%', minWidth: '100px' }}
          >
            <SecurityIcon style={{ margin: '1rem' }} fontSize="medium" />
            <CardContent>
              <Typography variant="h5" component="div" fontSize="medium">
                Connexion et Sécurité
              </Typography>
              <Typography color="text.secondary" fontSize="small">
                Mise à jour du mot de passe, et sécuriez votre compte
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to="/myaccount/connexion-secutity"
                style={{
                  color: 'black',
                  marginLeft: '5px',
                  fontFamily: 'Roboto',
                }}
              >
                Modifier
              </Link>
            </CardActions>
          </Card>
          <Card
            className="myAccount__card"
            style={{ width: '100%', minWidth: '100px' }}
          >
            <NotificationsActiveIcon
              style={{ margin: '1rem' }}
              fontSize="medium"
            />
            <CardContent>
              <Typography variant="h5" component="div" fontSize="medium">
                Notifications
              </Typography>
              <Typography color="text.secondary" fontSize="small">
                Activez/Désactivez vos notifications
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to="/myaccount/favorite"
                style={{
                  color: 'black',
                  marginLeft: '5px',
                  fontFamily: 'Roboto',
                }}
              >
                Modifier
              </Link>
            </CardActions>
          </Card>
        </Box>
      </div>
      {/* <Footer /> */}
    </>
  );
}
