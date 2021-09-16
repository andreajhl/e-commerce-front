import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/opciones/opcionesAdmin.scss'

export default function OpcionesAdmin (){

    return (
        <div className="opcionesAdmin">
            <div className="opcionesAdmin_div">
                <h1>Bienvenido Admin</h1>
                <Link to='/profiles' style={{textDecoration:'none'}}><p className="perfiles">Perfiles de Usuarios</p></Link>
                <Link to='/ordenes' style={{textDecoration:'none'}}><p className="perfiles">Órdenes de Compras</p></Link>
                <Link to='/add' style={{textDecoration:'none'}}><p className="agregar">Agregar Producto</p></Link>
                <Link to='/categorias' style={{textDecoration:'none'}}><p className="agregar">Categorias</p></Link>
                <Link to='/add_promo' style={{textDecoration:'none'}}><p className="categorias">Crear promocion</p></Link>
                <Link to='/promos' style={{textDecoration:'none'}}><p className="categorias">Promos vigentes</p></Link>                
            </div>

        </div>
    );
};