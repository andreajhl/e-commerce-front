import React,{useEffect} from 'react';
import { useSelector } from "react-redux";
import { Route, Switch, Redirect} from "react-router-dom";

import DetailOrden from './components/historyShopping/detailOrden/detailOrden';
import HistoryShopping from './components/historyShopping/historyShopping';
import CreateProducto from './components/createProducto/createProducto';
import RegisterForm from "./components/registerForm/registerForm";
import PromoVigente from './components/promociones/promoVigentes';
import EditProduct from './components/editProducto/editProducto';
import checkCart from './components/cart/checkCart/checkCart';
import { payloadJWT } from './funciones/localStoreFunction';
import Sucursales from "./components/sucursales/sucursales";
import Profiles from './components/perfiles/perfilesAdmin';
import CreatePromo from "./components/promociones/promo";
import Whishlist from './components/whishlist/whishlist';
import Generos from "./components/categorias/generos";
import Details from "./components/details/details";
import Perfil from './components/perfiles/perfil';
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";


import './App.css';


function App() {
  
  const state = useSelector(state => state.user.profile)

  var a;

  useEffect(() => {

    a= payloadJWT()

  }, [state])

  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Home}/>

      <Route path='/details/:id' component = {Details} />

      <Route path= '/check' component={checkCart} />  

      <Route path='/sucursales' component={Sucursales} />

      <Route path='/registerUser' component={RegisterForm}/>

      <Switch>
         <Route path= '/add' render={()=>{
              return a && a.admin ? <CreateProducto/> : <Redirect to='/'/>
            }}
          />
          <Route path= '/add_promo' render={()=>{
              return a && a.admin ? <CreatePromo/> : <Redirect to='/'/>
            }}
          />
          <Route path= '/promos' render={()=>{
              return a && a.admin? <PromoVigente/> : <Redirect to='/'/>
            }}
          />
          <Route path= '/categorias' render={()=>{
              return a && a.admin? <Generos/> : <Redirect to='/'/>
            }}
          />
          
           <Route path= '/edit/:id' render={()=>{
              return a && a.admin ? <EditProduct/> : <Redirect to='/'/>
            }}
          />
          <Route path='/profiles' render={()=>{
              return a && a.admin ? <Profiles /> : <Redirect to='/'/>
            }}
          />
          <Route exact path='/ordenes' render={()=>{
              return a ?  <HistoryShopping /> : <Redirect to='/'/>
            }}
          />
          <Route path='/ordenes/detail/:id' render={()=>{
              return a ? <DetailOrden/> : <Redirect to='/'/>
            }}
          />
          <Route path='/profile/:id' render={()=>{
              return a? <Perfil/> : <Redirect to='/'/>
            }}
          />
          <Route path='/whishlist' render={()=>{
              return a? <Whishlist/> : <Redirect to='/'/>
            }}
          />
      </Switch>
      
    </div>
  );
}

export default App;
