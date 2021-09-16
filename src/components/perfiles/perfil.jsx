import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useParams } from "react-router";
import Select from 'react-select';


import { payloadJWT } from '../../funciones/localStoreFunction';
import {profileUpdate } from '../../actions/user';
import {deletePerfil} from '../../funciones/delete';

import swal from 'sweetalert';
import '../../styles/perfil/perfil.scss';

export default function Perfil() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const history= useHistory();

    const state = useSelector(state => state.user.profile);

    const [foto, setfoto] = useState('');
    const [admin,setadmin]= useState('');
    const user=payloadJWT()
  

    function processImage(e){
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl.readAsDataURL(imageFile)
        imageUrl.onload=(e)=>{
          setfoto(e.target.result)
        };
    };
    
    async function deleteProfiles(){
        
        var mando= await swal ( " ¿Seguro que quieres eliminarlo? " , { 
            dangerMode: true,
            buttons: {
                cancel: {
                  text: "Cancel",
                  value: false,
                  visible: true,
                  closeModal: true,
                },
                confirm: {
                  text: "OK",
                  value: true,
                  visible: true,
                  closeModal: true
                }
              }
        });
        if(mando){
            let token=window.localStorage.getItem('token')
            await deletePerfil(id,token) 
            swal ( " ¡Usuario Eliminado! " , { 
                icon: "success",
                botón : false , 
              } ) ;
            history.push('/profiles')                      
        };
    };

    function guardar(){
        user.admin? dispatch(profileUpdate(id,{admin})) : dispatch(profileUpdate(id,{foto}))
        setadmin('');
        setfoto('');
    };

    return (
       <div className='div_perfil'>
            <h2 className="perfil_usuario_titulo">Perfil del Usuario</h2>
            <div className="userContenedor">
                <div className='div_p1'>
                    <div className="fotoMarco">
                         <img className="fotoMarco_i" src={state.foto} alt='foto de perfil' />
                    </div>
                    {!user.admin && <div className='realButton'><span>Cambia tu foto</span><div className='inputFoto'><label className='inputFoto_l'>cargar foto</label><input type="file" required accept="image/*" className='inputFoto_i' onChange={(e)=>processImage(e)}/></div></div>}
                    {user.admin && admin.length===0 && user.uid !== id &&
                        <Select
                            className="select_user"
                            options={!state.admin? [{ value:'true',label:'Administrador'}]:[{ value:'false',label:'Usuario'}]}
                            onChange={(e)=>setadmin(e.value)}
                            placeholder='Cambiar Rol'
                        />}
                </div>
                <div className="table">
                    <div className="childTable">
                        <p className="nombre_usuario_perfil">{`${state.nombre} ${state.apellido}`}</p>
                        <p className="email_perfil">E-Mail: {state.email}</p>
                        <p className="rol_perfil">Rol: {state.admin? 'Administrador': 'Usuario'}</p>
                        {user.admin &&  user.uid !== id && <button className="eliminar_usuario_perfil" onClick={()=>deleteProfiles()}>Eliminar</button>}
                        </div>
                        {(admin.length>0 || foto.length>0) && <button className='guardar_input' onClick={()=>guardar()}>Guardar</button>}
                </div>
            </div>
        </div>
    )
}
