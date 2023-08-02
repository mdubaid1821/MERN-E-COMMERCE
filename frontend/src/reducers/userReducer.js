import{LOGIN_REQUEST ,
     LOGIN_SUCCESS ,
      LOGIN_FAIL ,
      REGISTER_USER_REQUEST,
      REGISTER_USER_SUCCESS,
      REGISTER_USER_FAIL,
      LOAD_USER_REQUEST,
      LOAD_USER_SUCCESS,
      LOAD_USER_FAIL,
      LOGOUT_USER_SUCCESS,
      LOGOUT_USER_FAIL,
       CLEAR_ERRORS,
       ALL_USER_REQUEST,
       ALL_USER_SUCCESS,
       ALL_USER_FAIL,
       DELETE_USER_REQUEST,
       DELETE_USER_SUCCESS,
       DELETE_USER_FAIL,
       UPDATE_USER_REQUEST,
       UPDATE_USER_SUCCESS,
       UPDATE_USER_FAIL} from "../constants/userConstants";



export const userReducer = (state={user:{}}, action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
            case REGISTER_USER_REQUEST:
                case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenticated:false,
            }
            case LOGIN_SUCCESS:
                case REGISTER_USER_SUCCESS:
                    case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            }
            case LOGOUT_USER_SUCCESS:
                return{
                    loading:false,
                    user:null,
                    isAuthenticated:false,
                }
            case LOGIN_FAIL:
                case REGISTER_USER_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            }
            case LOAD_USER_FAIL:
                return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
                }
                case LOGOUT_USER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
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













    export const allUserReducer = (state={users:[]}, action) =>{
        switch (action.type) {
            case ALL_USER_REQUEST:
                return{
                    loading:true,
                    ...state,
                }
                case ALL_USER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    users:action.payload,
                }
                case ALL_USER_FAIL:
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
    
    






        export const deleteUserReducer = (state={user:{}}, action) =>{
            switch (action.type) {
                case DELETE_USER_REQUEST:
                    return{
                        loading:true,
                        ...state,
                    }
                    case DELETE_USER_SUCCESS:
                    return{
                        ...state,
                        loading:false,
                        success:action.payload,
                    }
                    case DELETE_USER_FAIL:
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










            export const updateUserReducer = (state={user:{}}, action) =>{
                switch (action.type) {
                    case UPDATE_USER_REQUEST:
                        return{
                            loading:true,
                            ...state,
                        }
                        case UPDATE_USER_SUCCESS:
                        return{
                            ...state,
                            loading:false,
                            success:action.payload,
                        }
                        case UPDATE_USER_FAIL:
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
            
        

















