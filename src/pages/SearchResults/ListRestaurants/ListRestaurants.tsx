// REACT
import { useEffect, useState } from 'react';
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
import { useGetRestaurantsListMutation } from '../../../store/rtk/rtk-yelp';
// FUNCTION
import { formatDistance } from '../../../utils/globalsFunctions';
// CSS
import './styles.scss';
import Loading from '../../../components/Loading/Loading';

export default function ListRestaurants() {
  const [fetchRestaurants, { data: restaurantsList, isSuccess }] =
    useGetRestaurantsListMutation();
  const activityChosen = useAppSelector(
    (state) => state.userSearchReducer.addressArrival
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  useEffect(() => {
    if (activityChosen) {
      fetchRestaurants({
        latitude: parseFloat(activityChosen.latitude),
        longitude: parseFloat(activityChosen.longitude),
        term: 'restaurant',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityChosen]);

  return (
    <>
      <h2>Pour se restaurer</h2>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {!isSuccess ? (
          <Loading />
        ) : (
          <Slider {...sliderSettings}>
            {restaurantsList?.slice(0, 100).map((item) => (
              <div
                key={item.id}
                style={{ flex: '50%', width: '100%', height: '150px' }}
              >
                <Card style={{ margin: '0.5em', height: '400px' }}>
                  <CardActionArea style={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="60%"
                      width="25%"
                      image={
                        item.image_url === ''
                          ? 'https://media.istockphoto.com/id/1198045232/fr/photo/vivre-notre-meilleure-vie.jpg?s=612x612&w=0&k=20&c=01D37VlwfTBOPKwcqPTfBMVIQ_7Egk6jeYhKfNs81aM='
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
                      <Typography variant="body2" color="text.secondary">
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
