import { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import { useAppSelector } from '../../../hooks/redux';
import { co2FootprintConvertor } from '../../../utils/globalsFunctions';
import './style.scss';
import {
  useGetCostMutation,
  useGetEmissionMutation,
} from '../../../store/rtk/rtk-ptv';
import { useGetFuelCostsMutation } from '../../../store/rtk/rtk-fuelCost';

export default function ListingRoadmap() {
  const [
    fetchEmission,
    { data: fuelEmission, isSuccess: successEmissionFetch },
  ] = useGetEmissionMutation();
  const [fetchCost, { data: fuelCost, isSuccess: successFuelCost }] =
    useGetCostMutation();
  const { departureCoordinates, arrivalCoordinates, addressArrival } =
    useAppSelector((state) => state.userSearchReducer);
  const [fetchFuelCost, { data: fuelCostList, isSuccess: isSuccessFuelCost }] =
    useGetFuelCostsMutation();
  const [fuelCostAverage, setFuelCostAverage] = useState<number | null>(null);

  useEffect(() => {
    if (departureCoordinates && arrivalCoordinates) {
      fetchEmission({
        departureLatitude: departureCoordinates[1],
        departureLongitude: departureCoordinates[0],
        arrivalLatitude: arrivalCoordinates[1],
        arrivalLongitude: arrivalCoordinates[0],
      });
      fetchFuelCost({
        departureLatitude: departureCoordinates[1],
        departureLongitude: departureCoordinates[0],
      });
      fetchCost({
        departureLatitude: departureCoordinates[1],
        departureLongitude: departureCoordinates[0],
        arrivalLatitude: arrivalCoordinates[1],
        arrivalLongitude: arrivalCoordinates[0],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressArrival]);

  // useEffect(() => {
  //   console.log('fuelEmission', fuelEmission);
  // }, [fuelEmission]);

  // useEffect(() => {
  //   console.log('fuelCost', fuelCost);
  // }, [fuelCost]);

  useEffect(() => {
    if (fuelCostList) {
      console.log('fuelCostList: ', fuelCostList);
      const result = fuelCostList.map((fuel) =>
        fuel.Fuels.filter((elem) => elem.name === 'Gazole')
      );
    }
  }, [fuelCostList]);

  return (
    <div className="total">
      {/* <h2 className="total__title">Votre Séjour</h2>
      <h2>Coût de l&apos;essence: {fuelCost?.prices} €</h2>
      <h2>Péages: {tolls?.costs.prices} €/ Allé-Retour</h2>
      <h2>
        Emprunte Carbone (CO2):{' '}
        {fuelEmission?.emissions.en16258_2012.co2eWellToWheel} kg C02{' '}
      </h2>
      <h2 className="total__estimate">
        TOTAL estimé de votre séjour: {parseInt((fuelConsumption + toll) * 2)}€
      </h2> */}
    </div>
  );
}
