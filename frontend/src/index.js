import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./page/Home"
import Menu from "./page/Menu.1";
import About from "./page/About";
import Contact from "./page/contact";
import Login from "./page/login";
import Newproduct from './page/newproduct';
import Signup from "./page/Signup";
import { store } from "./redux/index"
import { Provider } from 'react-redux';
import Cart from './page/Cart';
// import { Addnewpeoduct } from './page/Addnewpeoduct';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      {/* <Route path='menu' element={<Menu />} /> */}
      <Route path='menu/:filterby' element={<Menu />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='Newproduct' element={<Newproduct />} />
      <Route path='signup' element={<Signup />} />
      <Route path='Cart' element={<Cart />} />
      {/* <Route path="Addnewproduct" element={<Addnewpeoduct/>}/> */}

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>


);
reportWebVitals();
