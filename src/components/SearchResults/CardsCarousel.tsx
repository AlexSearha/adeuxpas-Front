// SLIDER
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// LAYOUTS
import SearchResultCard from './Cards/Card';
import Images from './Images';
// CSS
import './style.scss';
// TYPE
interface SearchResult {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
}

interface CardsCarouselProps {
  results: SearchResult[];
}

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function CardsCarousel({ results }: CardsCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 10,
  };

  const imagesArray = Object.values(Images);

  // ----------------------------RETURN----------------------------------//

  return (
    <div className="slider">
      <div className="slider__container">
        <h1 className="slider__header">Car Gallery</h1>
        <Slider {...settings}>
          {imagesArray.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CardsCarousel;
