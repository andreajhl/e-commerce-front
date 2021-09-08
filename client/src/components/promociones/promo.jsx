import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


import {createPromo} from '../../funciones/insertar';
import { getGenders } from '../../actions/generos';

import PromoGenero from './formPromo/promoGenero';

export default function Promo () {

    const dispatch = useDispatch();
    const history= useHistory();
    
    const token=window.localStorage.getItem('token');

    const genders= useSelector(state=>state.generos.genders);
   
    useEffect(() => {
        dispatch(getGenders())
    }, [dispatch]);

    const [state, setstate] = useState({
        fechaInicio:'',
        fechaFinal:'', 
        porcentaje:'', 
    });


    const [generos, setgeneros]= useState([]);
    const [diasPromo, setdiasPromo]= useState([]);

    function handleChange(e){
        setstate({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    function handleGenders(e){
     setgeneros(e)
    }

    function handleDias(e){
        setdiasPromo(e)
    }

   async function handleSubmit(e){
        e.preventDefault();
        const generosValue= generos.map(e=>e.value)
        const diasValue= diasPromo.map(e=>e.value)
        await createPromo({...state,genero:generosValue,dias:diasValue},token)
        history.push('/promos')
    };
    
    const opcionGenero=genders.map(e=>{
        return {value:e, label: e}
    });

    opcionGenero.push({value:'All', label: 'Todos los generos'});

    const dias=[
        { value:'Mon',label:'Lunes'},
        { value:'Tue',label:'Martes'},
        { value:'Wed',label:'Miercoles'},
        { value:'Thu',label:'Jueves'},
        { value:'Fri',label:'Viernes'},
        { value:'Sat',label:'Sabado'},
        { value:'Sun',label:'Domingo'},
        { value:'All',label:'Todos los Dias'}
    ];

    var date = new Date();
    date=date.toISOString().split('T')[0];
  
    return (
             <div >
                    <PromoGenero dias={dias} date={date} state={state} generos={generos} diasPromo={diasPromo} opcionGenero={opcionGenero} handleSubmit={handleSubmit} handleDias={handleDias} handleGenders={handleGenders} handleChange={handleChange} />
             </div>
    )
}
