import React,{useState} from 'react';
import { useDispatch } from 'react-redux';

import {searchByName} from "../../../actions/book";

import { BiSearchAlt } from "react-icons/bi";


export default function Search () {

    const dispatch = useDispatch()

    const[busqueda, setBusqueda] = useState("")

    const handleChange = e =>{ 
        setBusqueda(e.target.value);
        dispatch(searchByName(e.target.value));
    };

    return (
        <div className="searchBar">
            <BiSearchAlt className="search-btn"/>
            <input className="search-input" type="text" placeholder="Buscar por título o autor..."
            autoComplete="on"
            value={busqueda}
            onChange={handleChange}/>
        </div>
    )
}
