import L from 'leaflet'
import Icon from './iconMap.png'

export const location = L.icon ({
    iconUrl: Icon,
    iconRetinaUrl: Icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [50,50],
    className: "leaflet-venue-icon"
})
