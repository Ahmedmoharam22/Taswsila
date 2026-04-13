import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

// تصليح مشكلة أيقونات Leaflet اللي بتختفي مع React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// كومبوننت عشان الخريطة تتحرك مع السواق أوتوماتيك
const RecenterMap = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const LiveMap = ({ driverLocation }) => {
  // مكان افتراضي (المنصورة مثلاً) لحد ما الداتا تيجي
  const defaultPosition = [31.0409, 31.3785]; 
  const position = driverLocation || defaultPosition;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white relative z-0"
    >
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {driverLocation ? "السواق هنا حالياً 🚗" : "في انتظار تحديد مكان السواق..."}
          </Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </motion.div>
  );
};

export default LiveMap;