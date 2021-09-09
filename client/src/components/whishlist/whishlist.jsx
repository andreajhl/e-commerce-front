import React,{ useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getWhishlist} from '../../actions/promoAndDeseos';
import Producto from './productoWishlist';

import '../../styles/whishlist/whishlist.scss'

export default function Whishlist () {
    
    const token= window.localStorage.getItem('token');

    const dispatch = useDispatch();

    const state = useSelector(state => state.promoAndDeseos.whishlist);

    useEffect(() => {
        dispatch(getWhishlist(token))
    }, [token,dispatch]);


    return (
        <div className='wishlist'>
            <div className='wishlist_container'>
                {
                    state.map(e=><Producto 
                        key={e.producto._id}
                        titulo={e.producto.titulo} 
                        autor={e.producto.autor} 
                        img={e.producto.img} 
                        id={e.producto._id}
                        stock={'whishlist'}
                    />)
                 }  
            </div>

        </div>
    );
};
