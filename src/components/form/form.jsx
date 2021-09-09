import React from 'react';
import CreatableSelect from 'react-select/creatable';

import '../../styles/form/form.scss';
import undraw from "../../img/tree_book.svg";

export default function Form ({state, genderAll, handleChange, handleSubmit, handleGenders, processImage}) {


    var direccion= window.location.pathname;

    
    const options = genderAll.map(e=>({ value:e,label:e}));
    
    return (
        <div className='container_form_div'>
            <div className="contenedor_general_form">
                <form className='form'>
                    <div className='cuerpo_form'>
                        <div className='primer_form'>
                        <h1 className='titulo-form'>{direccion==="/add"?"Registra un nuevo libro":"Editar libro"}</h1>
                            <div className="contenedor_form_newbook_left"> 
                                <p className="titulo_book_form">Título</p>
                                <input className='inputsFom' type='text' required  minLength='4' autoComplete='off' name='titulo' placeholder="Título del nuevo libro" value={state.titulo} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_right">
                                <p className="titulo_book_form">Autor</p>
                                <input className='inputsFom' type='text' required  minLength="4" autoComplete='off' name='autor' placeholder="Autor del nuevo libro" value={state.autor} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_left">
                                <p className="titulo_book_form_editorial">Editorial</p>
                                <input className='inputsFom' type='text' required  minLength="4" autoComplete='off' name='editorial' placeholder="Editorial del nuevo libro" value={state.editorial} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_right_genero">
                                <p className="titulo_book_form_genero">Géneros</p>
                                <CreatableSelect
                                className='menu_genero'
                                placeholder="Seleccionar..."
                                isMulti
                                options={options}
                                onChange={(e)=>handleGenders(e)}
                                />
                            </div>
                            <div className="contenedor_form_newbook_left">
                                <p className="titulo_book_form_descripcion">Descripción</p>
                                <textarea className='inputsFom_descripcion' type='text' minLength='20' placeholder="Descripción del nuevo libro..." required autoComplete='off' name='descripcion' value={state.descripcion} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_left">
                                <p className="titulo_book_form_fecha">Fecha de Publicación</p>
                                <input className='inputsFom' type='date' required autoComplete='off' name='fecha' value={state.fecha} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_right">
                                <p className="titulo_book_form_paginas">Número de Páginas</p>
                                <input className='inputsFom' type='number' min='0' placeholder="356" required autoComplete='off' name='paginas' value={state.paginas} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_left">
                                <p className="titulo_book_form_precio">Precio</p>
                                <input className='inputsFom' type='number' required min='0' placeholder="$450.99" autoComplete='off' name='precio' value={state.precio} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_right">
                                <p className="titulo_book_form_stock">Stock</p>
                                <input className='inputsFom' type='number' required min='0' placeholder="33" autoComplete='off' name='stock' value={state.stock} onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div className="contenedor_form_newbook_left">
                                <p className="titulo_book_form_idioma">Idioma</p>
                                <div className="contenedor_form_newbook_left_idioma">
                                    <div className="contenedor_es">
                                        <p className="titulo_idiomas">Español</p>
                                        <input className="checkbox_idioma" type='radio' required autoComplete='off' name='idioma' value='es' onChange={(e)=>handleChange(e)}/>
                                    </div>
                                    <div className="contenedor_in">
                                        <p className="titulo_idiomas">Inglés</p>
                                        <input className="checkbox_idioma" type='radio' required autoComplete='off' name='idioma' value='en' onChange={(e)=>handleChange(e)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="contenedor_form_newbook_imagen">
                                <p className="titulo_book_form_imagen">Imagen</p>
                                <div className="contenedor_img_newbook">
                                {state.img && state.img.length > 1 && <img className="img_new_book" src={state.img} alt='foto de libro'/>}
                                </div>
                                <input className="input_imagen_newbook" type="file" required accept="image/*" onChange={(e)=>processImage(e)}/>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="contenedor_img_button_confirm">
                    <img className="img_tree_book" src={undraw} alt="lectura bajo los arboles"/>
                    {
                        state.titulo && state.autor && state.editorial && state.descripcion 
                        && state.fecha && state.paginas && state.img && state.idioma && state.precio 
                        && state.stock && (<button className="button_confirm_newbook" onClick={(e)=>handleSubmit(e)} >{direccion==="/add"?"Crear":"Editar"}</button>) 
                    }
                </div>          
        </div>
  
        </div>   
    )
}
