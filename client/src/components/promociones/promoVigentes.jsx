import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

import { getPromos } from '../../actions/promoAndDeseos';
import { deletePromo } from '../../funciones/delete';

import swal from 'sweetalert';
import '../../styles/promo/promoVigentes.scss';


export default function PromoVigentes () {

    const dispatch = useDispatch();
    const history=useHistory();

    const state = useSelector(state => state.promoAndDeseos.promo);

    var token= window.localStorage.getItem('token')

    useEffect(() => {
        dispatch(getPromos())
    }, [dispatch]);
    
    async function eliminar(id) {
        var mando= await swal ( " ¿Seguro que quieres eliminarlo? " , { 
            dangerMode: true,
            buttons: {
                cancel: {
                  text: "Cancel",
                  value: false,
                  visible: true,
                  closeModal: true,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  closeModal: true
                }
              }
        })
        if(mando){
            await deletePromo(id,token) 
            swal ( " ¡Promo Eliminada! " , { 
                icon: "success",
                botón : false , 
              } ) ;
            history.push('/promos')                      
        };
    };
    
    return (
        <div className="promo_vigente">
            <h2 className="promo_vigente_titulo">Promociones Vigentes</h2>
            <div className="promos_vigentes">
            {state.map((e,i)=><div key={i} className="promo_card">
                <p className="promo_card_titulo">Promo {i+1}</p>
                <div className="promo_card_fecha">
                <p>De: <span>{new Date(e.fechaInicio).toDateString()}</span> </p> 
                <p>Hasta: <span> {new Date(e.fechaFinal).toDateString()}</span></p>
                </div>
                <div className="detalles_promo_vigente">
                    <p className="detalles_promo_vigente_titulo">Detalles</p>
                    <p className="detalles_promo_vigentes_categorias">Categoría/s en descuentos:</p> 
                    <p className="detalles_promo_genero">{e.genero.join(', ').replace(/,/g,' ')}</p>
                    <p className="detalles_promo_dias">Días de descuento:</p> 
                    <p className="detalles_promo_dias_nombre">{e.dias.join(', ')}</p>
                </div>
                <button className="detalles_promo_eliminar" onClick={()=>eliminar(e._id)}>Eliminar</button>
            </div>
            )}
            </div>
        </div>
    )
}
