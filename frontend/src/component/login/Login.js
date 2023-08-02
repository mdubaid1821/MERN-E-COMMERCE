import React, { Fragment , useRef, useState, useEffect} from 'react';
import {GrMail} from "react-icons/gr";
import {LuUnlock} from "react-icons/lu";
import { Link, } from 'react-router-dom';
import {FaUser} from "react-icons/fa"
import "./LoginRegister.css"
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import {useDispatch , useSelector} from "react-redux";
import {clearErrors , login, registerUser} from "../../actions/userActions"
import {useAlert} from "react-alert"
import {FiEye,FiEyeOff} from "react-icons/fi"
import { useNavigate} from 'react-router-dom';

const LoginRegister = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,loading,isAuthenticated} = useSelector((state)=>state.user)
    const navigate = useNavigate();



    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

  
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState()

    

    const [user , setUser] = useState({
        name : "",
        email: "",
        password:""

    })
    const {name , email, password} = user;

    
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/profile.jpg");

    const loginSubmit = (e)=>{
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword));
    }

   
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registerUser(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      
    


    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
      if(isAuthenticated){
        navigate("/")
        alert.success("WELCOME TO E-COMMERCE")
      }
    }, [dispatch, error, alert, navigate, isAuthenticated, ])
    




    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };
    






      return (
        <Fragment>
            {loading ? <Loader />:(
                <Fragment>
                <MetaData title="Login/Register -- E-COMMERCE" />
                <div className="loginRegisterMain">
                <div className="loginRegisterContainer">
                    <div className="loginRegisterBox">
                        <div>
                            <div className="loginRegisterToggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <GrMail />
                                <input type="email" placeholder='Enter Your Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
        
                            </div>
                            <div className="loginPassword">
                                <LuUnlock />
                                <input type={showPassword ? "text" : "password"} placeholder='Enter Your Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                                <span className="passwordIcon" onClick={togglePasswordVisibility}>{showPassword ? <FiEye/>:<FiEyeOff/>}</span>
                            </div>
                            <Link to="/password/forgot">Forgot Password?</Link>
                            <input type="submit" className="loginBtn" value="Login" />
                        </form>
    
                        <form className="registerForm" ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data'>
                            
                            <div className="registerName">
                                <FaUser />
                                <input type="text" placeholder='Enter Your Name' name='name' required value={name} onChange={registerDataChange} />
        
                            </div>
                            
                            <div className="registerEmail">
                                <GrMail />
                                <input type="email" placeholder='Enter Your Email' required name='email' value={email} onChange={registerDataChange} />
        
                            </div>
                            <div className="registerPassword">
                                <LuUnlock />
                                <input type={showPassword ? "text" : "password"} placeholder='Enter Your Password' required name='password' value={password} onChange={registerDataChange}/>
                                <span className="registerpasswordIcon" onClick={togglePasswordVisibility}>{showPassword ? <FiEye/> : <FiEyeOff/>}</span>
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt=">>.." />
                                <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}  />
                            </div>
                            <input type="submit" className="registerBtn" value="Register"  />
                        </form>
                    </div>
                </div>
                </div>
            </Fragment>
            )}
        </Fragment>
      )
    }






 

export default LoginRegister;