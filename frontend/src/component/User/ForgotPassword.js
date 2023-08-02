import React, { Fragment, useState , useEffect} from 'react'
import "./ForgotPassword.css"
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import {GrMail} from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/profileActions';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {

const {error, loading, message} = useSelector((state)=>state.forgotPassword)
  const dispatch = useDispatch();
  const alert = useAlert();


    const [email, setEmail] = useState()



    const forgotPasswordSubmit = (e) =>{
        e.preventDefault()
    
      const myForm = new FormData()
    
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
      }
    
    
    
    
    
      useEffect(() => {
      
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        if(message){
          alert.success(message)
          
        }
        
      }, [dispatch, error, alert, message])
      




  return (
    <Fragment>
        {loading ? <Loader/> : (
            <Fragment>
                <MetaData title={"Forgot-Password"} />
                <div className="forgotPasswordMain" onSubmit={forgotPasswordSubmit}>
                    <div className="forgotpasswordContainer">
                        <div className="forgotPasswordBox">
                          <h2>Forgot Password</h2>
                       <form action="" className="forgotPasswordForm">
                       <div className="forgotPasswordEmail">
                                <GrMail />
                                <input type="email" placeholder='Enter Your Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <input type="submit" value="Send" className="forgotPasswordBtn" />
                       </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default ForgotPassword