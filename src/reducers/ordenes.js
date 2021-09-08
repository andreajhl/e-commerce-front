import {
    GET_ORDENES,
    ORDEN_DETAIL
}from '../actions/ordenes.js';

const initialState = {
    ordenes:[],
    ordenDetail:{}
}

export default function ordenes(state = initialState, action) {

    const {type, payload}=action

    switch (type) {
        case GET_ORDENES:
            return{
                ...state,
                ordenes:payload
            }
        case ORDEN_DETAIL:
            return{
                ...state,
                ordenDetail:payload
            } 
        default: return state
    }

}