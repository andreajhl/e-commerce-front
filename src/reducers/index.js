import { combineReducers } from 'redux'
import user from './user'
import cart from './cart'
import generos from './generos'
import book from './books'
import  ordenes from './ordenes'
import promoAndDeseos from './promo&deseos'

export default combineReducers({
    user,
    cart,
    generos,
    book,
    ordenes,
    promoAndDeseos
})