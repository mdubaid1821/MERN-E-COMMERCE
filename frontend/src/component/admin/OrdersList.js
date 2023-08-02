import React, { Fragment } from 'react'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAlert, } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import "./OrderList.css"
import SideBar from './SideBar'
import {FiEdit2} from "react-icons/fi"
import {AiFillDelete} from "react-icons/ai"
import {DataGrid} from "@material-ui/data-grid"
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom'
import { allOrder, clearErrors, deleteOrder } from '../../actions/orderActions'







const OrdersList = () => {


  const {loading , orders, error} = useSelector((state) => state.adminOrders)

  const {error:deleteError, success} = useSelector((state)=>state.deleteOrder)

  const navigate = useNavigate()

  const alert = useAlert()

  const dispatch = useDispatch()

  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id))
  }
    



  const columns = [
    {field:"id" , headerName:"order ID", minWidth: 200, flex: 2 },
    {
      field: "items",
      headerName:"orderItems",
      minWidth:100,
      flex:1.5
    },
    {
      field: "price",
      headerName:"Total Price",
      type: "number",
      minWidth:50,
      flex:1.5
    },
    {
      field: "status",
      headerName:"orderStatus",
      minWidth:50,
      flex:2,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName:"Actions",
      type: "number",
      minWidth:100,
      flex:1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/order/update/${params.getValue(params.id, "id")}`}>
              <FiEdit2 />
            </Link>

            <Button onClick={() => {deleteProductHandler(params.getValue(params.id, "id"))}}>
              <AiFillDelete />
            </Button>
          </Fragment>
        );
      },
    },
    
  ]


  const rows = []


  orders && orders.forEach((item)=> {
    rows.push({
      items: item.orderItems.length,
      price: item.totalPrice,
      status:item.orderStatus,
      id: item._id
    })

  })





  useEffect(() => {
    
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if(success){
      alert.success("Order Deleted Successfully")
      navigate("/orders/all")
    }

    dispatch(allOrder())


  }, [alert, error, dispatch, deleteError, success, navigate ])
  



  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={"ADMIN-ORDERS"} />

         <div className="main">
         <div className="dashboard">
            <SideBar/>
          


          <div className="OrderListContainer">
            <h1 className="heading">ALL ORDERS</h1>

            <DataGrid
            columns={columns}
            rows={rows}
            autoHeight
            disableSelectionOnClick
            pageSize={8}
            className='OrderListTable'
            />
          </div>
          </div>

         </div>

        </Fragment>
      )}
    </Fragment>
  )
}

export default OrdersList