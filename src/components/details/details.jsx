import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import {addCart, seeCart} from '../../actions/cart';
import { getDetails} from '../../actions/book' 
// import ReviewForm from './review/reviewForm/reviewForm'
import {payloadJWT} from "../../funciones/localStoreFunction";
import { deleteBook } from '../../funciones/delete';

import gif_carga from "../../img/libros_paginas.gif";
import swal from 'sweetalert';
import '../../styles/details/detail.scss';

export default function Details() {
    
    const dispatch = useDispatch();

    const details = useSelector((state) => state.book.details);

    const { id } = useParams();
    const history= useHistory()

    var token=window.localStorage.getItem('token')

    const { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio, _id } = details;
        
    var a=payloadJWT()

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(seeCart())
    }, [dispatch, id]);
    
    function comprarBoton(){
        let contadorCarrito = document.getElementById('contadorCarrito')
        if(contadorCarrito){
            contadorCarrito = contadorCarrito.innerHTML;
            contadorCarrito = Number(contadorCarrito.substring(1));
        }else{
            contadorCarrito = 0;
        }
        
        if(contadorCarrito +1 <= stock){
            dispatch(addCart(id)) 
            
        }else{
            swal ( " ¡No hay más libros en Stock! " , { 
                icon: "error",
                botón : false , 
            }) ;
        }
    }

    // if(review) {
            
    //     var estrellas = (estrellita) => {
    //         let estrellas = [];
    //         for (let i = 0; i < estrellita; i++) {
    //             estrellas.push(<p className="estrellas">★</p>)
                
    //         }
    //         return estrellas
    //     }  
    // }

    async function removeBook(id,token){
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
            await deleteBook(id,token) 
            swal ( " ¡Producto Eliminado! " , { 
                icon: "success",
                botón : false , 
              } ) ;
            history.push('/')                      
        };
    };

    if(titulo) {
        
        return (
            <div className='details'>
                <div className="detalles_izq">
                    <div className="imagen_detail">
                             <img className="imagen_detail_i" src={img} alt={`imagen de portada del libro: ${titulo}`} />
                        </div>
                    <div className="detail_info">
                        <div className="detail_info_div">
                            <p className="detail_p">Generos:</p>
                            <p className="detail_texto">{generos.join(", ")}</p>
                        </div>
                        <div className="detail_info_div">
                            <p className="detail_p"> Idioma: </p>
                            <p className="detail_texto"> {idioma}</p>
                        </div>
                        <div className="detail_info_div">
                            <p className="detail_p">Paginas: </p>
                            <p className="detail_texto">{paginas}</p>
                        </div>
                        <div >
                            <p className="detail_p">Publicación:</p>
                            <p className="detail_texto">{new Date(fecha).toDateString()}</p>
                        </div> 
                      { a && a.admin? <button className="boton_editar"><NavLink className="btn_editar" style={{textDecoration:'none'}} to={`/edit/${_id}`} >Edit</NavLink></button>:null}

                    </div>
                </div>
                <div className="contenido_details">
                    {a && a.admin ? false : <button className={stock<= 0? "vacio_detail": "comprar_detail"} onClick={comprarBoton}>Comprar</button>}
                    {a && a.admin && <button className="btn_Eliminar"onClick={()=> removeBook(id,token)}>Eliminar</button> }
                    <div className="titulo_detail">
                      <h2 className="titulo_detail_i">{titulo}</h2>
                    </div>
                    <div className="autor_editorial">
                        <h3 className="autor_detail_der">{autor}</h3>
                        <p className="guion_der">-</p>
                        <p className="editorial_der">{editorial}</p>
                    </div>
                    <div className='precio_detalle'>
                        <p className="precio_peso">$</p>
                        <p className="precio_numero">{precio}</p>
                    </div>
                    <div className='stock'>
                        <p className={stock<= 0? "stock_vacio": "stock_unidad"}>{stock<=0? "No hay unidades disponibles":`Quedan ${stock} unidades`}</p>
                    </div>
                    <div className='descripcion'>
                        <p className="descripcion_titulo">Reseña</p>
                        <p className="descripcion_contenido">{descripcion}</p>
                    </div>
                    {/* <div className="opiniones">
                         <h2 className="titulo_valoracion">Review</h2>
                        {review >0 ? <div>   
                           
                            {review.map((r,i)=>(
                                <div key={i} className="valoraciones">
                                    <h4>{r.nombre + " " + r.apellido}</h4>
                                    <p>{estrellas(r.valoracion)}</p>
                                    <p className="comentario_usuario">" {r.comentario} "</p>
                                </div>
                            ))}
                        </div> : <p className='sinReview'>Se el primero en comentar</p>
                        }
                    </div>
                    {a && !a.admin && <div><ReviewForm /></div>} */}
                </div>
            </div>
        )
    } else {
        return <img src={gif_carga} alt="Cargando..."/>
    }
}