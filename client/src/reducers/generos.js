import {
    GET_GENDERS,
    CREATE_GENDER,
} from '../actions/generos.js';

const initialState = {
    genders:[]
}

export default function generos(state = initialState, action) {

    const {type, payload}=action

    switch (type) {

        case GET_GENDERS:
            return{
                ...state,
                genders: payload
            }
        case CREATE_GENDER:
        
            return{
                ...state,
                genders:[ ...state.genders,payload.genero]
            }
        default: return state
    }
}