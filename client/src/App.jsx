import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import useSWR from 'swr'

import { Icon, divIcon, point } from "leaflet";
import { Fragment } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json())

// create custom icon
const customIcon = new Icon({
  iconUrl: new URL('./assets/marker-icon.png', import.meta.url).href,
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

function App() {
  const { data, error, isLoading } = useSWR(`/api/v1/bhus`, fetcher)

  if (error) return <div>falhou ao carregar</div>
  if (isLoading) return <div>carregando...</div>

  return (
    <Fragment>
      <h1>💉 Pontos de vacinação em Alagoas</h1>
      <MapContainer center={[-9.677819890864154, -36.653777684088666]} zoom={9}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >

          {data?.map(({ id, name, latitude, longitude }) => (
            <Marker position={[latitude, longitude]} icon={customIcon} key={id}>
              <Popup>{name}</Popup>
            </Marker>
          ))}

        </MarkerClusterGroup>
      </MapContainer>
      <p>© 2023 Genes Luna. All rights reserved</p>
    </Fragment>
  );
}

export default App
