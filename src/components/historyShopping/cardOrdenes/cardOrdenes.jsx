import React from 'react';
import {NavLink} from 'react-router-dom';

import '../../../styles/ordenes/cardOrdenes.scss';

export default function CardOrdenes({props}){

    const {nombre,apellido,_id,productos,estado,valorTotal,fecha,admin}=props;
    
    return (
        
        <div className="pedidosUser">
            <NavLink className="linkCompra" to={`/ordenes/detail/${_id}`}><h2>Compra</h2></NavLink>
            <p className='numCompra'> N° de compra {_id}</p>
            <div>
                {admin && <p className="orden_nombre">{`${nombre} ${apellido}`}</p>}
                <p className="fecha_orden">{`Fecha: ${new Date(fecha).toDateString()}`}</p>
                <p className="estado_orden">Estado: {estado[0].toUpperCase() + estado.slice(1)}</p>
                <div>
                    <h3>Productos</h3>
                    <div className="productos_orden">
                        {productos.map(e=> e.producto && <p className="prod_orden" key={e._id}>{`${e.producto.titulo} ${e.cantidad} U`}</p>)}
                    </div>
                </div>
                <p className="valor_orden"><span className="peso_valor_orden">$</span>{valorTotal}</p>
            </div>
            
        </div>
        
    )
}
