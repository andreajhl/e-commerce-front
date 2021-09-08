import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

import {createBook} from '../../actions/book'
import {createGender} from '../../actions/generos'

import Form from '../form/form'

export default function CreateProducto(){
    const dispatch = useDispatch()

    const token= window.localStorage.getItem('token')

    const history= useHistory()
    
    const genderAll= useSelector(state=>state.generos.genders)
    
    const [state, setstate] = useState({
        titulo:'',
        autor:'',
        editorial:'', 
        descripcion:'', 
        fecha:'',
        paginas:'',
        img:'',
        idioma:'',
        precio:'',
        stock:''
    });

    const [arrGender, setArrGender]= useState([]);

    function handleChange(e){
        setstate({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    function handleGenders(e){
        setArrGender(e)
    };
    function processImage(e){
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl.readAsDataURL(imageFile)
        imageUrl.onload=(e)=>{
            setstate({...state, img: e.target.result, })
        };
    };

    function handleSubmit(e){
        e.preventDefault();
        arrGender.forEach(e => {
            if (genderAll.indexOf(e.value) === -1){
                return dispatch(createGender({genero:e.value},token))
            };
        });

        const generosValue= arrGender.map(e=>e.value);

        dispatch(createBook({...state,generos:generosValue},token))
        history.push('/');
    };

    return (
        <Form genderAll={genderAll} state={state} arrGender={arrGender}  handleGenders={handleGenders} handleChange={handleChange} handleSubmit={handleSubmit} processImage={processImage} />
    )
}
