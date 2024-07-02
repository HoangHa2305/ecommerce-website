import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Blog from './components/Blog/Index';
import Home from './components/Home';
import Detail from './components/Blog/Detail';
import Member from './components/Member/Index';
import Account from './components/Account/Account';
import MyProduct from './components/Account/MyProduct';
import AddProduct from './components/Account/AddProduct';
import EditProduct from './components/Account/EditProduct';
import DetailProduct from './components/Product/Detail';
import Example from './components/Modal';
import Cart from './components/Cart/Cart';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <Router>
          <App>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/blog/list' element={<Blog/>}/>
                <Route path='/blog/detail/:id' element={<Detail/>}/>
                <Route path='/member' element={<Member/>}/>
                <Route path='/account/update' element={<Account/>}/>
                <Route path='/account/user/my-product' element={<MyProduct/>}/>
                <Route path='/account/user/product/add' element={<AddProduct/>}/>
                <Route path='/account/user/product/:id'element={<EditProduct/>}/>
                <Route path='/product/detail/:id' element={<DetailProduct/>}/>
                <Route path='/modal' element={<Example/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
          </App>
        </Router>
      </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
