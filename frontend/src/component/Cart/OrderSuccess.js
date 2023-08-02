import React, { Fragment } from 'react'
import {BsFillBagCheckFill} from "react-icons/bs"
import { Typography } from "@material-ui/core"
import { Link } from 'react-router-dom'
import "./OrderSuccess.css"

const OrderSuccess = () => {
  return (
    <Fragment>
        <div className="orderMain">
            <div className="orderContainer">
                <div className="orderBox">
                    <BsFillBagCheckFill />
                    <Typography>Your Order has been placed successfully</Typography>
                    <Link to={"/orders/my"}>View Order</Link>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default OrderSuccess