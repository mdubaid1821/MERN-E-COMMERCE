
import React, { Fragment , useState, useEffect} from 'react';
import { useParams, } from 'react-router-dom';
import "./CreateProduct.css"
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import {useDispatch , useSelector} from "react-redux";
import {useAlert} from "react-alert"
import { useNavigate} from 'react-router-dom';
import { Button } from "@material-ui/core";
import SideBar from './SideBar'
import {MdAccountTree, } from "react-icons/md"
import { updateOrder, clearErrors } from '../../actions/orderActions';





const OrderStatus = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams()


    const {loading, error, } = useSelector((state)=>state.adminOrders)

    const {success, error:updatedError} = useSelector((state)=>state.updateOrder)

    const id = params.id

    
    const [status , setStatus] = useState("")
   



    const categories = ["Shipped", "Delivered"];





    const updateFormSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        
        myForm.set("status", status);
       


        dispatch(updateOrder(id, myForm));
      };

     

      

      useEffect(() => {
          if (updatedError) {
            alert.error(updatedError);
            dispatch(clearErrors());
          }

        if(error){
            alert.error(error);
            dispatch(clearErrors())
          }
        if(success){
            alert.success("Product Updated Successfully")
          navigate("/orders/all")
        }
      }, [dispatch, error, alert, navigate, success, id, updatedError, ])


  return (
    <Fragment>
    {loading ? <Loader />:(
        <Fragment>
        <MetaData title="OrderStatus -- E-COMMERCE" />
        
            <div className="dashboard">
                <SideBar />

                <div className="createProductContainer">
                <form className="createProductForm" encType='multipart/form-data' onSubmit={updateFormSubmitHandler}>

                    <h1>Update Order Status</h1>
                    
                   
                    <div className="createProductPassword">
                        <MdAccountTree />
                        <select value={status} onChange={(e) => setStatus(e.target.value)} > <option value="">Set Status</option> {categories.map((item)=>(
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))} </select>
                    </div>
                

                    <Button id='createProductBtn' type='submit' disabled={loading ? true: false}>UPDATE</Button>

                </form>
                </div>
            </div>
                
           
        
       
    </Fragment>
    )}
</Fragment>
  )
}


export default OrderStatus