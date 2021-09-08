import React from 'react';
import {Marker, Popup} from 'react-leaflet';
import { location } from './iconMap/icon';
import {tiendas} from './iconMap/tiendas';


export default function Markers() {
    return (
        <div>
            {
                tiendas.map((e, i)=><Marker key={i} position={e.location} icon={location}>
                    <Popup position={e.location}><label>{e.name} {e.direct}</label></Popup>
                </Marker>)
            }  
        </div>
    );
};

