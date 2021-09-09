import React from "react";
import {useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {deleteWhishlist, postWhishlist} from "../../actions/promoAndDeseos";
import {payloadJWT} from '../../funciones/localStoreFunction';

import "../../styles/producto/producto.scss";
import {BsFillHeartFill} from 'react-icons/bs'

export default function Producto({ titulo, autor, img, precio, id, stock, promo}) {

  const dispatch = useDispatch();

  const token= window.localStorage.getItem('token');

  var user= payloadJWT();

  return (
    
    <div className="libro">
      {stock==='whishlist' && <button onClick={()=>dispatch(deleteWhishlist(id,token))}>Eliminar</button>}
      <div className="producto_PD">
        {promo ? <div className="producto_PD_oferta"><p>Oferta</p></div>: <div className="producto_PD_oferta_i"></div>}
        {user && !user.admin && stock!=='whishlist' ? <button onClick={()=>dispatch(postWhishlist(id,token))} className="producto_PD_deseo"><BsFillHeartFill className="producto_PD_deseo_i" /></button>: <div className="producto_PD_deseo_content"></div>}
      </div>
      <NavLink style={{textDecoration:"none"}}className="libro_link" to={`/details/${id}`}>
      <div className="producto">
        <div>
          <img className="imagen" src={img} alt={titulo}></img>
        </div>
        <div>
          <h2 className="titulo">{titulo}</h2>
        </div>
        <div>
          <p className="autor">{autor}</p>
        </div>
        {stock >= 0? <div>
          <p className="precio"><span className="peso">$:</span> {precio}</p>
        </div>:(stock !== 'whishlist' && <div className="vacio">No hay unidades disponibles</div>)} 
      </div> 
      </NavLink>
    </div>
  );
}
