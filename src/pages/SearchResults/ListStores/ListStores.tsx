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

export default function ListStores() {
  const marketsStore = useAppSelector(
    (state) => state.search.marketListSuggered
  );
  const [markets, setMarkets] = useState<BusinessYelp[]>([]);

  async function handleShowMarkets() {
    try {
      setMarkets(marketsStore);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  function shapeDistance(distance: number) {
    const calculateValue = distance / 1000;
    return calculateValue.toString().slice(0, 3);
  }

  useEffect(() => {
    handleShowMarkets();
  }, [marketsStore]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <>
      <h2>Pour faire des emplettes</h2>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <Slider {...sliderSettings}>
          {markets.slice(0, 100).map((item) => (
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
                    <Typography gutterBottom variant="h5" component="div" fontSize={15}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontSize={12}>
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
