import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { Header } from "./component/layout/header/header";
import Footer from "./component/layout/footer/footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products"
import Search from "./component/product/Search"
import LoginRegister from "./component/login/Login";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile"
import EditProfile from "./component/User/EditProfile"
import EditPassword from "./component/User/EditPassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping"
import Payment from "./component/Cart/Payment"
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Orders/MyOrders"
import SingleOrder from "./component/Orders/SingleOrder"
import Dashboard from "./component/admin/Dashboard"
import ProductsList from "./component/admin/ProductsList"
import CreateProduct from "./component/admin/CreateProduct"
import UpdateProduct from "./component/admin/UpdateProduct"
import OrdersList from "./component/admin/OrdersList"
import OrderStatus from "./component/admin/OrderStatus"
import UserList from "./component/admin/UserList"
import UpdateUser from "./component/admin/UpdateUser"
import ContactMe from "./component/Me/ContactMe"
import AboutMe from "./component/Me/AboutMe"

function App() {

    const {isAuthenticated, user,} = useSelector(state=>state.user)

    const proceed = user && user.role === "admin"

    const [stripeApiKey, setStripeApiKey] = useState("");

    const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;



  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");

    

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    store.dispatch(loadUser())
    getStripeApiKey();
  }, []);



  // window.addEventListener("contextmenu", (e)=>e.preventDefault())

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<EditProfile/>} />
        <Route path="/password/update" element={<EditPassword/>} />
        <Route path="/password/forgot" element={<ForgotPassword/>} />
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/order/confirm" element={<ConfirmOrder/>} />
        {stripeApiKey && (
          <Route
            path="/payment"
            element={(
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            )}
          />
        )}
        <Route path="/success" element={<OrderSuccess/>} />
        <Route path="/orders/my" element={<MyOrders/>} />
        <Route path="/order/:id" element={<SingleOrder/>} />
        {proceed ? 
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}

        {proceed ? 
        <Route path="/admin/products" element={<ProductsList/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}



        {proceed ? 
        <Route path="/admin/product/new" element={<CreateProduct/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}

        {proceed ? 
        <Route path="/admin/product/:id" element={<UpdateProduct/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}

        {proceed ? 
        <Route path="/orders/all" element={<OrdersList/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}


        
        {proceed ? 
        <Route path="/order/update/:id" element={<OrderStatus/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}



              
        {proceed ? 
        <Route path="/admin/users" element={<UserList/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}




        {proceed ? 
        <Route path="/admin/user/:id" element={<UpdateUser/>} />
        :(<Route path="/login" element={<LoginRegister />} />)}


        <Route path="/contact" element={<ContactMe/>} />

        <Route path="/about" element={<AboutMe/>} />



        
      

      </Routes>
      <Footer />
    </Router>
  );
}



export default App;
