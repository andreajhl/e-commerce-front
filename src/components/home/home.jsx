import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBooks, filterGeneroBook, filterClear} from "../../actions/book";
import {getGenders} from '../../actions/generos'
import { seeCart} from '../../actions/cart'
import {getPromos} from '../../actions/promoAndDeseos'
import {promoDesc} from '../../funciones/promos'
import Producto from "../producto/producto";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import undraw from "../../img/undraw.svg"
import gif_carga from "../../img/libros_paginas.gif";
import undraw2 from "../../img/undraw_Gifts.svg"
import { motion } from "framer-motion"
import "../../styles/home/home.scss";

export default function Home () {

  const dispatch = useDispatch()

  const books = useSelector((state) => state.book.books);
  
  const genders = useSelector((state) => state.generos.genders);

  const allBooks = useSelector((state) => state.book.allBooks);

  const profile = useSelector((state) => state.user.profile);

  const promo = useSelector(state => state.promoAndDeseos.promo);

  const token = window.localStorage.getItem('token');

  const [filter, setFilter] = useState([]);

  const [currentPag, setCurrentPag]= useState(0);

  const [items, setItems]=useState(null);
  
  const cards=20;

  const totalPaginas= []

  const APP = window.location.href


  for (let i = 0; i <Math.ceil(books.length / cards); i++) {
    totalPaginas.push(i)
  }

  useEffect(() => {
      dispatch(getAllBooks())
      dispatch(getGenders())
      dispatch(seeCart())
      dispatch(getPromos())
  },[dispatch, token,profile])

  useEffect(() => {
    setItems([...books].splice(0,cards))
  }, [books])

  var librosPromo =promoDesc(allBooks,promo);

  const nextPage = () => {
    const next= currentPag + 1
    const index= next * cards
    setItems([...books].splice(index,cards))
    setCurrentPag(next);
  };
  const prevPage = () => {
    const prev= currentPag-1
    const index= prev * cards
      setItems([...books].splice(index,cards))
      setCurrentPag(prev)
  };
  const numberPage = (e) => {
    const number= Number(e.target.value)
    setItems([...books].splice((number*cards), cards));
    setCurrentPag(number)
    e.preventDefault();
  };

  const typesFilter = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
    dispatch(filterGeneroBook(e.target.id));
    setCurrentPag(0)
  };

  function categoryClear(e){
      e.preventDefault()
      dispatch(filterClear()) 
  };

  const majorMotion = {
    hidden: { opacity: 0 },
    visible: {
      display: 'flex',
      opacity: 1,
      transition: {
        staggerChildren: 3,
        delayChildren: 0.3
      }
    }
  }
  const variantMotion = {
    visible: { opacity: 1, x: 0, transition: {
      repeat: Infinity, duration:2, repeatType: "reverse", repeatDelay: 1.5, type: "tween", bounce: 0.50}},
    hidden: { opacity: 0, x: -100,},
  }

  function searchInput () {
    setTimeout(() => {
       <img className="img_carga" src={gif_carga} alt="Cargando..."/>
    }, 2000);

    if(books.length===0) return (<h2 className="noEncontrado">No hay coincidencias para esta búsqueda...</h2>)
    else {
     return (items && items.map((e, index) => (
        <Producto
          key={index + 1}
          titulo={e.titulo}
          img={e.img}
          autor={e.autor}
          precio={e.precio}
          id={e._id}
          stock={e.stock}
          promo={librosPromo && librosPromo.includes(e._id)? true: false}
      />)))
    }
  }

  return (
    <div className="home">
        <div className='principalHome'>
          <motion.div variants={majorMotion} initial='hidden' animate='visible' className='carouselMajor'>
          <motion.div className="carousel" variants={variantMotion}>
          <img src={undraw} alt="imagenPresentacion" className="imagenPresentacion"></img>
          <div className="titulos_carousel">
            {profile && profile.nombre ? <h2>{`¡Bienvenido ${profile.nombre}!`}</h2>:<h2>¡Bienvenido!</h2>}
            <h4>Compra tus libros esenciales aquí</h4>
           </div>
          </motion.div>
          <motion.div className="carousel" variants={variantMotion}>
         {!profile ? <a className="link_carousel" href={`${APP}/registerUser`}>
            <img src={undraw2} alt="imagenPresentacion" className="imagenPresentacion"></img>
            <div className="titulos_carousel">
                  <h2>Regalos por registro</h2><h4>¡Regístrate gratis y obtén muchos beneficios!</h4>
            </div>
          </a> : <div className="link_carousel" href={`${APP}/registerUser`}>
            <img src={undraw2} alt="imagenPresentacion" className="imagenPresentacion"></img>
            <div className="titulos_carousel">
                 { promo[0] ? (<><h2>¡Aprovecha nuestra Promocion!</h2><h4>{promo[0].porcentaje} % de descuento en </h4><h4>{promo[0].genero.map(e=><label>{e}</label>)}</h4></>): (<><h2>Promociones continuamente</h2><h4>¡Cada semana tenemos nuevas promociones!</h4></>)}
            </div>
          </div>}
          </motion.div>
          </motion.div>
          <div className="e_books"><h1>E-Books</h1></div>
          <div className="paginado">
            {currentPag > 0 &&  <button className="botonPrev" onClick={prevPage}>
                <MdKeyboardArrowLeft/>
              </button>
            }
            {((currentPag + 1 )* cards) < books.length && <button className="botonNext" onClick={nextPage}>
                <MdKeyboardArrowRight/>
              </button>
            }
          </div>
          <div className="botones_generos">
            <div className="box_generos">
              {genders.map((gen) => <button key={gen} id={gen} className="generos" onClick={typesFilter}>{gen}</button>)}
            </div>
            {books.length !== allBooks.length && <button id='cleanButton' className='cleanButton' onClick={categoryClear}>Limpiar filtro</button>}
          </div>
          <div className="books">
            {searchInput()}
          </div>
          <div className="btn_page">{totalPaginas.map((e,i)=><button key={e} className={currentPag / i === e ? "btn_number_default": "btn_number"} value={e} onClick={(e)=>numberPage(e)}>{e+1}</button>)}</div>
        </div>
      </div>
  );
};
