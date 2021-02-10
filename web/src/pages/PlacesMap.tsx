import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import logoImg from '../images/lanche.svg';

import '../styles/pages/places-map.css';

function PlacesMap() {
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
        center={[-19.8837535, -43.9341315]}
        zoom={13.5}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </MapContainer>

      <Link to="" className="create-place">
        <FiPlus size={32} color="#FFF" />
      </Link>

    </div>
  );
}

export default PlacesMap;