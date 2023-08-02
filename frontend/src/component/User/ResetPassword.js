import React, { Fragment, useState, useEffect} from 'react'
import "./ResetPassword.css"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,useParams} from "react-router-dom"
import {useAlert} from "react-alert"
import { resetPassword, clearErrors } from '../../actions/profileActions';
import Loader from '../layout/Loader/Loader';
import {FiEye,FiEyeOff} from "react-icons/fi"
import {LuUnlock} from "react-icons/lu";
import MetaData from '../layout/MetaData'


const ResetPassword = () => {



    const {error, loading, message} = useSelector((state)=>state.forgotPassword)
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();



    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const resetPasswordSubmit = (e) =>{
    e.preventDefault()

  const myForm = new FormData()

  myForm.set("password", password);
  myForm.set("confirmPassword", confirmPassword);
  dispatch(resetPassword(params.token,myForm));
  }


    useEffect(() => {
  
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        if(message){
          alert.success("Reset Password Successfull")
          navigate("/login")
        }
        
      }, [dispatch, error, alert, navigate, message])
  
      


  return (
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
          <MetaData title={"Update-Password"} />
          <div className="resetPasswordMain">
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
              <form action="" className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <h4>Reset Password</h4>
                <div className="resetPassword">
                <LuUnlock />
                <input type={showNewPassword ? "text" : "password"} placeholder='Enter Your New Password' required name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <span className="resetPasswordIcon" onClick={()=>togglePasswordVisibility('new')}>{showNewPassword ? <FiEye/> : <FiEyeOff/>}</span>
                </div>
                <div className="resetPasswordConfirm">
                <LuUnlock />
                <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Your New Password' required name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <span className="resetPasswordIcon" onClick={()=>togglePasswordVisibility('confirm')}>{showConfirmPassword ? <FiEye/> : <FiEyeOff/>}</span>
                </div>
                <input type="submit" className="resetPasswordBtn" value="save"  />
                </form>
              </div>
            </div>
          </div>
          
        </Fragment>
      )}
    </Fragment>
  )
}

export default ResetPassword