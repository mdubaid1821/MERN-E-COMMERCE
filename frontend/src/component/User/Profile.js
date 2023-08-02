import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { Link,} from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./Profile.css"
import Loader from '../layout/Loader/Loader'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const {user, loading, isAuthenticated} = useSelector(state=>state.user)
    const navigate = useNavigate()


    useEffect(() => {
      if(isAuthenticated===false){
        navigate("/login")
      }
    }, [isAuthenticated, navigate])


    


  return (
   <Fragment>
    {loading ? <Loader/> : (
         <Fragment>
         <MetaData title={`My Profile`}/>
 
        <div className="profileMain">
        <div className="profileContainer">
             <div className="profileBox">
             <div>
                 {user && user.avatar && <img src={user.avatar.url} alt={user.name} />} <br/>
                 <Link to={"/me/update"}>Edit Profile</Link>
             </div>
             <div className='update'>
                 <div>
                     <h4>Full Name</h4>
                     {user && <p>{user.name}</p>}
                 </div>
                 <div>
                     <h4>E-mail</h4>
                     {user && <p>{user.email}</p>}
                 </div>
                 <div>
                     <Link to={"/orders/my"}>My Orders</Link> <br/>
                     <Link to={"/password/update"}>Change Password</Link>
                 </div>
             </div>
             </div>
         </div>
        </div>
     </Fragment>
    )}
   </Fragment>
  )
}

export default Profile