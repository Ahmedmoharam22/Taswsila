import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// أيقونة عربية مخصصة (SaaS touch)
const carIcon = new L.Icon({
  iconUrl: '/car-icon.png', // حط صورة عربية في الـ public folder
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const RecenterMap = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom(), { animate: true });
  return null;
};

const LiveTrackingMap = ({ location }) => {
  const defaultPos = [31.0409, 31.3785]; // المنصورة
  const currentPos = location ? [location.lat, location.lng] : defaultPos;

  return (
    <div className="h-[500px] w-full rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl z-0">
      <MapContainer center={currentPos} zoom={15} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={currentPos} icon={carIcon} />
        <RecenterMap position={currentPos} />
      </MapContainer>
    </div>
  );
};

export default LiveTrackingMap;