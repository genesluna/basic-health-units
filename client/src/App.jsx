import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Dna } from  'react-loader-spinner'
import MarkerClusterGroup from "react-leaflet-cluster";
import useSWR from 'swr'

import { Icon, divIcon, point } from "leaflet";
import { Fragment } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json())

// create custom icon
const customIcon = new Icon({
  iconUrl: new URL('./assets/marker-icon.png', import.meta.url).href,
  iconSize: [38, 38]
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
  const { data, error, isLoading } = useSWR('/api/v1/bhus', fetcher)

  if (error) return <div>falhou ao carregar</div>
  if (isLoading) return <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/>

  return (
    <Fragment>
      <h1>💉 Pontos de vacinação em Alagoas</h1>
      <p className="disclaimer">* As coordenadas de latitude e longitude são aproximadas e em alguns casos correspondem à localização da sede do município.</p>
      <MapContainer center={[-9.677819890864154, -36.653777684088666]} zoom={9}>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >

          {data?.map(({ id, name, address, district, latitude, longitude }) => (
            <Marker position={[latitude, longitude]} icon={customIcon} key={id}>
              <Popup>
                <span><strong>Unidade:</strong> {name}</span> <br/>
                <span><strong>Endereço:</strong> {address}</span> <br/>
                <span><strong>Bairro:</strong> {district}</span>
               </Popup>
            </Marker>
          ))}

        </MarkerClusterGroup>
      </MapContainer>
      <p className="footer">© 2023 Genes Luna. All rights reserved</p>
    </Fragment>
  );
}

export default App
