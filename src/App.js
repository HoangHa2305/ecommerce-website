import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import Index from './components/Blog/Index';
import { useLocation } from 'react-router-dom';
import MenuAcc from './components/Layout/MenuAcc';
import { UserContext } from './UserContext';
import { useState } from 'react';

function App(props) {
  let params = useLocation();
  const [qty,setQty] = useState('');

  function Soluongqty(data){
    setQty(data);
    localStorage.setItem("qty",JSON.stringify(data));
  }


  return (
      <UserContext.Provider value={{Soluongqty:Soluongqty,qty:localStorage.getItem("qty")}}>
          <Header/>
          <section>
            <div class="container">
              <div class="row">
                {params['pathname'].includes("account") ? <MenuAcc/> :params['pathname'].includes("cart") ? "" :  <MenuLeft/>}      
                {props.children}
              </div>
            </div>
          </section>
          <Footer/>
      </UserContext.Provider>
  );
}

export default App;
