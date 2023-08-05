import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const MapView= ({coordinates, zoom, localName, accessAmount}: {
    coordinates: [number, number],
    zoom: number,
    localName: string,
    accessAmount: number
}) => {
  return (
    <MapContainer center={coordinates} zoom={zoom} scrollWheelZoom={true} style={{height: "100%", width: "100%"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />

      <CircleMarker
        center={coordinates}
        pathOptions={{ color: 'red' }}
        radius={20}>
        <Tooltip direction="top" offset={[0, -20]} permanent>
            Acessos de {localName.replace(/\b\w/g, l => l.toUpperCase())}: {accessAmount}
        </Tooltip>
      </CircleMarker>
    </MapContainer>
  );
};

export default MapView;
