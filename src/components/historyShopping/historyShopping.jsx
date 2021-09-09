import React,{ useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getOrdenesUser, getOrdenes} from '../../actions/ordenes'
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
        admin.admin ? dispatch(getOrdenes(token)) : dispatch(getOrdenesUser(token))
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
        <div >
            {admin.admin ?(
            <div className='historialCompra'>
                <h2 className="historial_titulo">Historial de Pedidos</h2>
                <div className="select_opciones">
                    <p className='filtro'>Filtrar las compras por estado:</p>
                    <Select className='select'
                        options={opcion}
                        onChange={(e)=>filtrarOrdenes(e.value)}
                     />
                </div>
                <div className="historyShop">
                {ordenes.length>0? ordenes.map(e=> <CardOrdenes props={{...e,admin:true}} key={e._id}/>) : <p>Aun no hay compras realizadas</p>} 
                </div>
            </div>):
            ( <div className='historialCompra'>
                <h2 className="historial_titulo">Historial de Compras</h2>
                <div className="select_opciones">
                <p className='filtro'>Filtrar las compras por estado:</p>
                <Select className='select'
                        options={opcion}
                        onChange={(e)=>filtrarOrdenes(e.value)}
                    />
                </div>
                <div  className="historyShop">
                {ordenes.length>0? ordenes.map(e=> <CardOrdenes props={{...e,admin:false}} key={e._id}/>):<p>Aun no hay compras realizadas</p>} 
                </div>
            </div>)
            }
        </div>
    )
}
