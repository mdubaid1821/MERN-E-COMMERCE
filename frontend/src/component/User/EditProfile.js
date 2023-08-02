import React, { Fragment, useState, useEffect} from 'react';
import Loader from '../layout/Loader/Loader';
import "./EditProfile.css";
import MetaData from '../layout/MetaData';
import {useDispatch , useSelector} from "react-redux";
import {editProfile, clearErrors} from "../../actions/profileActions"
import {loadUser} from "../../actions/userActions"
import {useAlert,} from "react-alert"
import { useNavigate} from 'react-router-dom';
import {GrMail} from "react-icons/gr";
import {FaUser} from "react-icons/fa"


const EditProfile = () => {

    const { user,} = useSelector((state)=>state.user)
    const {error, loading, updatedUser} = useSelector((state)=>state.profile)
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState();
    const [email, setEmail] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("/profile.jpg");
  

    const editProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(editProfile(myForm));
      };
    
      const editProfileDataChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };
    
  
          
        
    
    
        useEffect(() => {
          if(user){
           setName(user.name)
           setEmail(user.email)
           setAvatar(user.avatar)
          }
          if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
          if(updatedUser){
            alert.success("Profile Updated Successfully")
            dispatch(loadUser())
            navigate("/account")
          }
          
        }, [dispatch, error, alert, navigate, user, updatedUser])
        

  return (
    <Fragment>
        <MetaData title={"Update-Profile"} />
        {loading ? <Loader/>:(
            <Fragment>
                <div className="editProfileMain">
                <div className="editProfileContainer">
                  <div className="editProfileBox">
                  <h2>Edit Profile</h2>
                  <form className="editProfileForm" onSubmit={editProfileSubmit} encType='multipart/form-data'>
                            
                            <div className="editProfileName">
                                <FaUser />
                                <input type="text" placeholder='Enter Your Name' name='name' required value={name} onChange={(e)=>setName(e.target.value)} />
        
                            </div>
                            
                            <div className="editProfileEmail">
                                <GrMail />
                                <input type="email" placeholder='Enter Your Email' required name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        
                            </div>
                            
                            <div id="editProfileImage">
                                <img src={avatarPreview} alt=">>>" />
                                <input type="file" name="avatar" accept="image/*" onChange={editProfileDataChange}  />
                            </div>
                            <input type="submit" className="editProfileBtn" value="Save"  />
                        </form>
                  </div>
                </div>
                </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default EditProfile