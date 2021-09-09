import {
    GET_PROFILE,
    GET_PROFILES,
    REMOVE_PROFILE
} from '../actions/user.js';

const initialState = {
    profiles:[],
    profile:{},
    user: {}
}

export default function user(state = initialState, action) {

    const {type, payload}=action

    switch (type) {
        case GET_PROFILE:
            return{
                ...state,
                profile:payload

            }
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload
            }
        case REMOVE_PROFILE:
            return{
                ...state,
                profile: {}
            }
        default: return state
    }
}