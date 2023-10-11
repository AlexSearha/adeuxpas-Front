// REACT
import { useEffect } from 'react';
// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Slider from 'react-slick';
import { Button, CardActionArea, CardActions } from '@mui/material';
// REDUX
import { useAppSelector } from '../../../hooks/redux';
import { useGetHotelListMutation } from '../../../store/rtk/rtk-yelp';
// LAYOUTS
import Loading from '../../../components/Loading/Loading';
// Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// FUNCTIONS
import { formatDistance } from '../../../utils/globalsFunctions';
// CSS
import './styles.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function ListHotels() {
  const activityChosen = useAppSelector(
    (state) => state.userSearchReducer.addressArrival
  );
  const [fetchHotels, { data, isSuccess }] = useGetHotelListMutation();

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
      fetchHotels({
        longitude: parseFloat(activityChosen.longitude),
        latitude: parseFloat(activityChosen.latitude),
        term: 'hotel',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityChosen]);

  // ----------------------------RETURN----------------------------------//

  return (
    <>
      <h2>Pour se loger</h2>

      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {!isSuccess ? (
          <Loading />
        ) : (
          <Slider {...sliderSettings}>
            {data?.slice(0, 100).map((item) => (
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
                          ? 'https://m.economictimes.com/thumb/height-450,width-600,imgsize-28786,msid-90724647/indian-hotels.jpg'
                          : item.image_url
                      }
                      alt={item.name}
                    />
                    <CardContent style={{ marginTop: '0.2em' }}>
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
