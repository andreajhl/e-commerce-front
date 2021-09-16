import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import {filterPrecioBook, filterLenguageBook, orderBooks} from "../../../actions/book";

import { RiSoundModuleFill  } from "react-icons/ri";
import { BsArrowLeftRight } from "react-icons/bs";

export default function Ordenamiento () {
    const dispatch = useDispatch()

    const [state, setstate] = useState({
        min:'',
        max:''
    });
    const [idioma,setidioma] = useState();

    const [orden, setorden] = useState();
    
    useEffect(() => {
        dispatch(orderBooks(orden));
    }, [orden, dispatch])

    useEffect(() => {
        dispatch(filterLenguageBook(idioma))
    }, [idioma, dispatch])

    const handleChangePrecio = (e) =>{
        setstate({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmitPrecio = (e) => {
        e.preventDefault();
        dispatch(filterPrecioBook(state));
    }


    return (
        <div className='container_filter' >
          <div className="titulo_leftNavBar">
            <h2 className="titulo_leftNavBar_i" >Catálogo</h2>
          </div>
            <div className="botonesPaginadoOrdenado">
                <div className="contenedor_filtrado">
                  <div className="filtrado_leftNavBar">
                    <RiSoundModuleFill className="filtrado_icon"/>
                    <h3 className="titulo_filtrado">Filtrar</h3>
                  </div>
                  <div className="filtrado_precio">
                    <h3 className="titulo_filtrado_precio">Precio</h3>
                    <div className="menu_filtrado_precio">
                      <input className="precio_min_input" type="number" required placeholder="Mínimo" name='min' value={state.min} onChange={(e)=>handleChangePrecio(e)}></input>
                      <BsArrowLeftRight className="precio_icon"/>
                      <input className="precio_min_input" type="number" required placeholder="Máximo" name='max' value={state.max} onChange={(e)=>handleChangePrecio(e)}></input>
                    </div>
                    <button className={state.min && state.max && Number(state.min) < Number(state.max)? "button_filtrar_precio_activo" : "button_filtrar_precio_inactivo"} onClick={(e)=>handleSubmitPrecio(e)}>Filtrar</button>
                  </div>
                  <div className="filtrado_idioma">
                    <h3 className="titulo_filtrado_idioma">Idioma</h3>
                    <div className="menu_filtrado_idioma">
                      <div className="checkbox_filtro_idioma">
                        <p className="checkbox_filtro_idioma_t">Español</p>
                        <input type='radio' name='idioma' className="checkbox_filtro_idioma_i" value='es' onChange={(e)=>setidioma(e.target.value)}></input>
                      </div>
                      <div className="checkbox_filtro_idioma">
                        <p className="checkbox_filtro_idioma_t">Inglés</p>
                        <input type='radio' name='idioma' className="checkbox_filtro_idioma_i" value='en' onChange={(e)=>setidioma(e.target.value)}></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contenedor_ordenado">
                  <div className="contenedor_ordenado_div">
                    <h3 className="titulo_ordenado">Ordenar por:</h3>
                    <Select
                            id="select"
                            options={[{ value:"A-Z",label:"A-Z"},{ value:"Z-A",label:"Z-A"},{ value:"Mayor_Precio",label:"Mayor a menor"},{ value:"Menor_Precio",label:"Menor a mayor"}]}
                            onChange={(e)=>setorden(e.value)}
                            placeholder='orden'
                        />                    
                  </div>

                </div>
                </div>
        </div>
    )
}
