import Leaftlet from 'leaflet';

import mapMarkerImg from '../images/pins/pin-burger.svg';

const mapIcon = Leaftlet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 58],
  iconAnchor: [29, 58],
  popupAnchor: [170, 14.5]
})

export default mapIcon;