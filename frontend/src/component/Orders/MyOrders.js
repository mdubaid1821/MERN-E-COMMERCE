import React, { Fragment, useEffect } from 'react'
import "./MyOrders.css"
import {DataGrid} from "@material-ui/data-grid"
import Loader from "../layout/Loader/Loader"
import {useSelector, useDispatch} from "react-redux"
import {Link, } from "react-router-dom"
import {useAlert}  from "react-alert"
import MetaData from "../layout/MetaData";
import { myOrders, clearErrors } from '../../actions/orderActions'
import {MdLaunch} from "react-icons/md"




const MyOrders = () => {


    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading , orders, error} = useSelector((state) => state.myOrders)
  


    const rows =[]
    const columns = [
      {
       field: "id" ,
       headerName: "orderID",
       minWidth: 140,
       flex: 1,
       
    },
    {
      field: "status" ,
       headerName: "Status",
       minWidth: 140,
       flex: 1,
       cellClassName: (params) => {
        return(
          params.getValue(params.id , "status") === "Delivered"
          ? "greenColor" : "redColor"
        )
       }
    },
    {
      field: "itemsQty" ,
       headerName: "items Qty",
       type: "number",
       minWidth: 140,
       flex: 1
    },
    {
      field: "amount" ,
       headerName: "Amount",
       type: "number",
       minWidth: 140,
       flex: 1
    },
    {
      field: "action" ,
       headerName: "Action",
       type: "number",
       minWidth: 140,
       flex: 1,
       sortable: false,
       renderCell : (params) => {
        return(
          <Link to={`/order/${params.getValue(params.id, "id")}`} > <MdLaunch /> </Link>
        )
       }
    }
    ]


    orders && orders.forEach((item ,index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id:item._id,
        status:item.orderStatus,
        amount: item.totalPrice,
      })
    })







    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }

      dispatch(myOrders())
      
    }, [error, dispatch, alert,  ])
    




  return (
    <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={"my orders"} />
                <div className="myOrdersMain">
                    <div className="myOrdersContainer">
                        <div className="myOrdersBox">
                            <h1 className="heading">My Order's</h1>
                            <DataGrid 
                            rows={rows}
                            columns={columns}
                            pageSize={3}
                            disableSelectionOnClick
                            className='myOrdersTable'
                            autoHeight
                            />

                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default MyOrders