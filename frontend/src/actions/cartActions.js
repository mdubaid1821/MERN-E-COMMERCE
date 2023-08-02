
import { ADD_TO_CART, DELETE_FROM_CART, SAVE_SHIPPING_INFO, CLEAR_CART } from "../constants/cartConstants"
import axios from "axios"




export const addToCart = (id , Quantity) => async(dispatch, getstate) => {
        
        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({type:ADD_TO_CART, payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            Quantity,
        }})

        localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems))

    }



    export const deleteFromCart = (id) => async(dispatch, getstate) => {
        dispatch({
            type:DELETE_FROM_CART,
            payload:id,
        })
        localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems))
    }




    export const saveShippingInfo = (userData) => async(dispatch) => {
        dispatch({
            type:SAVE_SHIPPING_INFO,
            payload:userData,
        })
        localStorage.setItem("shippingInfo", JSON.stringify(userData))



        
    }

    export const clearCart = () => (dispatch) => {
        dispatch({ type: CLEAR_CART });
      };