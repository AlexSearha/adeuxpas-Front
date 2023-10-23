// REACT
import { useEffect } from 'react';
// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// Slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// REDUX
import { useAppSelector } from '../../../hooks/redux';
import { useGetStoresListMutation } from '../../../store/queries/queries-yelp';
// FUNCTION
import { formatDistance } from '../../../utils/globalsFunctions';
// CSS
import './styles.scss';
import Loading from '../../../components/Loading/Loading';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function ListStores() {
  const activityChosen = useAppSelector(
    (state) => state.userSearchReducer.addressArrival
  );
  const [fetchStores, { data: markets, isSuccess }] =
    useGetStoresListMutation();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  // ----------------------------USEEFFECTS------------------------------//

  useEffect(() => {
    if (activityChosen) {
      fetchStores({
        longitude: parseFloat(activityChosen.longitude),
        latitude: parseFloat(activityChosen.latitude),
        term: 'grocery',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityChosen]);

  // ----------------------------RETURN----------------------------------//

  return (
    <>
      <h2>Pour faire des emplettes</h2>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {!isSuccess ? (
          <Loading />
        ) : (
          <Slider {...sliderSettings}>
            {markets?.slice(0, 100).map((item) => (
              <div key={item.id} style={{ flex: '0 0 50%', maxWidth: '50%' }}>
                <Card style={{ margin: '0.5em', height: '400px' }}>
                  <CardActionArea style={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="60%"
                      width="25%"
                      image={
                        item.image_url === ''
                          ? 'https://marche-frais.com/wp-content/uploads/2022/11/shutterstock_1688252332-1.jpg'
                          : item.image_url
                      }
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontSize={15}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={12}
                      >
                        {`${item.location.display_address[0]}, ${item.location.display_address[1]}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Distance: +/- ${formatDistance(item.distance)} kms`}
                      </Typography>
                      <CardActions>
                        <Button size="small" href={item.url} target="_blank">
                          En savoir plus
                        </Button>
                      </CardActions>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
