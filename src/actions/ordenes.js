export const GET_ORDENES = 'GET_ORNDES';
export const ORDEN_DETAIL = 'ORDEN_DETAIL';


const APP = 'https://libreriaecommerce.herokuapp.com'

export function getOrdenesAdmin(token){
    return async function(dispatch) {
      let ordenes= await fetch(`${APP}/orden/admin`,{
        method:'GET',
        headers:{
          'x-token':token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
        ordenes= await ordenes.json();
        return dispatch({type:GET_ORDENES, payload:ordenes})
    };
};

export function getOrdenesID(idOrden){
    return async function(dispatch) {
      let orden= await fetch(`${APP}/orden/${idOrden}`);
        orden= await orden.json();
        return dispatch({type:ORDEN_DETAIL, payload:orden})
    };
  
};
  
export function getOrdenesUser(token){
    return async function (dispatch) {
      let ordenesUser= await fetch (`${APP}/orden`, {
          method: 'GET',
          headers:{
            'x-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        ordenesUser= await ordenesUser.json()
        return dispatch ({type: GET_ORDENES, payload:ordenesUser})
    };
};
  
export function updateOrden(state,id,token){
    return async function (dispatch) {
        var updateState= await fetch (`${APP}/orden/${state}/${id}`, {
            method: 'post',
            headers:{
            'x-token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        });
        updateState= await updateState.json()
        return dispatch ({type:ORDEN_DETAIL, payload:updateState})
    };
};