import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L, { layerGroup, LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-place.css';
import Sidebar from "../components/Sidebar";
import icon from "../utils/mapIcon";

export default function CreatePlace() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function ComponentMarker() {
    const map = useMapEvents({
      click: (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        console.log('localizacao nova: ', position.latitude, position.longitude)
        //map.locate()
      },
      locationfound: (location) => {
        console.log('only test');
      },
    });
    return null;
  }

  return (
    <div id="page-create-place">
      <Sidebar />
      <main>
        <form className="create-place-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-19.8834257, -43.930757]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <ComponentMarker />

              <Marker
                interactive={false}
                icon={icon}
                position={[position.latitude, position.longitude]}
              />

            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="veg_type"> Veg_type?</label>
              <textarea id="veg_type" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours"> Opening Hours </label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}