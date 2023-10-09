// REACT
import { useEffect } from 'react';
// LEAFLET
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// REDUX
import { useAppSelector } from '../../../hooks/redux';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

export default function MapItinerary() {
  const { departureCoordinates, arrivalCoordinates } = useAppSelector(
    (state) => state.userSearchReducer
  );
  const map = useMap();

  useEffect(() => {
    if (departureCoordinates && arrivalCoordinates) {
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
      }).addTo(map);
    }
  }, [map, departureCoordinates, arrivalCoordinates]);

  return null;
}
