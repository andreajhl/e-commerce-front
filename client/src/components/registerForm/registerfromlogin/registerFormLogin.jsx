import React from 'react'

export default function RegisterFormLogin ({handleSubmit, handleInputChange, inputs}) {

    // function validarPass(){
    //     var enviaPass = document.getElementById('enviaPass')
    //     var msgNewPass = document.getElementById('msgNewPass')
    //     if(inputs.password === inputs.password_confirm){
    //         enviaPass.style.backgroundColor = 'rgb(244, 164, 96)'
    //         msgNewPass.style.color = 'green'
    //         msgNewPass.textContent = "¡Perfecto!"
    //     }else{
    //         enviaPass.style.backgroundColor = 'grey'
    //         msgNewPass.style.color = 'red'
    //         msgNewPass.textContent = "Las contraseñas deben ser iguales"
    //     }
    // }
    
    return (
        <form  className="formLoginUser">
            <div className="regisNombreApellido">
                <div className="regisLeft">
                    <h3 >Nombre</h3>
                    <input  placeholder="Nombre..." name="nombre" autoComplete='off' required  value={inputs.nombre} onChange={handleInputChange} />
                </div>
                <div className="regisRight">
                    <h3>Apellido</h3>
                    <input  placeholder="Apellido..." name="apellido" autoComplete='off' required  value={inputs.apellido} onChange={handleInputChange} />
                </div>
            </div>                
            <div className="contraseña">
                <div className="regisLeft">
                    <h3>Contraseña</h3>
                    <input placeholder="contraseña..." name="password" autoComplete='off'  value={inputs.password} required minLength='6' type="password" onChange={handleInputChange}/>
                </div>
                <div className="regisRight">
                    <h3>Confirmar Contraseña</h3>
                    <input placeholder="Confirmar contraseña..." name="password_confirm" autoComplete='off'  value={inputs.password_confirm} required minLength='6' type="password" onChange={handleInputChange}/>
                </div>
            </div>
            <div className="contraseña">
                <div className="regisLeft">
                    <h3 className="regisEmail">Correo electrónico</h3>
                    <input placeholder="correo@mail.com" name="email" type="email" autoComplete='off' required value={inputs.email} onChange={handleInputChange}/>
                </div>
                <div className="regisRight">
                    <h3 className="regisTelefono">Teléfono</h3>
                    <input placeholder="Nro de Teléfono..." name="telefono" type="telefono" autoComplete='off' required value={inputs.telefono} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="contraseña">
                <div className="regisLeft">
                    <h3 className="regisDocumento">Documento</h3>
                    <input placeholder="Documento..." name="documento" type="documento" autoComplete='off' required value={inputs.documento} onChange={handleInputChange}/>
                </div>
                <div className="regisRight"> 
                    <h3 className="regisDireccion">Dirección</h3>
                    <input className="contraseña" placeholder="Pais / Cuidad, Calle, CP" name="direccion" type="direccion" autoComplete='off' required value={inputs.direccion} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="contraseña">
                <input className="terminosCheck" type="checkbox"/>
                <p className="regisCondiciones">Acepto los Términos y Condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad y la Autorización de Tratamiendo de Datos</p>
            </div>
            <div>
                <button className="regisBtn" onClick={handleSubmit}>Regístrate</button>
            </div>
        </form>
    )
}
