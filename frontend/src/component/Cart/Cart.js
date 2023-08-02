import React, { Fragment } from 'react'
import "./Cart.css"
import CartCard from "./CartCard.js"
import {useSelector, useDispatch } from "react-redux"
import { deleteFromCart } from '../../actions/cartActions'
import {Typography} from "@material-ui/core"
import { Link } from 'react-router-dom'
import {MdRemoveShoppingCart} from "react-icons/md"
import {useNavigate} from "react-router-dom"
const Cart = () => {


  const dispatch =useDispatch()
  const {cartItems} = useSelector((state)=>state.cart)
  const navigate = useNavigate()

  const deleteCartItems = (id) => {
    dispatch(deleteFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/shipping")
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? <div className="emptyCartMain">
      <div className="emptyCartContainer">
        
        <div className="emptyCartBox">
        
        <MdRemoveShoppingCart/>
        <Typography>" YOU FORGOT TO ADD PRODUCTS"</Typography>
        <Link to={"/products"}>View Products</Link>
        </div>
        
      </div>
      </div> : (
        <Fragment>
        <div className="cartMain">
        <div className="cartContainer">
        <div className="cartBox">
        <div className="cartHeader">
                    <p>Products</p>
                    <p>Quantity</p>
                    <p>Sub-Total</p>
                </div>
            {cartItems && cartItems.map((item)=>(
              <div key={item.id}>
              <CartCard item={item} deleteCartItems={deleteCartItems}/>
              </div>
              ))}
              <div className="total">
            <h4>Total -- </h4>
            <p>{`₹${cartItems.reduce((total, item)=>total + item.price * item.Quantity , 0)}`}</p>
        </div>
        <div className="checkOut">
            <button onClick={checkOutHandler}>checkOut</button>
        </div>
        </div>
        </div>
        </div>
    </Fragment>
      )}
    </Fragment>
  )
}

export default Cart