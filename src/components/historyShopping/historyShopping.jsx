import React,{ useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getOrdenesUser, getOrdenesAdmin} from '../../actions/ordenes'
import { payloadJWT } from '../../funciones/localStoreFunction';
import CardOrdenes from './cardOrdenes/cardOrdenes';
import {seeCart} from '../../actions/cart';

import Select from 'react-select';
import '../../styles/ordenes/historyShopping.scss';

export default function HistoryShopping(){

    const token= window.localStorage.getItem('token');

    const admin=payloadJWT();

    const dispatch = useDispatch();

    const ordenesDeCompras= useSelector(state => state.ordenes.ordenes);
    
    const [ordenes, setordenes] = useState([])

    useEffect(() => {
        admin.admin ? dispatch(getOrdenesAdmin(token)) : dispatch(getOrdenesUser(token))
        dispatch(seeCart())
    }, [token,admin.admin,dispatch]);

    useEffect(() => {
        setordenes([...ordenesDeCompras])
    }, [ordenesDeCompras]);

    function filtrarOrdenes(estado){
        setordenes([...ordenesDeCompras].filter(e=>e.estado===estado))
    };
 const opcion=[{ value:'creada',label:'Creada'},{ value:'Cancelada',label:'cancelada'},{ value:'procesando',label:'Procesando'},{ value:'completada',label:'Completada'}]

    return (
        <div className='historial_compras_div' >
            <div className='historialCompra'>
                <div className="historial_titulo">
                    <h2 className="historial_titulo_i">Historial de Compras</h2>
                </div>
                <div className="select">
                    <p className='filtro'>Filtrar las compras por estado:</p>
                    <Select 
                        className='select_opciones'
                        options={opcion}
                        onChange={(e)=>filtrarOrdenes(e.value)}
                     />
                </div>
                <div className="historyShop">
                { ordenes && ordenes.length>=1? ordenes.map((e,i)=> <CardOrdenes props={{...e,admin:admin.admin?true:false}} key={i}/>) : <p>Aun no hay compras realizadas</p>} 
                </div>
            </div>
        </div>
    )
}
