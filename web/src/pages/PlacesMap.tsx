import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import logoImg from '../images/lanche.svg';

import '../styles/pages/places-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Place {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function PlacesMap() {
  const [places, setPlaces] = useState<Place[]>([]);

  const [mapTheme, setMapTheme] = useState('light-v10')
  const [textBtnTheme, setTextBtnTheme] = useState('Dark Mode')

  useEffect(() => {
    api.get('/places').then(response => {
      setPlaces(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logoImg} id="logoImg" alt="MyVegOption" />

          <h2> Escolha um lugar no mapa </h2>
          <p> Amantes da culinária veg, fiquem a vontade :) </p>
        </header>

        <footer>
          <strong> Belo Horizonte </strong>
          <span> Minas Gerais </span>
        </footer>
      </aside>

      <MapContainer
        center={[-19.883380, -43.930800]}
        zoom={13.5}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {places.map(place => {
          return (
            <Marker
              key={place.id}
              icon={mapIcon}
              position={[place.latitude, place.longitude]}
            >
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {place.name}
                <Link to={`/places/${place.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <button
        type="button"
        id={mapTheme}
        // onClick={() => swapMapTheme()}
      >
        {textBtnTheme}
      </button>

      <Link to="/places/create" className="create-place">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default PlacesMap;