import{LOGIN_REQUEST , LOGIN_SUCCESS , LOGIN_FAIL , CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL} from "../constants/userConstants";
import axios from "axios"


//login
export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({type:LOGIN_REQUEST})

        const config = {headers: { "Content-Type":"application/json"}};
        
        const data = await axios.post(`/api/v1/login`, {email,password},config)

        dispatch({type:LOGIN_SUCCESS, payload:data.data.user})

    } catch (error) {

        dispatch({type:LOGIN_FAIL, payload:error.response.data.Error})
    }

}




//registerUser
export const registerUser = (userData) =>async (dispatch) => {
    try {
        dispatch({type:REGISTER_USER_REQUEST})

        const config = {headers: { "Content-Type":"multipart/form-data"}};
        
        const data = await axios.post(`/api/v1/register`, userData, config)
        
        

        dispatch({type:REGISTER_USER_SUCCESS , payload:data.data.user})
    } catch (error) {
        dispatch({type:REGISTER_USER_FAIL, payload:error.response.data.Error})
    }
}




//loadUser

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST})

        
        const data = await axios.get(`/api/v1/me`)

        dispatch({type:LOAD_USER_SUCCESS, payload:data.data.user})

    } catch (error) {

        dispatch({type:LOAD_USER_FAIL, payload:error.response.data.Error})
    }

}

//logout

export const logout = () => async(dispatch) => {
    try {

       const {data} = await axios.get(`/api/v1/logout`)
       

        dispatch({type:LOGOUT_USER_SUCCESS})

    } catch (error) {

        dispatch({type:LOGOUT_USER_FAIL, payload:error.response.data.Error})
    }

}







export const allUser = () =>async (dispatch) => {
    try {
        dispatch({type:ALL_USER_REQUEST})

        const config = {headers: { "Content-Type":"multipart/form-data"}};
        
        const data = await axios.get(`/api/v1/admin/users`,  config)
        
        

        dispatch({type:ALL_USER_SUCCESS , payload:data.data.users})
    } catch (error) {
        dispatch({type:ALL_USER_FAIL, payload:error.response.data.Error})
    }
}








export const updateUser = (id, userData) =>async (dispatch) => {
    try {
        dispatch({type:UPDATE_USER_REQUEST})

        const config = {headers: { "Content-Type":"multipart/form-data"}};
        
        const data = await axios.put(`/api/v1/admin/user/${id}`, userData, config)
        
        

        dispatch({type:UPDATE_USER_SUCCESS , payload:data.data.success})
    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL, payload:error.response.data.Error})
    }
}











export const deleteUser = (id) =>async (dispatch) => {
    try {
        dispatch({type:DELETE_USER_REQUEST})

        const config = {headers: { "Content-Type":"multipart/form-data"}};
        
        const data = await axios.delete(`/api/v1/admin/user/${id}`,  config)
        
        

        dispatch({type:DELETE_USER_SUCCESS , payload:data.data.success})
    } catch (error) {
        dispatch({type:DELETE_USER_FAIL, payload:error.response.data.Error})
    }
}








//clearing all errors

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORS
    });
};