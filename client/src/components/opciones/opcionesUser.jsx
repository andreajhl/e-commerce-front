import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { payloadJWT } from '../../funciones/localStoreFunction';

import '../../styles/opciones/opcionesUser.scss';

export default function OpcionesUser (){

    const state = useSelector(state => state.user.profile);

    let token=payloadJWT();
    
    return (
        <div className='opcionesUser'>
            <h1 className="welcome" >¡Bienvenido {state.nombre}!</h1>
            <img src={state.foto} alt="profilePhoto" className="profilePhoto" />
            <Link to={`/profile/${token.uid}`} style={{textDecoration:'none'}} ><h2 className="perfilGo">Ver perfil</h2></Link>
            <Link to='/ordenes' style={{textDecoration:'none'}} ><h2 className="perfilGo">Historial de Compras</h2></Link>
        </div>
    )
}