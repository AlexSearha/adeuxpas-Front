import { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import { useAppSelector } from '../../../hooks/redux';
import { co2FootprintConvertor } from '../../../utils/globalsFunctions';
import './style.scss';

export default function ListingRoadmap() {
  const departureCoordinates = useAppSelector(
    (state) => state.search.departureCoordinates
  );
  const arrivalCoordinates = useAppSelector(
    (state) => state.search.arrivalCoordinates
  );
  const fuelStoreConsumption = useAppSelector(
    (state) => state.search.fuelConsumption
  );
  const tollStore = useAppSelector((state) => state.search.tolls);
  const [toll, setToll] = useState('');
  const [co2, setCo2] = useState<number>(0);
  const [total, seTotal] = useState<number>(0);
  const [fuelConsumption, setFuelConsumption] = useState<string>('');

  async function calculateCo2Footprint() {
    const startingPoint = {
      latitude: departureCoordinates[1],
      longitude: departureCoordinates[0],
    };
    const endingPoint = {
      latitude: arrivalCoordinates[1],
      longitude: arrivalCoordinates[0],
    };

    if (
      !startingPoint.latitude ||
      !startingPoint.longitude ||
      !endingPoint.latitude ||
      !endingPoint.longitude
    ) {
      return; // Sortir de la fonction si l'une des coordonnées est manquante
    }

    try {
      const calculatedDistance = Math.round(
        getDistance(startingPoint, endingPoint, 1) / 1000
      );
      const co2Foorprint = co2FootprintConvertor(calculatedDistance);
      setCo2(co2Foorprint);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function getFuelConsumption() {
    try {
      const consumption = parseInt(
        fuelStoreConsumption.emissions.en16258_2012.fuelConsumption
      );
      const fuelPriceAverage = (consumption / 10) * 1.7;
      setFuelConsumption(fuelPriceAverage);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function getToll() {
    try {
      setToll(tollStore.toll.costs.convertedPrice.price);
      console.log('PRIX PEAGES: ', tollStore.toll.costs.convertedPrice.price);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function sumCalculate() {
    try {
      return;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  // Monitor Tolls
  useEffect(() => {
    if (tollStore) {
      getToll();
      console.log('TOLLSTORE', tollStore);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tollStore]);

  // Monitor C02 Footprint
  useEffect(() => {
    if (arrivalCoordinates.length > 0) {
      calculateCo2Footprint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalCoordinates]);

  // Monitor Fuel Consumption
  useEffect(() => {
    if (fuelStoreConsumption) {
      getFuelConsumption();
    }
    // eslint-disable-next-line prettier/prettier
  }, [fuelStoreConsumption]);

  return (
    <>
   
    <div className="total">
      <h2 className='total__title'>Votre Séjour</h2>
      <h2>Coût de l&apos;essence: {fuelConsumption} €</h2>
      <h2>Péages: {toll} €/ Allé-Retour</h2>
      <h2>Emprunte Carbone (CO2): {co2 * 2} kg C02 </h2>
      <h2 className="total__estimate">
        TOTAL estimé de votre séjour: {parseInt((fuelConsumption + toll) * 2)}€
      </h2>
      </div>
    </>
  );
}
