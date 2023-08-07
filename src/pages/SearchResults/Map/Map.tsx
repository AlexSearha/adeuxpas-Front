import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapItinerary from './MapItinerary';

export default function Map() {
  return (
  
    <MapContainer
      className="map"
      // center={[45.6562, 0.13422]}
      zoom={12}
      style={{height: '30vh', width: '100%',
       display: "flex", flexWrap: "wrap",
       borderRadius: "5px"
      }}
      scrollWheelZoom
    >
       <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapItinerary />
    </MapContainer>
  );
}
