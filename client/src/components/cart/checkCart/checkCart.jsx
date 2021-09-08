import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';

import {CardElement,useElements, useStripe} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import {addBuyUser, seeCart} from '../../../actions/cart';
import {getPromos} from '../../../actions/promoAndDeseos';
import {promoDescPrecioFinal} from '../../../funciones/promos';

import swal from 'sweetalert';
import "../../../styles/cart/checkCart.scss"

const stripePromise = loadStripe("pk_test_51JQAouFWmGEeX4odlkQmbhbHUp3CKtVyX8x3IAZOECCAv0E7LUzOZJoUyBS8C5LTiPBgpQNd3ZdNb2oBfZeRZFCR00fcFxXLfG")


export default function CheckCart(){
    const dispatch = useDispatch()
    const history= useHistory()
    
    const promo = useSelector(state => state.promoAndDeseos.promo)
    const carts = useSelector((state)=>state.cart.cart)

    const [state,setState]= useState({
        pais:'',
        ciudad:'',
        calle:'',
        codigoPostal:''
    })
 
    const token= window.localStorage.getItem('token')

    const arrayCart=[]

    let precioTotal= 0  

    var compras=[]

    useEffect(() => {
        dispatch(seeCart())
        dispatch(getPromos())
    },[dispatch])
    
    for (const i in carts) {
        arrayCart.push(carts[i])
        compras.push({producto:carts[i].id,cantidad:carts[i].count})
        precioTotal+=carts[i].precio*carts[i].count
    }

    var librosPromoPrecio = promoDescPrecioFinal(carts,promo,precioTotal)

    function handleChange(e){
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };
    
    const Payment = () => {

        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async(e) => {
            e.preventDefault();

            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type:"card",
                card: elements.getElement(CardElement)
            })
            if(!error) {
                const {id} = paymentMethod;
                let pago = {
                    productos:compras,
                    direccion: `${state.pais}/ ${state.ciudad}, ${state.calle},CP: ${state.codigoPostal}`,
                    valorTotal:Math.round(precioTotal),
                    pago:id
                }
                dispatch(addBuyUser(pago,token))
                swal("Gracias por su Compra", "recibira un email con los detalles", "success");
                history.push('/')
            }
        }
        return( 
            <form className= "form_compra" onSubmit={handleSubmit}>
                <CardElement className="tarjeta"/>      
                {state.pais && state.calle && state.codigoPostal && <button className="btn_pasarela_compra">
                    Comprar
                </button>}
            </form>
        )
    }
    return (
        <div className="pasarela">
            <h1 className="titulo_principal_pasarela">Resumen de la compra</h1>
            <div className="pasarela_div">
                {token ? (<div className="contenedor_facturacion">
                    <p className="facturacion_pasarela">Facturación</p>     
                    <p className="direccion_pasarela">Dirección de envío</p>
                    <div className="datos_personales_pasarela">
                        <div>
                            <label>País</label>  
                            <input type='text' required autoComplete='country-name' name='pais' value={state.pais} onChange={(e)=>handleChange(e)} />    
                        </div>
                        <div>
                            <label>Ciudad</label> 
                            <input type='text' required autoComplete='off' name='ciudad' value={state.ciudad} onChange={(e)=>handleChange(e)}/>    
                        </div>
                        <div>
                            <label>Calle</label>  
                            <input type='text' required autoComplete='street-address' name='calle' value={state.calle} onChange={(e)=>handleChange(e)} />     
                        </div>
                        <div>
                            <label>Código Postal</label>  
                            <input type='number' required autoComplete='postal-code' name='codigoPostal' value={state.codigoPostal} onChange={(e)=>handleChange(e)}/>    
                        </div>
                </div>
                    <div className='tarjeta_pago'>
                        <Elements  stripe={stripePromise}>
                            <Payment />
                        </Elements>                      
                    </div>
                </div>): (<div>
                    <p>Para continuar con la compra debes Iniciar sesión</p>
                </div>)} 
                <div className="contenedor_pasarela">
                    <div className="pasarela_card">
                        {arrayCart.map(e=>(<div key={e._id} className="pasarela_cdtm">
                                <div>
                                <img className="imagen_pasarela"alt="imagen_pasarela"src={e.img}></img>
                                </div>
                                <div className="pasarela_info">
                                <p className="titulo_pasarela">{e.titulo}</p>
                                <p className="autor_pasarela">{e.autor}</p>
                                <p className="editorial_pasarela">{e.editorial}</p>
                                <p className="unidades_pasarela">Unidades: {e.count}</p>
                                <p className="precio_pasarela"><span className="peso_pasarela">$</span> {e.precio * e.count}</p>
                                </div>
                            </div>)
                        )}
                    </div>
                    <div className="datos_pasarela">
                        <p className='neto_pasarela'>Sub-Total: <span className="subtotal_pasarela">$ {precioTotal.toFixed(2)} </span> </p>
                        <p className='neto_pasarela'>iva: <span className="subtotal_pasarela">$ {(precioTotal* 0.1).toFixed(2)}</span> </p>
                        {librosPromoPrecio > 1 && <p className='neto_pasarela'>Descuento:   <span className="subtotal_pasarela_descuento">- ${Math.round(precioTotal-librosPromoPrecio)}</span></p>}
                        <p className='total_pasarela'>{librosPromoPrecio>0? 'Total con Descuento': 'Total'}:<span className="total_numero_pasarela">$ {librosPromoPrecio>0? Math.round(librosPromoPrecio + librosPromoPrecio* 0.1):(Math.round(precioTotal+precioTotal* 0.1))}</span></p>
                    </div>
                </div>               
            </div>

        </div>
    )
}