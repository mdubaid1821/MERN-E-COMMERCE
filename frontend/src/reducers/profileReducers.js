import {EDIT_PROFILE_REQUEST,EDIT_PROFILE_SUCCESS,EDIT_PROFILE_RESET,EDIT_PROFILE_FAIL,CLEAR_ERRORS, EDIT_PASSWORD_REQUEST, EDIT_PASSWORD_SUCCESS, EDIT_PASSWORD_RESET, EDIT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL} from "../constants/profileConstants";






export const profileReducer = (state={}, action) =>{
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            case EDIT_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
                
            }
            case EDIT_PROFILE_SUCCESS:
                case EDIT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                updatedUser:action.payload,
            }
            case EDIT_PROFILE_RESET:
                case EDIT_PASSWORD_RESET:
                return{
                    ...state,
                    updatedUser:false,
                }
            case EDIT_PROFILE_FAIL:
                case EDIT_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
            case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }

    }








    export const forgotPasswordReducer = (state={}, action) =>{
        switch (action.type) {
            case FORGOT_PASSWORD_REQUEST:
                case RESET_PASSWORD_REQUEST:
                return{
                    ...state,
                    loading:true,
                    error:null,
                    
                }
                case FORGOT_PASSWORD_SUCCESS:
                    case RESET_PASSWORD_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    message:action.payload,
                }
                case FORGOT_PASSWORD_FAIL:
                    case RESET_PASSWORD_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload,
                }
                case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
    
        }