import { useEffect, useState } from 'react';
import { isPointInPolygon } from 'geolib';
import MapForm from './Map/Map';
import ListingRoadmap from './ListingRoadmap/ListingRoadmap';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchEmission,
  fetchFuelConsumption,
  fetchTolls,
  fetchYelpHotels,
  fetchYelpMarkets,
  fetchYelpRestaurants,
  updateActivityAddress,
  updateAreaCoordinates,
  updateArrivalCoordinates,
} from '../../store/reducers/search';
import { calculateCoordinatesWithAngle } from '../../utils/globalsFunctions';
import CardActivityChosen from './CardActivityChosen/CardActivityChosen';
import ListRestaurants from './ListRestaurants/ListRestaurants';
import ListHotels from './ListHotels/ListeHotels';
import ListStores from './ListStores/ListStores';
import './style.scss';
import Map from './Map/Map';
import SearchResultCard from '../../components/SearchResults/Cards/Card';
import Images from '../../components/SearchResults/Images';
import { SearchResult } from '../../@types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// Slider test
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

function SearchResults() {
  const chosenOrientation = useAppSelector((state) => state.search.direction);
  const activitiesList = useAppSelector(
    (state) => state.category.activitesList
  );
  const startingCoordinates = useAppSelector(
    (state) => state.search.departureCoordinates
  );
  const hotelsListResult = useAppSelector(
    (state) => state.search.hotelListSuggered
  );
  const restaurantsListResult = useAppSelector(
    (state) => state.search.restaurantListSuggered
  );
  const marketsListResult = useAppSelector(
    (state) => state.search.marketListSuggered
  );
  const [activityChosenCoordinate, setActivityChosenCoordinate] = useState<
    number[]
  >([]);
  const [isActivityLoaded, setIsActivityLoaded] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function polygonShaperToObject(list) {
    // Mise en forme en objet des points polygon
    // const activityList = filterByActivity();
    // console.log('Liste de activités : ', activityList);
    let test = [];
    list.forEach((element) => {
      // console.log('element : ', element);
      let a = { latitude: element[1], longitude: element[0] };
      // console.log('Variable a : ', a);
      test.push(a);
    });
    return test;
  }

  function isCoordinatesActivityMatch(polygon) {
    let filteredListByArea = [];
    try {
      activitiesList.forEach((point) => {
        const pointToTest = {
          latitude: point.latitude,
          longitude: point.longitude,
        };
        // Test si le point est dans la zone recherchée
        if (isPointInPolygon(pointToTest, polygon)) {
          filteredListByArea.push(point);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
    return filteredListByArea;
  }

  function randomizeAreaPoint(list) {
    const random = Math.floor(Math.random() * (list.length - 0));
    console.log(list[random]);
    return list[random];
  }

  function generateOrientation(orientation: string): number[][] {
    if (orientation !== 'R') {
      switch (orientation) {
        case 'N':
          console.log('direction Nord');
          return calculateCoordinatesWithAngle(startingCoordinates, 90);
        case 'S':
          console.log('direction Sud');
          return calculateCoordinatesWithAngle(startingCoordinates, 270);
        case 'E':
          console.log('direction Est');
          return calculateCoordinatesWithAngle(startingCoordinates, 0);
        case 'W':
          console.log('direction Ouest');
          return calculateCoordinatesWithAngle(startingCoordinates, 180);
        default:
          return [];
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return randomDirection();
    }
  }

  function randomDirection() {
    const directionsArray = ['N', 'S', 'E', 'W'];
    const randomNumber = Math.floor(Math.random() * (3 - 0));
    return generateOrientation(directionsArray[randomNumber]);
  }

  function mainFunction(areaPointGenerated) {
    // console.log('Entrée de la fonction TEST: ', areaPointGenerated);
    const polygonTest = polygonShaperToObject(areaPointGenerated);
    // console.log('Generation de la zone de recherche :', polygonTest);
    const filterListByArea = isCoordinatesActivityMatch(polygonTest);
    // console.log('Filtre par zone :', filterListByArea);
    const randomActivitySelected = randomizeAreaPoint(filterListByArea);
    console.log('Activité Random selectionnée :', randomActivitySelected);
    dispatch(updateActivityAddress(randomActivitySelected));
    const coordinatesRandomSelected = [
      randomActivitySelected.longitude,
      randomActivitySelected.latitude,
    ];
    console.log('Mise en forme du tableau :', coordinatesRandomSelected);
    return coordinatesRandomSelected;
  }

  // Dispatch Polygone généré + Dispatch coordonnées d'arrivée
  useEffect(() => {
    const orientation = generateOrientation(chosenOrientation);
    console.log('Orientation Générée: ', orientation);
    dispatch(updateAreaCoordinates({ areaCoordinates: orientation }));

    const mainFunc = mainFunction(orientation);
    console.log('funcTest', mainFunc);
    dispatch(
      updateArrivalCoordinates({
        arrivalCoordinates: mainFunc,
      })
    );
    setActivityChosenCoordinate(mainFunc);
    setIsActivityLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dispatch Hotels
  useEffect(() => {
    if (isActivityLoaded) {
      dispatch(
        fetchYelpHotels({
          latitude: activityChosenCoordinate[1],
          longitude: activityChosenCoordinate[0],
          term: 'hotel',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivityLoaded]);

  // Dispatch Restaurants
  useEffect(() => {
    if (hotelsListResult.length > 0) {
      console.log('API YEAL : Hotels suggerés', hotelsListResult);
      dispatch(
        fetchYelpRestaurants({
          latitude: activityChosenCoordinate[1],
          longitude: activityChosenCoordinate[0],
          term: 'restaurant',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelsListResult]);

  // Dispatch Supermrchés
  useEffect(() => {
    if (restaurantsListResult.length > 0) {
      console.log('API YEAL : = Restaurants suggerés', restaurantsListResult);
      dispatch(
        fetchYelpMarkets({
          latitude: activityChosenCoordinate[1],
          longitude: activityChosenCoordinate[0],
          term: 'grocery',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantsListResult]);

  // Dispatch Peages
  useEffect(() => {
    if (marketsListResult.length > 0) {
      const coordinatesPoints = {
        latitudeStart: startingCoordinates[1],
        longitudeStart: startingCoordinates[0],
        latitudeEnd: activityChosenCoordinate[1],
        longitudeEnd: activityChosenCoordinate[0],
      };
      console.log('POINTS DANS LE USEEFFECT: ', coordinatesPoints);
      dispatch(fetchTolls(coordinatesPoints));
      dispatch(fetchFuelConsumption(coordinatesPoints));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketsListResult]);

  return (
    <div className="result">
      <div className="result__map">
        <Map />
      </div>
      <div className="result__details">
        <div className="result__card">
          <CardActivityChosen />
        </div>
        <div className="result__estimate">
          <ListingRoadmap />
        </div>
      </div>

      <div className="result__suggestions">
        <div className="result__listing">
          {' '}
          <ListHotels />
        </div>
        <div className="result__listing">
          <ListRestaurants />
        </div>
        <div className="result__listing">
          <ListStores />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
