export const GET_PROMOS = 'GET_PROMOS';
export const WHISHLIST = 'WHISHLIST';

const APP = 'http://localhost:4000'

export function getPromos (){
    return async function (dispatch){
      var promos= await fetch (`${APP}/promo`);
      promos= await promos.json();
      return dispatch({type: GET_PROMOS, payload:promos})
    };
};
  
export function getWhishlist(token) {
    return async function (dispatch){
      let whishlist = await fetch (`${APP}/auth/whishlist`,{
        method: 'GET',
        headers:{
          'x-token':token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
        whishlist =await whishlist.json()
        return dispatch({type:WHISHLIST, payload: whishlist})
    };
};
  
export function postWhishlist (idProducto,token){
    return async function (dispatch) {
      let whishlist= await fetch (`${APP}/auth/whishlist/${idProducto}`, {
          method: 'POST',
          headers:{
            'x-token':token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        whishlist= await whishlist.json()
        return dispatch ({type:WHISHLIST, payload:whishlist})
    };
};
  
export function deleteWhishlist (idProducto,token){
    return async function (dispatch) {
      let whishlist= await fetch (`${APP}/auth/whishlist/${idProducto}`, {
          method: 'DELETE',
          headers:{
            'x-token':token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        whishlist= await whishlist.json()
        return dispatch ({type:WHISHLIST, payload:whishlist})
    };
};

