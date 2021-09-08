export const ADD_CART = 'ADD_CART';
export const REMOVE_ONE_CART = 'REMOVE_ONE_CART';
export const REMOVE_ALL_CART = 'REMOVE_ALL_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const SEE_CART = 'SEE_CART';

const APP ='https://libreriaecommerce.herokuapp.com'

export function addCart (id){
    return async function(dispatch) {
      var book= await fetch(`${APP}/cart/${id}`);
          book= await book.json();
      return dispatch({type:ADD_CART, payload:book})
    };
};
  
export function seeCart(){
    return{
        type: SEE_CART
    };
};

export function removeOneCart(id){
    return {type:REMOVE_ONE_CART, payload:id};
};

export function removeAllCart(id){
    return {type:REMOVE_ALL_CART, payload:id};
};
  
export function clearCart(){

    return {
        type : CLEAR_CART
    };
};

export function addBuyUser (payload,token){
    return async function (dispatch) {
      await fetch (`${APP}/cart`, {
        method: 'POST',
        headers:{
          'x-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      return dispatch ({type: CLEAR_CART})
    };
};

