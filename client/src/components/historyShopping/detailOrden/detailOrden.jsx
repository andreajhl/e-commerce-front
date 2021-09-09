import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router";
import {NavLink} from 'react-router-dom';

import {getOrdenesID,updateOrden} from '../../../actions/ordenes';
import { payloadJWT } from '../../../funciones/localStoreFunction';
import {seeCart} from '../../../actions/cart';

import Select from 'react-select';
import '../../../styles/ordenes/detailOrden.scss';

export default function DetailOrdenAdmin (){

    const dispatch = useDispatch();

    const {id} = useParams();

    const state = useSelector(state => state.ordenes.ordenDetail);

    const {user,productos}=state

    let token= window.localStorage.getItem('token');

    const {admin}=payloadJWT();

    var opcion1=[{ value:'cancelada',label:'Cancelada'},{ value:'procesando',label:'Procesando'}];
    var opcion2=[{ value:'cancelada',label:'Cancelada'},{ value:'completada',label:'Completada'}];

    useEffect(() => {
        dispatch(getOrdenesID(id))
        dispatch(seeCart())
    }, [dispatch,id]);

    return (
        <div className="detalle_compra">
            <h2 className="detalle_compra_titulo">Resumen de la compra</h2>
            <div className='detailCompra'>
                { state.user ?(<div>
                    <div>
                        <h2 className="datos_comprador">Datos del comprador</h2>
                        <p className='datosUser'>{`${user.nombre} ${user.apellido}`}</p>
                        <p className='mailUser'>{`${user.email}`}</p>
                    </div>
                    <div>
                        <h2 className="datos_compra">Datos de la compra</h2> 
                        <p className="numero_compra">N° de Compra: {state._id}</p>
                        <p className="fecha_compra">Fecha: {new Date(state.fecha).toDateString()}</p>
                    <div>
                        <p className="productos_compra">Productos</p>
                        {productos.map(e=> <div className="datos_libro_detalle"key={e._id}>
                                <p className="cantidad_detalle_compra">x{e.cantidad}</p>
                                <NavLink className=""style={{"textDecoration": "none"}}to={`/details/${e.producto._id}`}><p className="titulo_detalle_compra">{`${e.producto.titulo}`}</p></NavLink>
                            <div className="precio_datos_compra_detalle">
                                <p className="precio_datos_compra"><span className="peso_dato_compra">$ </span>{e.cantidad * e.producto.precio}</p>

                            </div>
                        </div>
                        )}
                        <div className="total_compra_titulo">
                        <p className="total_compra_detalle">Total:</p>
                        <div className="precio_total_compra_detalle">
                            <p className="valor_total_compra"><span className="peso_total_compra">$</span>{state.valorTotal}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="direccion_envio_detalle">
                        <h2>Dirección de Envío</h2>
                        <p>{state.direccion}</p>
                    </div>
                    <div className="estado_pedido_orden">
                    <p className="estado_pedido">Estado del Pedido: <span>{state.estado[0].toUpperCase() + state.estado.slice(1)}</span></p>
                    {admin && state.estado!=='completada' && state.estado!=='cancelada' &&<Select
                            options={state.estado==='creada'? opcion1 : opcion2}
                            onChange={(e)=>dispatch(updateOrden(e.value,state._id,token))}
                        />}
                    </div>
                </div>):(<p>Cargando...</p>)}
            </div>
        </div>
    )
}
