import React, { Fragment } from 'react'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAlert, } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import "./ProductsList.css"
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productAction'
import SideBar from './SideBar'
import {FiEdit2} from "react-icons/fi"
import {AiFillDelete} from "react-icons/ai"
import {DataGrid} from "@material-ui/data-grid"
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom'







const ProductsList = () => {


  const {loading , products, error} = useSelector((state) => state.products)

  const {error:deleteError, success} = useSelector((state)=>state.deleteProduct)

  const navigate = useNavigate()

  const alert = useAlert()

  const dispatch = useDispatch()

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }
    



  const columns = [
    {field:"id" , headerName:"product ID", minWidth: 200, flex: 2 },
    {
      field: "name",
      headerName:"Name",
      minWidth:100,
      flex:1
    },
    {
      field: "stock",
      headerName:"Stock",
      type: "number",
      minWidth:50,
      flex:1,
      cellClassName: (params) => {
        return params.getValue(params.id, "stock") !== 0
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "price",
      headerName:"Price",
      type: "number",
      minWidth:50,
      flex:1
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
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


  products && products.forEach((item)=> {
    rows.push({
      name: item.name,
      stock: item.stock,
      price:item.price,
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
      alert.success("Product Deleted Successfully")
      navigate("/admin/products")
    }

    dispatch(getAdminProducts())


  }, [alert, error, dispatch, deleteError, success, navigate ])
  



  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={"ADMIN PRODUCTS"} />

         <div className="main">
         <div className="dashboard">
            <SideBar/>
          


          <div className="productsListContainer">
            <h1 className="heading">ALL PRODUCTS</h1>

            <DataGrid
            columns={columns}
            rows={rows}
            autoHeight
            disableSelectionOnClick
            pageSize={8}
            className='productsListTable'
            />
          </div>
          </div>
         </div>


        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductsList