import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/place.css';

interface Place {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  veg_type: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface PlaceParams {
  id: string;
}

export default function Place() {
  const params = useParams<PlaceParams>();
  const [place, setPlace] = useState<Place>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/places/${params.id}`).then(response => {
      setPlace(response.data);
    })
  }, [params.id]);

  if (!place) {
    return <p> Carregando... </p> //Shimmer Effect
  }

  return (
    <div id="page-place">
      <Sidebar />
      <main>
        <div className="place-details">
          <img src={place.images[activeImageIndex].url} alt={place.name} />

          <div className="images">
            {place.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={place.name} />
                </button>
              );
            })}
          </div>

          <div className="place-details-content">
            <h1> {place.name} </h1>
            <p>
              {place.about}
            </p>

            <div className="map-container">
              <MapContainer
                center={[place.latitude, place.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[place.latitude, place.longitude]}
                />
              </MapContainer>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
                >
                  Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2> Tipo: </h2>
            <p> {place.veg_type} </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {place.opening_hours}
              </div>
              {place.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>
              ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
                  </div>
                )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}