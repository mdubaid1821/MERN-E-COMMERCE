import { EDIT_PROFILE_FAIL, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, CLEAR_ERRORS, EDIT_PASSWORD_REQUEST, EDIT_PASSWORD_SUCCESS, EDIT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../constants/profileConstants";
import axios from "axios";





export const editProfile = (userData) =>async (dispatch) => {
    try {
        dispatch({type:EDIT_PROFILE_REQUEST})

        const config = {headers: { "Content-Type":"multipart/form-data"}};
        
        const data = await axios.put(`/api/v1/me/update`, userData, config)
        
        

        dispatch({type:EDIT_PROFILE_SUCCESS , payload:data.data.user})
    } catch (error) {
        dispatch({type:EDIT_PROFILE_FAIL, payload:error.response.data.Error})
    }
}






export const editPassword = (userData) =>async (dispatch) => {
    try {
        dispatch({type:EDIT_PASSWORD_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };
        
        const data = await axios.put(`/api/v1/password/update`, userData, config )
        
        

        dispatch({type:EDIT_PASSWORD_SUCCESS , payload:data.data.user})
    } catch (error) {
        dispatch({type:EDIT_PASSWORD_FAIL, payload:error.response.data.Error})
    }
}






export const forgotPassword = (email) =>async (dispatch) => {
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };
        
        const data = await axios.post(`/api/v1/password/forgot`, email, config )
        
        

        dispatch({type:FORGOT_PASSWORD_SUCCESS , payload:data.data.message})
    } catch (error) {
        dispatch({type:FORGOT_PASSWORD_FAIL, payload:error.response.data.Error})
    }
}







export const resetPassword = (token,userData) =>async (dispatch) => {
    try {
        dispatch({type:RESET_PASSWORD_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };
        
        const data = await axios.put(`/api/v1/password/reset/${token}`, userData, config )
        
        

        dispatch({type:RESET_PASSWORD_SUCCESS , payload:data.data.user})
    } catch (error) {
        dispatch({type:RESET_PASSWORD_FAIL, payload:error.response.data.Error})
    }
}







//clearing all errors

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    });
};