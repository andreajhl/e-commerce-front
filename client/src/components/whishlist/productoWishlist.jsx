import React from "react";
import {useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {deleteWhishlist} from "../../actions/promoAndDeseos";

import '../../styles/whishlist/whishlist.scss'
import {TiDelete }from 'react-icons/ti'

export default function Producto({ titulo, autor, img, id, stock}) {

  const dispatch = useDispatch();

  const token= window.localStorage.getItem('token');


  return (
    
    <div className="libro_W">
      <div className="producto_PDW">
        {stock==='whishlist' && <button onClick={()=>dispatch(deleteWhishlist(id,token))} className="producto_PDW_delete"><TiDelete/></button>}
      </div>
      <NavLink style={{textDecoration:"none"}}className="libro_link_W" to={`/details/${id}`}>
      <div className="producto_W">
        <div>
          <img className="imagen_W" src={img} alt={titulo}></img>
        </div>
        <div>
          <h2 className="titulo_W">{titulo}</h2>
        </div>
        <div>
          <p className="autor_W">{autor}</p>
        </div>
      </div> 
      </NavLink>
    </div>
  );
}
