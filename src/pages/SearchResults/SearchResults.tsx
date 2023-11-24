// REACT
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// MUI
import { Button } from '@mui/material';
// MAP & GEOLIB
import { isPointInPolygon } from 'geolib';
import Map from './Map/Map';
// REDUX
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { calculateCoordinatesWithAngle } from '../../utils/globalsFunctions';
import { useGetActivitiesListQuery } from '../../store/queries/queries-activities';
import {
  updateActivityAddress,
  updateAreaCoordinates,
  updateArrivalCoordinates,
} from '../../store/reducers/user';
// COMPONENTS
import ListingRoadmap from './ListingRoadmap/ListingRoadmap';
import CardActivityChosen from './CardActivityChosen/CardActivityChosen';
import ListRestaurants from './ListRestaurants/ListRestaurants';
import ListHotels from './ListHotels/ListeHotels';
import ListStores from './ListStores/ListStores';
import { ActivitiesRoot, SearchStoreProps } from '../../@types';
// CSS
import './style.scss';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function SearchResults() {
  const [isActivityPresent, setIsActivitypresent] = useState(false);
  const chosenOrientation = useAppSelector(
    (state) => state.userSearchReducer.direction
  );
  const { data: activitiesList } = useGetActivitiesListQuery();
  const startingCoordinates = useAppSelector(
    (state) => state.userSearchReducer.departureCoordinates
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ----------------------------FUNCTIONS-------------------------------//

  function polygonShaperToObject(list: number[][]) {
    // Mise en forme en objet des points polygon
    const arrayToObject: { latitude: number; longitude: number }[] = [];
    list.forEach((element) => {
      const lineToTransform = { latitude: element[1], longitude: element[0] };
      arrayToObject.push(lineToTransform);
    });
    return arrayToObject;
  }

  function isCoordinatesActivityMatch(
    polygon: { latitude: number; longitude: number }[]
  ) {
    const filteredListByArea: ActivitiesRoot = [];
    activitiesList?.forEach((point) => {
      const pointToTest = {
        latitude: point.latitude,
        longitude: point.longitude,
      };
      // Test si le point est dans la zone recherchée
      if (isPointInPolygon(pointToTest, polygon)) {
        filteredListByArea.push(point);
      }
    });

    return filteredListByArea as ActivitiesRoot;
  }

  function randomizeAreaPoint(list: ActivitiesRoot) {
    const random = Math.floor(Math.random() * (list.length - 0));
    return list[random];
  }

  function generateOrientation(orientation: string): number[][] {
    if (orientation !== 'R' && startingCoordinates) {
      switch (orientation) {
        case 'N':
          return calculateCoordinatesWithAngle(startingCoordinates, 90);
        case 'S':
          return calculateCoordinatesWithAngle(startingCoordinates, 270);
        case 'E':
          return calculateCoordinatesWithAngle(startingCoordinates, 0);
        case 'W':
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

  function mainFunction(areaPointGenerated: number[][]) {
    const polygonTest = polygonShaperToObject(areaPointGenerated);
    const filterListByArea = isCoordinatesActivityMatch(polygonTest);
    if (filterListByArea.length !== 0) {
      setIsActivitypresent(true);
      const randomActivitySelected = randomizeAreaPoint(filterListByArea);
      dispatch(
        updateActivityAddress({
          addressArrival: randomActivitySelected,
        } as SearchStoreProps)
      );
      return [
        parseFloat(randomActivitySelected.longitude),
        parseFloat(randomActivitySelected.latitude),
      ];
    }
    setIsActivitypresent(false);
    return [0, 0];
  }

  // ----------------------------USEEFFECT-------------------------------//

  // Dispatch Polygone généré + Dispatch coordonnées d'arrivée
  useEffect(() => {
    if (activitiesList && activitiesList.length > 0) {
      const orientation = generateOrientation(chosenOrientation);
      dispatch(
        updateAreaCoordinates({
          areaCoordinates: orientation,
        } as SearchStoreProps)
      );

      const mainFunc = mainFunction(orientation);
      dispatch(
        updateArrivalCoordinates({
          arrivalCoordinates: mainFunc,
        } as SearchStoreProps)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activitiesList]);

  useEffect(() => {
    if (!chosenOrientation) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------RETURN----------------------------------//
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isActivityPresent ? (
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
      ) : (
        <div className="result">
          <h2 style={{ color: 'black' }}>Aucun resultats trouvé</h2>
          <Button variant="contained" onClick={() => navigate('/')}>
            Relancer une recherche
          </Button>
        </div>
      )}
    </>
  );
}
