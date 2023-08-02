import React, { Fragment , useState,} from 'react';
import "./Shipping.css"
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import {AiFillHome} from "react-icons/ai"
import {FcPhone} from "react-icons/fc"
import {MdPersonPinCircle} from "react-icons/md"
import {GiModernCity} from "react-icons/gi"
import {TbBuildingEstate} from "react-icons/tb"
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { saveShippingInfo } from '../../actions/cartActions';
import ShippingSteps from './ShippingSteps';

const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {shippingInfo} = useSelector((state)=>state.cart)
    const alert = useAlert()


    const [address, setAddress] = useState(shippingInfo.address)
    const [number, setNumber] = useState(shippingInfo.number)
    const [pincode, setPincode] = useState(shippingInfo.pincode)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)


    const shippingSubmit = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({address,number,city,pincode,state}))

        alert.success("ShippingInfo saved")

        navigate("/order/confirm")

    }
    


    
    
    

  return (
    <Fragment>
        <MetaData title={"Shipping Details"} />

        

        <div className="shippingInfoMain">
            <div className="shippingInfoContainer">
                <div className="shippingInfoBox">
                
                    <h4>Shipping Address</h4>
                    <ShippingSteps activeStep={0} />
                <form className="shippingForm" encType='multipart/form-data' onSubmit={shippingSubmit}>
                            <div className="shippingAddress">
                                <AiFillHome/>
                                <input type="text" placeholder='Enter Your Address' required maxLength={30} value={address} onChange={(e)=>setAddress(e.target.value)}/>
                            </div>
                            <div className="shippingNumber">
                                <FcPhone/>
                                <input type="tel" placeholder='Enter Your Number' pattern='[0-9]{10}' id='mobile' required value={number} maxLength={10} onChange={(e)=>setNumber(e.target.value)}/>
                            </div>
                            <div className="shippingCity">
                                <GiModernCity/>
                                <input type="text" placeholder='Enter Your City' required maxLength={20} value={city} onChange={(e)=>setCity(e.target.value)} />
                            </div>
                            <div className="shippingPincode">
                                <MdPersonPinCircle/>
                                <input type="text" placeholder='Enter Your Pincode' required maxLength={10} value={pincode} onChange={(e)=>setPincode(e.target.value)} />
                            </div>
                            <div className="shippingState">
                                <TbBuildingEstate/>
                                <input type="text" placeholder='Enter Your State' required maxLength={20} value={state} onChange={(e)=>setState(e.target.value)} />
                            </div>
                           
                            <input type='submit' className='shippingBtn' value={"Continue"}/>
                </form>
                
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping