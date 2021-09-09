import React, { useState} from 'react';
import ReactCircleModal from 'react-circle-modal';

import {passModifi, sendMail, changePass} from '../../funciones/login';

import swal from 'sweetalert';
import   '../../styles/recoverPopUp/recoverPopUp.scss';

export default function RecoverPopUp (){

    const [state,setstate] = useState({
        code:'',
        newPassA:'',
        newPassB:'',
        inputMail:''
    });

    function handleChange(e){
        setstate({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    function validarPass(){
        var enviaPass = document.getElementById('enviaPass')
        var msgNewPass = document.getElementById('msgNewPass')
        if(state.newPassA === state.newPassB){
            enviaPass.style.backgroundColor = 'rgb(244, 164, 96)'
            msgNewPass.style.color = 'green'
            msgNewPass.textContent = "¡Perfecto!"
        }else{
            enviaPass.style.backgroundColor = 'grey'
            msgNewPass.style.color = 'red'
            msgNewPass.textContent = "Las contraseñas deben ser iguales"
        }
        
    }
    async function handleSumbit(e){
        e.preventDefault()
        await sendMail(state.inputMail)
            let pepeA = document.getElementById('pepeA')
            let pepeB = document.getElementById('pepeB')
            let pepeC = document.getElementById('pepeC')
            pepeA.style.opacity = '0';
            pepeA.style.zIndex = '1'; 

            pepeB.style.opacity = '1';
            pepeB.style.zIndex = '3'

            pepeC.style.opacity = '0'
            pepeC.style.zIndex = '2'
        };

        async  function handleSumbitModify (e){
            e.preventDefault()
            const {inputMail,code}=state
            const a =  await passModifi({code,email:inputMail})
            if(a.msg === "Codigo enviado"){
                let pepeB = document.getElementById('pepeB')
                let pepeC = document.getElementById('pepeC') 
                pepeB.style.opacity = '0';
                pepeB.style.zIndex = '1'

                pepeC.style.opacity = '1';
                pepeC.style.zIndex = '2' 
            }else{
                swal({
                    title: a.msg,
                    icon: "error",
                });
            };
        };

    async function sumbitNewPass (e){
        e.preventDefault()
        validarPass()
        if(state.newPassB===state.newPassA){
            const a =  await changePass({newPass:state.newPassA, code:state.code, email:state.inputMail})
            swal({
                title: a.msg,
                icon: "success",
                buttons: false
            });
            setTimeout(() => {
                window.location.reload()
            }, 1000);         
        };
    };

    return (
        <ReactCircleModal 
            backgroundColor="rgb(244, 164, 96)"
            toogleComponent={onClick => <button className="openPop" onClick={onClick}>
                ¿Olvidaste tu contraseña?
                </button>
            }
            offsetX={0}
            offsetY={0}
        >
        {(onClick) => (
            <form  className="pepe">
                <div id="pepeA">
                    <p>Escribe tu dirección de correo electrónico a continuación y recibirás una nueva clave:</p><br />
                    <p>¡Revisa la bandeja de entrada o la casilla de spam de tu buzón de mensajes!</p>
                    <input 
                        name="inputMail"
                        value={state.inputMail}
                        className="inputMail" 
                        type="text" 
                        placeholder="Email"
                        autoComplete='off'
                        onChange={handleChange}
                    />
                    <button id="enviaPop" onClick={handleSumbit}>Enviar</button>
                    <button className="closePop" onClick={onClick}>Atras</button>
                </div>
                <div id="pepeB">
                    <input 
                        type="text"   
                        name="code" 
                        value={state.code}
                        onChange={handleChange}
                        placeholder="Introduce aqui el codigo que enviamos a tu correo"
                        autoComplete="off"
                        />
                    <button className="enviaCode" onClick={handleSumbitModify}>Enviar</button>
                    <button className="buttonBack" onClick={onclick}> Atras </button>
                </div>
                <div id="pepeC">
                    <input 
                        name="newPassA" 
                        value={state.newPassA}
                        className="newPass" 
                        autoComplete="off" 
                        placeholder="introduzca la nueva contraseña"
                        type="password"
                        onChange = {handleChange}
                    />
                    <input 
                        type="password"
                        name="newPassB"
                        value={state.newPassB}
                        className="newPass"
                        autoComplete="off"
                        placeholder="Repita la contraseña"
                        onChange = {handleChange}
                    />
                    <label id="msgNewPass"></label>
                    <button className="buttonBack" id="enviaPass" onClick={sumbitNewPass}> Enviar </button>
                    <button className="buttonBack" onClick={onclick}> Atras </button>
                </div>
            </form>
        )}
        </ReactCircleModal>
    );
};
    

