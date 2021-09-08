import {
    GET_BOOKS,
    DETAILS,
    CREATE_BOOK,
    FILTER_CLEAR,
    ORDER_BOOKS,
    FILTER_GENERO_BOOK,
    FILTER_LENGUAGE_BOOK,
    FILTER_PRECIO_BOOK,
    SEARCH_BOOK

} from '../actions/book';

import { ordenar } from '../funciones/ordenar';

const initialState = {
    allBooks: [],
    filteredAllBooks: [], 
    books:[],
    details: {},
}

export default function book(state = initialState, action) {
    const {type, payload}=action
    switch (type) {
       
        case GET_BOOKS:
            return{
                ...state,
                allBooks: payload,
                filteredAllBooks: payload,
                books: payload
            } 
        case  SEARCH_BOOK:
            return {
                ...state,
                books: [...state.allBooks].filter( e => e.titulo.toLowerCase().includes(payload.toLowerCase()) || e.autor.toLowerCase().includes(payload.toLowerCase()))
            }
        case CREATE_BOOK:
            return{
                ...state,
                allBooks: [...state.allBooks,payload],
                filteredAllBooks: [...state.filteredAllBooks,payload],
                books: [...state.books,payload]
            }
        case FILTER_CLEAR:
            return{
                ...state,
                filteredAllBooks: state.allBooks,
                books:state.allBooks
            } 
            
        case ORDER_BOOKS:
            return {
                ...state,
                filteredAllBooks:ordenar(payload,[...state.filteredAllBooks]),
                books:ordenar(payload,[...state.books])  
            }
        case DETAILS:
            return {
            ...state,
            details: payload
        }
        case FILTER_GENERO_BOOK:
            
            return {
                ...state,
                filteredAllBooks: [...state.allBooks].filter(e => e.generos.some((g) => g=== payload)),
                books: [...state.allBooks].filter(e => e.generos.some((g) => g=== payload))
            }
        case FILTER_LENGUAGE_BOOK:
            return{
                ...state,
                books:[...state.filteredAllBooks].filter(e=>e.idioma===payload)
            }
        case FILTER_PRECIO_BOOK:
            return{
                ...state,
                books: [...state.filteredAllBooks].filter(e=>e.precio >= payload.min && e.precio <= payload.max)
            }
        default: return state
    }
}