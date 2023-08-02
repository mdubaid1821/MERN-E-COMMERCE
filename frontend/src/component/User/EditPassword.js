import React, { Fragment, useState, useEffect} from 'react'
import "./EditPassword.css"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate,} from "react-router-dom"
import {useAlert} from "react-alert"
import { editPassword, clearErrors } from '../../actions/profileActions';
import Loader from '../layout/Loader/Loader';
import {FiEye,FiEyeOff} from "react-icons/fi"
import {LuUnlock, LuLock} from "react-icons/lu";
import MetaData from '../layout/MetaData'


const EditPassword = () => {


  const {error, loading, updatedUser} = useSelector((state)=>state.profile)
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();


  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'old') {
      setShowOldPassword(!showOldPassword);
    } else if (passwordType === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const editPasswordSubmit = (e) =>{
    e.preventDefault()

  const myForm = new FormData()

  myForm.set("oldPassword", oldPassword);
  myForm.set("newPassword", newPassword);
  myForm.set("confirmPassword", confirmPassword);
  dispatch(editPassword(myForm));
  }





  useEffect(() => {
  
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    if(updatedUser){
      alert.success("Password Updated Successfully")
      navigate("/account")
    }
    
  }, [dispatch, error, alert, navigate, updatedUser])
  






  return (
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
          <MetaData title={"Update-Password"} />
          <div className="editPasswordMain">
            <div className="editPasswordContainer">
              <div className="editPasswordBox">
              <form action="" className="editPasswordForm" onSubmit={editPasswordSubmit}>
                <h4>Update Password</h4>
                <div className="editPasswordOld">
                <LuLock />
                <input type={showOldPassword ? "text" : "password"} placeholder='Enter Your Password' required name='oldPassword' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                <span className="editPasswordIcon" onClick={()=>togglePasswordVisibility('old')}>{showOldPassword ? <FiEye/> : <FiEyeOff/>}</span>
                </div>
                <div className="editPassword">
                <LuUnlock />
                <input type={showNewPassword ? "text" : "password"} placeholder='Enter Your New Password' required name='newPassword' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                <span className="editPasswordIcon" onClick={()=>togglePasswordVisibility('new')}>{showNewPassword ? <FiEye/> : <FiEyeOff/>}</span>
                </div>
                <div className="editPasswordConfirm">
                <LuUnlock />
                <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Your New Password' required name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <span className="editPasswordIcon" onClick={()=>togglePasswordVisibility('confirm')}>{showConfirmPassword ? <FiEye/> : <FiEyeOff/>}</span>
                </div>
                <input type="submit" className="editPasswordBtn" value="save"  />
                </form>
              </div>
            </div>
          </div>
          
        </Fragment>
      )}
    </Fragment>
  )
}

export default EditPassword