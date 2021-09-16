import React from 'react'

export default function RegisterFormLogin ({handleSubmit, handleInputChange, inputs}) {


    
    return (
        <form  className="formLoginUser">
            <div className="contraseña_div">
                <div className="regisLeft">
                    <h3 >Nombre</h3>
                    <input  placeholder="Nombre..." name="nombre" autoComplete='off' required  value={inputs.nombre} onChange={handleInputChange}  className='formLoginUser_input' />
                </div>
                <div className="regisLeft">
                    <h3>Apellido</h3>
                    <input  placeholder="Apellido..." name="apellido" autoComplete='off' required  value={inputs.apellido} onChange={handleInputChange} className='formLoginUser_input'/>
                </div>
            </div>                
            <div className="contraseña">
                <div className="contraseña_div">
                    <div className="regisLeft">
                        <h3>Contraseña</h3>
                        <input placeholder="contraseña..." name="password" autoComplete='off'  value={inputs.password} required minLength='6' type="password" onChange={handleInputChange} className='formLoginUser_input'/>
                    </div>
                    <div className="regisLeft">
                        <h3>Confirmar Contraseña</h3>
                        <input placeholder="Confirmar contraseña..." name="password_confirm" autoComplete='off'  value={inputs.password_confirm} required minLength='6' type="password" onChange={handleInputChange} className='formLoginUser_input'/>
                    </div>                
                </div>
                <p id='msgNewPass'></p>
            </div>
            <div className="contraseña_div">
                <div className="regisLeft">
                    <h3 className="regisEmail">Correo electrónico</h3>
                    <input placeholder="correo@mail.com" name="email" type="email" autoComplete='off' required value={inputs.email} onChange={handleInputChange} className='formLoginUser_input'/>
                </div>
                <div className="regisLeft">
                    <h3 className="regisTelefono">Teléfono</h3>
                    <input placeholder="Nro de Teléfono..." name="telefono" type="telefono" autoComplete='off' required value={inputs.telefono} onChange={handleInputChange} className='formLoginUser_input'/>
                </div>
            </div>
            <div className="contraseña_div">
                <div className="regisLeft">
                    <h3 className="regisDocumento">Documento</h3>
                    <input placeholder="Documento..." name="documento" type="documento" autoComplete='off' required value={inputs.documento} onChange={handleInputChange} className='formLoginUser_input'/>
                </div>
                <div className="regisLeft"> 
                    <h3 className="regisDireccion">Dirección</h3>
                    <input className="contraseña" placeholder="Pais / Cuidad, Calle, CP" name="direccion" type="direccion" autoComplete='off' required value={inputs.direccion} onChange={handleInputChange} className='formLoginUser_input'/>
                </div>
            </div>
            <div>
               { inputs.nombre.length>=1 && inputs.apellido.length>=1 && inputs.documento && inputs.password.length>=6 && inputs.telefono && inputs.email && inputs.direccion && <button className="regisBtn" onClick={handleSubmit}>Regístrate</button>}
            </div>
        </form>
    )
}
