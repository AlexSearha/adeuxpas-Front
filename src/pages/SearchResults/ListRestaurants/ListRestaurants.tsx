import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux';
import { BusinessYelp } from '../../../@types';
import './styles.scss';
// Slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ListRestaurants() {
  const restaurantsStore = useAppSelector(
    (state) => state.search.restaurantListSuggered
  );
  const [restaurants, setRestaurants] = useState<BusinessYelp[]>([]);

  async function handleShowRestaurants() {
    try {
      setRestaurants(restaurantsStore);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  function shapeDistance(distance: number) {
    const calculateValue = distance / 1000;
    return calculateValue.toString().slice(0, 3);
  }

  useEffect(() => {
    handleShowRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantsStore]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <>
      <h2>Pour se restaurer</h2>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <Slider {...sliderSettings}>
          {restaurants.slice(0, 100).map((item) => (
            <div key={item.id} style={{ flex: "50%", width: "100%", height: "150px" }}>
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
                    <Typography gutterBottom variant="h5" component="div" fontSize={15}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`${item.location.display_address[0]}, ${item.location.display_address[1]}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Distance: +/- ${shapeDistance(item.distance)} kms`}
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
      </div>
    </>
  );
}
