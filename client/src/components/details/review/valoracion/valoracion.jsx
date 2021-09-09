import React from 'react';

import "../../../../styles/details/review.scss"
import {colorea} from '../../../../funciones/insertar';

export function Valoracion(){

    return(
        <div className='valoracion'>
          <input className='radioStar' type="checkbox" name="estrellas" id="radio1" />
          <label className='star' id='1' onClick={(e) => colorea(e)}>★</label>
          
          <input className='radioStar' type="checkbox" name="estrellas" id="radio2" />
          <label className='star' id='2' onClick={(e) => colorea(e)}>★</label>
          
          <input className='radioStar' type="checkbox" name="estrellas" id="radio3" />
          <label className='star' id='3' onClick={(e) => colorea(e)}>★</label>
          
          <input className='radioStar' type="checkbox" name="estrellas" id="radio4" />
          <label className='star' id='4' onClick={(e) => colorea(e)}>★</label>
          
          <input className='radioStar' type="checkbox" name="estrellas" id="radio5" />
          <label className='star' id='5' onClick={(e) => colorea(e)}>★</label>
        </div>
    )
}

export default Valoracion;