import React from 'react';
import Valoracion from "../valoracion/valoracion";
import Comentarios from "../comentarios/comentarios";
import { useSelector } from 'react-redux';
import {insertaReview} from '../../../../funciones/insertar'

import "../../../../styles/details/review.scss"
import swal from 'sweetalert';


export default function ReviewForm() {
  const token=window.localStorage.getItem('token')
    
    const details = useSelector((state) => state.details);


    
    async function handleSubmitReview(e){
        e.preventDefault()
        let valoracion = 0;
        for( let i=0 ; i<5 ; i++ ) {
            let starStatus = e.target[i].checked
            if( starStatus ) valoracion++;
        }
        
        let review = {
            
            _id: details._id,
            valoracion,
            comentario: e.target[5].value
        }
        
         var review2 = await insertaReview(review, token);
         review2.ok==='comprar' ? swal({title: "Tienes que comprar el libro para dejar una valoracion", icon: "warning",}) :swal({title: "Ya dejaste una valoracion", icon: "warning",})
        
    }
   
    return (
        <form onSubmit={ (e) => handleSubmitReview(e) }>
            <Valoracion />
            <Comentarios />
            <input className="btn_review" type="submit" value='Enviar' />
        </form>
    )
}