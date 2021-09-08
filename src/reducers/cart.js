import {
    ADD_CART,
    REMOVE_ONE_CART,
    REMOVE_ALL_CART,
    CLEAR_CART,
    SEE_CART
} from '../actions/cart.js';

import {localStore} from '../funciones/localStoreFunction'

const initialState = {
    cart: {}
}

export default function cart(state = initialState, action) {
    const {type, payload}=action

    switch (type) {
        case ADD_CART:
            const addCart= localStore(payload,'add')
            return{
                ...state,
                cart: addCart
            }

        case REMOVE_ONE_CART:
                const removeOneCart=localStore(payload, 'subtract')
                return{
                    ...state,
                    cart:removeOneCart
                }

        case REMOVE_ALL_CART:
                    const removeAllCart = localStore(payload, 'delete')
                    return{
                        ...state,
                        cart: removeAllCart
                    }
        case SEE_CART:
                    const seeCart = localStore('see','see')

                    return{
                        ...state,
                        cart:seeCart
                    }
        case CLEAR_CART:
            const clearCart = localStore( 'clear', 'clear')
            return {
                ...state,
                cart: clearCart
            }
        default: return state
    }
}