import {
    GET_PROMOS,
    WHISHLIST

} from '../actions/promoAndDeseos.js';

const initialState = {
    promo:[],
    whishlist:[]
};

export default function promoAndDeseos(state = initialState, action) {
    const {type, payload}=action

    switch (type) {
        case GET_PROMOS:
            return{
                ...state,
                promo:payload,
            }
        case WHISHLIST:
            return{
                ...state,
                whishlist: payload.msg? [...state.whishlist] : payload 
            }

        default: return state
    }
}