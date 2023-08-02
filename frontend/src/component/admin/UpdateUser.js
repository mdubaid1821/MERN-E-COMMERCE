
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
import {MdAccountTree, MdEmail, MdOutlineDriveFileRenameOutline } from "react-icons/md"
import { updateUser, clearErrors } from '../../actions/userActions';





const UpdateUser = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams()


    const {loading, error,} = useSelector((state)=>state.allUsers)

    const {success, error:updatedError} = useSelector((state)=>state.updateUser)

    

    const id = params.id

    
    
    const [name , setName] = useState()
    const [email , setEmail] = useState()    
    const [role , setRole] = useState("")
   


    const categories = ["user", "admin"];





    const updateFormSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        
        myForm.set("name", name);
        myForm.set("email", email);        
        myForm.set("role", role);
       


        dispatch(updateUser(id, myForm));
      }

      

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
            alert.success("User Updated Successfully")
          navigate("/admin/users")
        }
      }, [dispatch, error, alert, navigate, success, id, updatedError, ])


  return (
    <Fragment>
    {loading ? <Loader />:(
        <Fragment>
        <MetaData title="User Update -- E-COMMERCE" />
        
            <div className="dashboard">
                <SideBar />

                <div className="createProductContainer">
                <form className="createProductForm" encType='multipart/form-data' onSubmit={updateFormSubmitHandler}>

                    <h1>Update User Role</h1>




                    <div className="createProductName">
                        <MdOutlineDriveFileRenameOutline />
                        <input type="text" placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} />

                    </div>


                    <div className="createProductName">
                        <MdEmail />
                        <input type="email" placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} />

                    </div>
                    
                   
                    <div className="createProductPassword">
                        <MdAccountTree />
                        <select value={role} onChange={(e) => setRole(e.target.value)} > <option value="">Set Role</option> {categories.map((item)=>(
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


export default UpdateUser