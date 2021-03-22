import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import pin from "../assets/images/primary-pin.svg";
import "leaflet/dist/leaflet.css";
import Leaf from "leaflet";
//import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = Leaf.icon({
  iconUrl: pin,
  shadowUrl: iconShadow,
});

Leaf.Marker.prototype.options.icon = DefaultIcon;

const Location = ({ locationData, index }) => {
  const [position, setPosition] = useState([
    locationData.latitude,
    locationData.longitude,
  ]);

  useEffect(() => {
    setPosition([locationData.latitude, locationData.longitude]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData, index]);

  return (
    <div className="location-tab">
      <h5>Address</h5>
      <p>Longtitude: {locationData.latitude}</p>
      <p>Latitude: {locationData.longitude}</p>
      <div id="mapcontainer" className="map-container">
        {!(locationData.latitude && locationData.longitude) ? (
          <p className="nolocation">There is no map information.</p>
        ) : null}
        <MapContainer
          className="map"
          center={position}
          zoom={15}
          scrollWheelZoom={false}
        >
          <UpdateMap position={position} />

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Location;

function UpdateMap({ position }) {
  const map = useMap();
  map.setView(position, 15);
  return (
    <Marker position={position}>
      <Popup>
        <p>latitude: {position[0]}</p>
        <p>longtitude: {position[1]}</p>
      </Popup>
    </Marker>
  );
}
