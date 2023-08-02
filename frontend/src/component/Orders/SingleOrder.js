import React, { Fragment, useEffect } from 'react'
import "./SingleOrder.css"
import { Typography } from "@material-ui/core"
import Loader from "../layout/Loader/Loader"
import {useSelector, useDispatch} from "react-redux"
import {Link, useParams } from "react-router-dom"
import {useAlert}  from "react-alert"
import MetaData from "../layout/MetaData";
import { singleOrder, clearErrors } from '../../actions/orderActions'

const SingleOrder = () => {


    const {loading, error, order } = useSelector((state) => state.orderDetails)
    const {user} = useSelector((state) => state.user)
    const { shippingInfo, } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const alert = useAlert()
    const {id} = useParams()
    const address = `${shippingInfo.colony}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.number}, ${shippingInfo.district}`;







    useEffect(() => {
      
        if(error){
            dispatch(alert.error(error))
            dispatch(clearErrors())
        }

        dispatch(singleOrder(id))
    }, [dispatch, alert, error, id])
    



  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={"Single Order Details"} />
                <div className="singleOrderMain">
                    <div className="singleOrderContainer">
                        <div className="singleOrderBox">
                        <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.number}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>

            

            <div className='payment'>
  <Typography>Payment      -</Typography>
  {order && order.paymentInfo ? (
    <p className={order.paymentInfo.status === "succeeded" ? "greencolor" : "redcolor"}>
      {order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
    </p>
  ) : (
    <p>Loading payment information...</p>
  )}
</div>

            
<div className='order'>
  <Typography>Order Status        -</Typography>
  {order && order.orderStatus ? (
    <p className={order.orderStatus === "Delivered" ? "greencolor" : "redcolor"}>
      {order.orderStatus}
    </p>
  ) : (
    <p>Loading order status...</p>
  )}
</div>


<div className='orderitems'>
  <Typography>Order Items</Typography>
  {order && order.orderItems ? (
    order.orderItems.map((item) => (
      <div key={item.product}>
        <img src={item.image} alt="Product" />
        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
        <span>
          {item.Quantity} X ₹{item.price} = <b>₹{item.price * item.Quantity}</b>
        </span>
      </div>
    ))
  ) : (
    <p>Loading order items...</p>
  )}
</div>


                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default SingleOrder