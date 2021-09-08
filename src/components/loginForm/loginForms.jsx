import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

import GoogleLogin from 'react-google-login';

import { payloadJWT } from '../../funciones/localStoreFunction';
import RecoverPopUp from '../recoverPass/recoverPopUp.jsx';
import { getProfile } from '../../actions/user';
import userLogin from '../../funciones/login';

import  './loginForms.css';
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
            closeModal();
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


    const closeModal = () => {
        let logModal = document.getElementById('logModal')
        let ninjaButton = document.getElementById('buttonsForms')
        logModal.style.opacity = '0';
        logModal.style.zIndex = '1'; 
        ninjaButton.style.opacity = '1';
        ninjaButton.style.zIndex = '2'
    };

    // loggin google
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
                closeModal();     
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
                    <h1 className="loginUser">Correo Electrónico</h1>
                    <input  placeholder="Correo Electronico" className="inputMail1" type='email' autoComplete='off' required name="email" value={data.email} onChange={handleChange} />
                    <h1 className="loginPass">Contraseña</h1>
                    <input placeholder="password" name="password" className="inputPass"  type="password" required autoComplete='off' value={data.password} onChange={handleChange} />
                    {data.email && data.password && <input id="buttonInput"  type="submit" className="logginBtn" value ="Logueate" />}
                </form>
                <GoogleLogin
                    clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                    buttonText="Logueate con google"
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <RecoverPopUp/>
                <button className="close" onClick={closeModal}>Atrás</button>
            </div>
        </div>
    );
};




