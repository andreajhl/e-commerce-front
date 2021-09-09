export const GET_BOOKS = 'GET_BOOKS';
export const DETAILS = 'DETAILS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const FILTER_CLEAR =   'FILTER_CLEAR';
export const ORDER_BOOKS =   'ORDER_BOOKS';
export const SEARCH_BOOK = 'SEACRH_BOOK';
export const FILTER_GENERO_BOOK = 'FILTER_BOOK';
export const FILTER_LENGUAGE_BOOK = 'FILTER_LENGUAGE_BOOK';
export const FILTER_PRECIO_BOOK = 'FILTER_PRECIO_BOOK'


const APP = 'http://localhost:4000'

export function getAllBooks(){
    return async function(dispatch){
        let books=await fetch(`${APP}/productos`)
            books= await books.json()
        return dispatch({type:GET_BOOKS, payload:books})
    }
};

export function createBook(payload,token){
    return async function (dispatch){
        var book= await fetch(`${APP}/productos`,{
            method: 'POST',
            headers:{
                'x-token':token,
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        })
        const res= await book.json();
        return dispatch ({type: CREATE_BOOK, payload:res});
    };
};

export function filterClear(){
    return{
      type:FILTER_CLEAR
    }; 
};

export function getDetails(id){
    return async function(dispatch){
      let detail=await fetch(`${APP}/productos/${id}`)
          detail= await detail.json()
        return dispatch({type: DETAILS,payload: detail})
    };
};

export function searchByName(titulo){
    return{
      type: SEARCH_BOOK,
      payload: titulo
    }
};

export function orderBooks(orden ) {
  
    return {
      type : ORDER_BOOKS,
      payload: orden
    }
};

export function filterGeneroBook(genero) {
    return {
      type: FILTER_GENERO_BOOK,
      payload: genero,
    };
};

export function filterLenguageBook(idioma) {
    return {
      type: FILTER_LENGUAGE_BOOK,
      payload: idioma,
    };
};

export function filterPrecioBook(precio) {
    return {
      type: FILTER_PRECIO_BOOK,
      payload: precio,
    };
};
