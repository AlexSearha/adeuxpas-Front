import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useAppSelector } from '../../../hooks/redux';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

export default function MapItinerary() {
  const { departureCoordinates, arrivalCoordinates } = useAppSelector(
    (state) => state.search
  );
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      language: 'fr',
      waypoints: [
        L.latLng(departureCoordinates[1], departureCoordinates[0]), // Depart
        L.latLng(arrivalCoordinates[1], arrivalCoordinates[0]), // Arrivée
      ],
      routeWhileDragging: true,
      height: '50px',
      width: '50px',
    })
      .addTo(map)
      .hide();
  }, [map]);

  return null;
}
