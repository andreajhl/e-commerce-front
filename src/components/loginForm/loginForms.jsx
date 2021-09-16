import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

import GoogleLogin from 'react-google-login';

import { payloadJWT } from '../../funciones/localStoreFunction';
import RecoverPopUp from '../recoverPass/recoverPopUp.jsx';
import { getProfile } from '../../actions/user';
import userLogin from '../../funciones/login';

import  '../../styles/loginForm/loginForm.scss';
import {FcGoogle} from 'react-icons/fc';
import swal from 'sweetalert';

export default function LoginForms  ({loginBarFunction}){

    const dispatch = useDispatch();

    const url = window.location.pathname;

    const history= useHistory();

    const [data, setData] = useState({
        email:"",
        password:""
    });

    const handleSumbit =  async (e) => {
        e.preventDefault()
        let a = await dispatch(userLogin(data))
        if(a.token && url !== '/') history.push('/')
        setData({
            email:'',
            password:''
        });

       if(a.token) {
           window.localStorage.setItem("token", a.token)
            await swal({
                title: "¡Bienvenid@! Sesión iniciada exitosamente",
                icon: "success",
                buttons: {
                    confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    closeModal: true
                    },
                }
            });
            let user=payloadJWT();
            loginBarFunction();
            // closeModal();
            dispatch(getProfile(user.uid)) ;              
            
       }else{
            swal({
                title: "Correo o contraseña incorrectos. Inténtelo de nuevo.",
                icon: "error",
            });
        };
    };
    
    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const respuestaGoogle = async (respuesta)=>{

        if(respuesta.profileObj){
            const login = {
                password: respuesta.profileObj.googleId,
                email: respuesta.profileObj.email
            }
           let a= await dispatch(userLogin(login)) 
           if(a.token && url !== '/')  history.push('/') 

            if(a.token){ 
              window.localStorage.setItem("token", a.token)
              await swal({
                    title: "¡Bienvenid@! Sesión iniciada exitosamente",
                    icon: "success",
                    buttons: {
                        confirm: {
                          text: "OK",
                          value: true,
                          visible: true,
                          closeModal: true
                        }
                      }
                });               
                loginBarFunction();    
            }else {
                swal({
                    title: "Correo o contraseña incorrectos. Inténtelo de nuevo.",
                    icon: "error",
                });
            };
        };
    };

    return(
        <div id='logModal' className= 'logModal'>
            <div className="modal_dialog">
                <h1 className="title">Iniciar Sesión</h1>
                <form onSubmit={handleSumbit} className="formLogin">
                    <h2 className="loginUser">Correo Electrónico</h2>
                    <input  placeholder="Correo Electronico" className="inputMail1Pass" type='email' autoComplete='off' required name="email" value={data.email} onChange={handleChange} />
                    <h2 className="loginUser">Contraseña</h2>
                    <input placeholder="password" name="password" className="inputMail1Pass"  type="password" required autoComplete='off' value={data.password} onChange={handleChange} />
                    {data.email && data.password && <button id="buttonInput"  type="submit" className="logginBtn">Enter</button>}
                </form>
                <GoogleLogin
                    className='google'
                    clientId="1476036823951-nellvjps6f9hjntumtugm4oi5ecrm3ve.apps.googleusercontent.com"
                    render={renderProps => (
                        <div className='google'>
                            <FcGoogle className='google_i'/>
                            <button  className='google_b' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
                        </div>
                       
                      )}
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className='recover'>
                  <RecoverPopUp/>
                </div>
            </div>
        </div>
    );
};




