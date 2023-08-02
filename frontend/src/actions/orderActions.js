import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERRORS, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS, SINGLE_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL } from "../constants/orderConstants"
import axios from "axios"



export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({type:CREATE_ORDER_REQUEST, })


        const config = {headers: { "Content-Type":"application/json"}};
       

        const {data} = await axios.post("/api/v1/order/new" ,order, config )

   

        dispatch({type:CREATE_ORDER_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:CREATE_ORDER_FAIL, payload:error.response.data.Error})
    }
}





export const myOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type:MY_ORDERS_REQUEST, })


       

        const {data} = await axios.get("/api/v1/orders/my" )

    

        dispatch({type:MY_ORDERS_SUCCESS, payload:data.order})

    } catch (error) {
        dispatch({type:MY_ORDERS_FAIL, payload:error.response.data.message})
    }
}









export const singleOrder = (id) => async (dispatch) => {
    try {
        dispatch({type:SINGLE_ORDER_REQUEST, })


       

        const {data} = await axios.get(`/api/v1/order/${id}` )


        dispatch({type:SINGLE_ORDER_SUCCESS, payload:data.singleOrder})

    } catch (error) {
        dispatch({type:SINGLE_ORDER_FAIL, payload:error.response.data.message})
    }
}










export const allOrder = () => async (dispatch) => {
    try {
        dispatch({type:ADMIN_ORDER_REQUEST, })


       

        const {data} = await axios.get(`/api/v1/orders/all`, )

        

        dispatch({type:ADMIN_ORDER_SUCCESS, payload:data.order})

    } catch (error) {
        dispatch({type:ADMIN_ORDER_FAIL, payload:error.response.data.Error})
    }
}











export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({type:DELETE_ORDER_REQUEST, })


       

        const {data} = await axios.delete(`/api/v1/order/delete/${id}`)


        dispatch({type:DELETE_ORDER_SUCCESS, payload:data.success})

    } catch (error) {
        dispatch({type:DELETE_ORDER_FAIL, payload:error.response.data.Error})
    }
}














export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({type:UPDATE_ORDER_REQUEST, })


        const config = {headers: { "Content-Type":"application/json"}};
        

       

        const {data} = await axios.put(`/api/v1/order/update/${id}`, order, config)

    

        dispatch({type:UPDATE_ORDER_SUCCESS, payload:data.success})

    } catch (error) {
        dispatch({type:UPDATE_ORDER_FAIL, payload:error.response.data.Error})
    }
}









//clearing all errors

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    });
};