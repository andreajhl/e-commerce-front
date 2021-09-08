import React from 'react';
import CreatableSelect from 'react-select/creatable';

import '../../../styles/promo/promoGenero.scss';

export default function PromoGenero({dias, date, state, generos, diasPromo, opcionGenero, handleSubmit, handleDias, handleGenders, handleChange}) {

    return (
        <div className="form_promos_contenedor">
            <h2 className="form_promos_titulo">Descuento por Categoría</h2>
            <div className="form_promos">
                <form>
                    <div className="form_promos_duracion">
                        <h3>Duración</h3>
                        <div className="fecha_inicio_promo">
                            <p>Selecciona la fecha de Inicio</p>
                            <input className="calendario_promo" type='date' name='fechaInicio' value={state.fechaInicio} min={date} require onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="fecha_fin_promo">
                            <p>Selecciona la fecha de Fin</p>
                            <input className="calendario_promo"  type='date' min={state.fechaInicio} name='fechaFinal' value={state.fechaFinal} require onChange={(e)=>handleChange(e)} />                
                        </div>
                    </div>
                    <div className="reglas_promociones">
                        <h3>Reglas</h3>
                        <p>Días de Promoción</p>
                        <CreatableSelect
                            options={dias}
                            placeholder="Seleccionar..."
                            isMulti
                            onChange={(e)=>handleDias(e)}
                            className="tabla_promo"
                        />  
                        <p>Género en Promoción</p>
                        <CreatableSelect
                            options={opcionGenero}
                            placeholder="Seleccionar..."
                            isMulti
                            onChange={(e)=>handleGenders(e)}
                            className="tabla_promo"
                        />   
                        <p className="procentaje_descuento_promo">Porcentaje de descuento</p>
                        <p><input className="porcentaje_barra" type='range' name='porcentaje' value={state.porcentaje} require onChange={(e)=>handleChange(e)} /> <span className="porcentaje_promo">{state.porcentaje}%</span></p>
                        {state.fechaInicio && state.fechaFinal && diasPromo.length>0 && generos.length>0 && <button onClick={(e)=>handleSubmit(e)}>Crear</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}
