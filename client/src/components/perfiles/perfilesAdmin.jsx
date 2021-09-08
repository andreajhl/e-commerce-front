import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';

import {getProfiles} from '../../actions/user';

import '../../styles/perfil/perfilesAdmin.scss';

export default function PerfilesAdmin(){

    const dispatch = useDispatch();
    const profiles=useSelector(state=>state.user.profiles);

    useEffect(() => {
        dispatch(getProfiles())
    }, [dispatch])

    return (
        <div className='perfilesAdmin'>
            <h1 className='titulo_Perfiles'>Usuarios Registrados</h1>
            <div className="perfiles_admin">
            {profiles.map((e,i)=><div className="perfiles_foto_nombre" key={i}><img className="foto_perfil_admin" src={e.foto} alt='foto_perfil_admin'/><NavLink style={{"textDecoration": "none"}}key={e._id} to={`profile/${e._id}`}>
                <p className="userComplete" >{`${e.nombre} ${e.apellido}`}</p></NavLink></div>)}        
            </div>
        </div>
    )
}
