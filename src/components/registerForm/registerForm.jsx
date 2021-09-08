import React,{ useState }  from 'react';
import { useHistory } from 'react-router';

import GoogleLogin from 'react-google-login';

import RegisterFormLogin from './registerfromlogin/registerFormLogin';

import {newUser} from '../../funciones/login';

import '../../styles/registerForm/registerForm.scss';
import swal from 'sweetalert';

export default function RegisterForm(){

    const history = useHistory();

    const [inputs, setInput] = useState({
        email:'',
        password:'',
        password_confirm:'',
        nombre:'',
        apellido:'',
        telefono:'',
        direccion:'',
        documento: '',
        
    });
        
    const handleInputChange = (e) => {

        setInput({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        if(inputs.password===inputs.password_confirm){
          const {nombre,apellido,email,password,telefono,direccion,documento}=inputs
            let a = await newUser({nombre,apellido,email,password,telefono,direccion,documento});   
            if(a.token){
                window.localStorage.setItem("token", a.token);
                (swal({
                    title: "Registro realizado con éxito. ¡Bievenid@!",
                    icon: "success",
                }));
                history.push('/');
            }else{
                swal({
                    title: a.msg? a.msg : 'a ocurrido un error',
                    icon: "error",
                });
            };

        }else{
            if(inputs.password!==inputs.password_confirm) {           
                swal({
                    title: "Las contraseñas no coinciden",
                    icon: "error",
                });
            };
        };
    };

    const respuestaGoogle = async (respuesta)=>{

        if(respuesta.profileObj){
            const login = {
                apellido: respuesta.profileObj.familyName,
                password: respuesta.profileObj.googleId,
                email: respuesta.profileObj.email,
                nombre: respuesta.profileObj.givenName,
                foto: respuesta.profileObj.imageUrl

            };
            let a= await newUser(login);   
        
            if(a.token){
                window.localStorage.setItem("token", a.token)
                (swal({
                    title: "Registro realizado con éxito. ¡Bievenid@!",
                    icon: "success",
                }));
                history.push('/');
            }else{
                (swal({
                    title: a.msg,
                    icon: "error",
                }));
            };
        };
    };
    
    return (
       
        <div className="logModalUser">
            <h1 className="regisTitulo">Completa tus Datos</h1>
            <div className="modal_dialog_user">
                <RegisterFormLogin handleInputChange={handleInputChange} inputs={inputs} handleSubmit={handleSubmit} />
                <div>
                    <GoogleLogin
                        clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                        buttonText="Registrate con google"
                        onSuccess={respuestaGoogle}
                        onFailure={respuestaGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google_btn"
                    />
                </div>
             </div>
        </div>
    )
}