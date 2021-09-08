export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES ='GET_PROFILES';
export const REMOVE_PROFILE = 'REMOVE_PROFILE';

const APP ='https://libreriaecommerce.herokuapp.com/'

export function getProfile (id){
  return async function (dispatch){
    var profile= await fetch (`${APP}/auth/profile/${id}`);
    profile= await profile.json();
    return dispatch({type: GET_PROFILE, payload:profile })
  };
};

export function getProfiles (){
  return async function (dispatch){
    var profiles= await fetch (`${APP}/auth/profiles`);
    profiles= await profiles.json();
    return dispatch({type: GET_PROFILES, payload:profiles})
  };
};

export function deleteProfile() {
  return {
    type: REMOVE_PROFILE,
    
  }
};

export function profileUpdate (id,payload){
  return async function (dispatch) {
    var profileUptate= await fetch (`${APP}/auth/profile/edit/${id}`, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      profileUptate= await profileUptate.json()
      return dispatch ({type:GET_PROFILE, payload:profileUptate})
    };
};