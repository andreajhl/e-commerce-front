export const GET_GENDERS = 'GET_GENDERS';
export const CREATE_GENDER = 'CREATE_GENDER';


const APP = 'https://libreriaecommerce.herokuapp.com'

export function getGenders(){
    return async function(dispatch) {
        var genders= await fetch(`${APP}/generos`);
            genders= await genders.json();
        return dispatch({type:GET_GENDERS, payload:genders})
    };
};

export function createGender(payload,token) {
    return async function (dispatch) {
      var gender = await fetch(`${APP}/generos`, {
        method: "POST",
        headers: {
          "x-token": token,
          "Accept": "application/json",
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      gender = await gender.json();
      return dispatch({ type: CREATE_GENDER, payload: gender });
    };
};
