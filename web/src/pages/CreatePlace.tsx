import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-place.css';
import Sidebar from "../components/Sidebar";  
import icon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreatePlace() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [veg_type, setVegtype] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function ComponentMarker() {
    const map = useMapEvents({
      click: (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
      },
      // locationfound: (location) => {
      //   console.log('only test');
      // },
    });
    console.log(position.latitude, position.longitude)
    return null;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('veg_type', veg_type);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends))
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('places', data);

    alert('Cadastro realizado com sucesso. ');

    history.push('/app');

    console.log({
      name,
      about,
      latitude,
      longitude,
      veg_type,
      opening_hours,
      open_on_weekends,
      images,
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const selectedImages = (Array.from(event.target.files));

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-place">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-place-form">
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

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={icon}
                  position={[
                    position.latitude,
                    position.longitude
                  ]}
                />
              )}
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="veg_type"> Veg_type?</label>
              <textarea
                id="veg_type"
                value={veg_type}
                onChange={event => setVegtype(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours"> Opening Hours </label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  id="btn_sim"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  id="btn_nao"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeeekends(false)}
                >
                  Não
                </button>
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