import React from 'react';
import {NavLink} from 'react-router-dom';

import '../../../styles/ordenes/cardOrdenes.scss';

export default function CardOrdenes({props}){

    const {user,_id,productos,estado,valorTotal,fecha,admin}=props;

    return (
        
        <div className="pedidosUser">
            <div>
                <NavLink className="linkCompra" to={`/ordenes/detail/${_id}`}><h3>Compra</h3></NavLink>
                <p className='numCompra'> N° {_id}</p>
            </div>
            <div>
                {admin && <p className="orden_nombre">{`${user.nombre} ${user.apellido}`}</p>}
                <p className="fecha_estado">{`Fecha: ${new Date(fecha).toDateString()}`}</p>
                <p className="fecha_estado">Estado: {estado[0].toUpperCase() + estado.slice(1)}</p>
                <div className='orden_div'>
                    <h3 className="productos_orden_t">Productos</h3>
                    <div className="productos_orden">
                        {productos.map(e=> e.producto && <p className="prod_orden" key={e._id}>{`${e.producto.titulo} ${e.cantidad} U`}</p>)}
                    </div>
                     <p className="valor_orden"><span className="peso_valor_orden">$</span>{valorTotal}</p>
                </div>
               
            </div>
            
        </div>
        
    )
}
