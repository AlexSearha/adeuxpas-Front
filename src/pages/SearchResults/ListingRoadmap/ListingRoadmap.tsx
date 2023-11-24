// REACT
import { useEffect, useMemo, useState } from 'react';
// DAYJS
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
// REDUX
import { useAppSelector } from '../../../hooks/redux';
import { useGetFuelCostsMutation } from '../../../store/queries/queries-fuelCost';
import {
  useGetCostMutation,
  useGetEmissionMutation,
} from '../../../store/queries/queries-ptv';
// CSS
import './style.scss';

dayjs.extend(duration);

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

export default function ListingRoadmap() {
  const [fetchEmission, { data: fuelEmission }] = useGetEmissionMutation();
  const [fetchCost, { data: fuelCost }] = useGetCostMutation();
  const { departureCoordinates, arrivalCoordinates, addressArrival } =
    useAppSelector((state) => state.userSearchReducer);
  const [fetchFuelCost, { data: fuelCostList }] = useGetFuelCostsMutation();
  const [fuelCostAverage, setFuelCostAverage] = useState<number | null>(null);
  const [estimateFuelCost, setEstimateFuelCost] = useState<number | null>(null);

  const caculateEmission = useMemo(() => {
    const data = fuelEmission?.emissions.en16258_2012.co2eWellToWheel;
    return data?.toFixed(2);
  }, [fuelEmission?.emissions.en16258_2012.co2eWellToWheel]);

  // ----------------------------FUNCTIONS------------------------------//

  const calculateTolls = useMemo(() => {
    if (fuelCost?.monetaryCosts.tollCost) {
      const data = fuelCost.monetaryCosts.tollCost * 2;
      return parseFloat(data.toFixed(1));
    }
    return null;
  }, [fuelCost]);

  const totalCost = useMemo(() => {
    const toll = calculateTolls;
    if (toll && estimateFuelCost) {
      const total = toll + estimateFuelCost;
      return total.toFixed(1);
    }
    return null;
  }, [calculateTolls, estimateFuelCost]);

  const calculateTimeTravel = useMemo(() => {
    if (fuelCost) {
      const timeLapse = dayjs.duration(fuelCost.travelTime, 'seconds');
      const hours = timeLapse.hours();
      const minutes = timeLapse.minutes();
      return `${hours.toString().padStart(2, '0')}h${minutes
        .toString()
        .padStart(2, '0')}`;
    }
    return null;
  }, [fuelCost]);

  // ----------------------------USEEFFECT-------------------------------//

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

  useEffect(() => {
    if (fuelCostList) {
      let testArray = 0;
      let count = 0;
      fuelCostList.forEach((station) => {
        const dieselFuel = station.Fuels.find((fuel) => fuel.name === 'Gazole');
        if (dieselFuel) {
          testArray += dieselFuel.Price.value;
          count += 1;
        }
      });
      setFuelCostAverage(testArray / count);
    }
  }, [fuelCostList]);

  useEffect(() => {
    if (fuelCostAverage && fuelCost?.distance) {
      const distance = fuelCost.distance / 1000;
      const formatDistance = (distance / 18.18) * fuelCostAverage * 2;
      setEstimateFuelCost(parseFloat(formatDistance.toFixed(1)));
    }
  }, [fuelCostAverage, fuelCost]);

  // ----------------------------RETURN-------------------------------//

  return (
    <div className="total">
      <h2 className="total__title">Votre Séjour</h2>
      <h2>Coût de l&apos;essence: {estimateFuelCost} €</h2>
      <h2>Péages: {calculateTolls} €/ Allé-Retour</h2>
      <h2>Temps de trajet: {calculateTimeTravel}</h2>
      <h2>Emprunte Carbone (CO2): {caculateEmission} kg C02 </h2>
      <h2 className="total__estimate">
        TOTAL estimé de votre séjour: {totalCost}€
      </h2>
    </div>
  );
}
