import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; 
import { useHistory } from "react-router";

import {getAllBooks} from "../../actions/book";
import { getProfile, deleteProfile } from "../../actions/user";
import {getGenders} from "../../actions/generos";

import { payloadJWT } from '../../funciones/localStoreFunction';
import OpcionesAdmin from "../opciones/opcionesAdmin";
import LoginForms  from "../loginForm/loginForms.jsx"; 
import OpcionesUser from '../opciones/opcionesUser';
import Ordenamiento from './ordenamiento/ordenamiento';
import {logaut} from "../../funciones/login";
import Search from './search/search';

import { MdMenu, MdShoppingCart, MdAccountCircle } from "react-icons/md";

import Logo from "../../img/Logo-principal.png";
import '../../styles/navBar/navBar.scss'

import Cart from '../cart/cart'


export default function NavBar() {

    const profileImg = useSelector(state => state.user.profile);
    const carts = useSelector((state)=>state.cart.cart);

    const dispatch = useDispatch();
    const history = useHistory();

    const url=window.location.pathname
    
    const [leftBarState, setleftBarState] = useState(false);
    const [rightBarState, setrightBarState] = useState(false);
    const [loginBarState, setloginBarState] = useState(false);

    var user=payloadJWT();

    if(!profileImg.foto && user) {
      dispatch(getProfile(user.uid));
    };

    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getGenders())
    },[dispatch]);


    function leftBarFunction(){
      let leftNavBar = document.getElementById('leftNavBar');
      if( leftBarState ){
        leftNavBar.style.left = '-100vw';
        setleftBarState(false);
      }else{
        leftNavBar.style.left = '0vw';
        setleftBarState(true);
      }; 
    };

    function rightBarFunction(){
      let rightNavBar = document.getElementById('rightNavBar');
      <Cart/>
      if( rightBarState ){
        rightNavBar.style.right='-100vw';
        setrightBarState(false);
      }else{
        rightNavBar.style.right='0vw'
        setrightBarState(true);
      };
    };

    function loginBarFunction(){
      let loginNavBar = document.getElementById('loginNavBar');
      if( loginBarState ){
        loginNavBar.style.right='-100vw';
        setloginBarState(false);
      }else{
        loginNavBar.style.right='0vw'
        setloginBarState(true);
      };
    };

  // const openModal = async() => {
  //   let logModal = document.getElementById('logModal')
  //   let ninjaButton = document.getElementById('buttonsForms')
  //   ninjaButton.style.opacity = '0';
  //   ninjaButton.style.zIndex = '1'
  //   logModal.style.opacity = '1';
  //   logModal.style.zIndex = '2'
  // }

  const openRegisModal = () => {
    loginBarFunction();
    history.push('/registerUser')
  }
  
  const locaLogout = () => {
    dispatch(deleteProfile())
    logaut();
    loginBarFunction();
    history.push('/');
  }

  return (
  <div className="nav_principal">
    <div className='mainNavBar'>
      {url === "/" ? <div>
        <button className = {leftBarState ? "leftNavBarButton_active" : "leftNavBarButton_inactive"} onClick={ leftBarFunction }>
            <MdMenu className="icono_nav"/>
        </button>
            <div id='leftNavBar'>
              <Ordenamiento  />
            </div>
      </div> : <div></div>} 
      <div className='cantainer-principal-nav'>
           <div className="titulo_principal">
            <NavLink to={'/'}>
            <img className="img_logo_nav" src={Logo} alt="logo"/>
            </NavLink>
          </div>  
          <div className='search1'>
              <Search />
            </div>
            <div className='div-sucurandDeseos'>
              <button className="sucursales_button_home"><NavLink to='/sucursales' style={{textDecoration: "none", color:"white"}}>Tiendas</NavLink></button>
              {user && !user.admin && <button className="sucursales_button_home"><NavLink to='/whishlist' style={{textDecoration: "none", color:"white"}}>Deseos</NavLink></button>}                
            </div>
            <div className='user-cart'>
              <div className='funcionUser'>
                <div className="icono_Usuario">
                    <div id={loginBarState? "loginNavBarbutton_active" : "loginNavBarbutton_inactive"} className="loginNavBarbutton" onClick={ loginBarFunction }>
                    {user && user.uid ? <img className='img_perfil_nav' src={profileImg.foto} alt="imagen de perfil" /> : <MdAccountCircle className='img_perfil_nav_i'/>}
                    </div>  
                    <div id ="loginNavBar">
                      <div id ="buttonsForms" >
                        {!user?(<div>
                            <LoginForms loginBarFunction={loginBarFunction}/>
                            <div className="userLoginButton"><p className="userLoginButton_t">¿No tienes cuenta?</p><button className="userLoginButton_i" onClick={openRegisModal}>Registrate</button></div>
                          </div>
                        ):
                        (<div>
                            {user? user.admin ? <OpcionesAdmin /> : <OpcionesUser/>: null}
                            <button onClick={locaLogout}  className="userLoginButtonSesion"> Cerrar Sesión </button>
                          </div>)}
                      </div>
                  </div>      
                </div>                
              </div>
                { (!user || !user.admin) && <div>
                <div id={rightBarState? "rightNavBarButton_active" : "rightNavBarButton_inactive"} className="rightNavBarButton" onClick={ rightBarFunction }>
                <MdShoppingCart className="icono_nav_der"/> <span className="numero_icono">{Object.values(carts).length}</span>
                </div>           
                <div id ="rightNavBar">
                <Cart/>
                </div>
             </div>} 
            </div>
        </div>
      </div>
    </div> 
  );
};