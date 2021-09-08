import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {editGenders} from '../../funciones/edit';
import {getGenders,createGender} from '../../actions/generos'
import { deleteGenero } from "../../funciones/delete";

import swal from 'sweetalert';
import "../../styles/generos/generos.scss"

export default function Generos () {

    const dispatch = useDispatch();
    
    const genders = useSelector((state) => state.generos.genders);
    const token = window.localStorage.getItem('token');

    const [state, setstate] = useState({
        create:'',
        cambio:''
    });

    const [div, setdiv] = useState(false);

    useEffect(() => {
        dispatch(getGenders())
    },[dispatch, token]);

    async function removeGenero(e) {
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
        });
        if(mando){
         await deleteGenero(e,token) 
            swal ( " ¡Categoria Eliminado! " , { 
                icon: "success",
                button : false , 
              } ) ;     
            dispatch(getGenders())               
        };
    };

    function handleChange(e){
        e.preventDefault();
        setstate({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    async function edit(e) {
       await editGenders(state.cambio,e,token)  
        dispatch(getGenders())        
        setstate({
            ...state,
            cambio:''
        });
        desplace(e)
    };

    function create() {
        if(!genders.includes(state.create.charAt(0).toUpperCase() + state.create.slice(1))){
             dispatch(createGender({genero:state.create},token))
            setstate({
                ...state,
                create:''
            });
        }else{
            swal ( " ¡Ya existe la categoria! " , { 
                icon: "warning",
                button : false , 
              });
        };
    };
    function desplace(e){
        let campo= document.getElementById(e)
        div? campo.style.display= 'none': campo.style.display='block'
        !div? setdiv(true) : setdiv(false)
    };
    
    return (
        <div className="categorias_menu_admin">
            <h2 className="administrar_categorias">Administrar Categorías</h2>
            <div className="categorias_crear">
                <button onClick={(e)=>create()}>Crear Categoria</button><input type='text' name='create' value={state.create} onChange={(e)=> handleChange(e)} />
            </div>
            <div className="categorias_crear_map">
                {genders.map(e=><div className="genero_map" key={e}> 
                    <button className="genero_categoria" onClick={()=>desplace(e)}>{e}</button>
                    <div className="botones_categoria">
                    <button className="eliminar_categoria"onClick={()=>removeGenero(e)}>Eliminar Categoría</button>
                    <div id={e} style={{display:'none'}}>
                        <div><input placeholder='Modificar Categoría' type='text' name='cambio' value={state.cambio} onChange={(e)=> handleChange(e)}  /></div>
                        <div><button className="guardar_categoria" onClick={()=>edit(e)}>Guardar Cambios</button></div>
                    </div>
                    </div>
                </div>)}
            </div>
            
        </div>
    )
}
