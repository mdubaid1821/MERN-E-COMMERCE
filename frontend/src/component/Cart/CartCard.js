import React, { Fragment } from 'react'
import "./CartCard.css"
import {Link} from "react-router-dom"

const CartCard = ({item, deleteCartItems}) => {







  return (
    <Fragment>
        <div className="cartCard">
            <div className='products'>
            <div className='a'>
            <img src={item.image} alt='loading' />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`₹${item.price}`}</span>
            </div>
                <div className='b'>
                <p onClick={()=>{deleteCartItems(item.product)}}>remove</p>
                </div>
            </div>
            <div className='quantity'>
                <p>{item.Quantity}</p>
            </div>
            <div className="subTotal">
                <p>{`₹${item.price * item.Quantity}`}</p>
            </div>

        </div>
        
    </Fragment>
  )
}

export default CartCard