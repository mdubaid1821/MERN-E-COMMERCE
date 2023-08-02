import { ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstants";







export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true,

            }
            case CREATE_ORDER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    order:action.payload

                }
                case CREATE_ORDER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                        default:
                            return state
    }
}













export const myOrdersReducer = (state = {Orders:[]}, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return{
                
                loading:true,

            }
            case MY_ORDERS_SUCCESS:
                return{
                    loading:false,
                    orders:action.payload

                }
                case MY_ORDERS_FAIL:
                    return{
                        loading:false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                        default:
                            return state
    }
}






export const SingleOrderReducer = (state = {Order: {}}, action) => {
    switch (action.type) {
        case SINGLE_ORDER_REQUEST:
            return{
                
                loading:true,

            }
            case SINGLE_ORDER_SUCCESS:
                return{
                    loading:false,
                    order:action.payload

                }
                case SINGLE_ORDER_FAIL:
                    return{
                        loading:false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                        default:
                            return state
    }
}













export const allOrderReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ADMIN_ORDER_REQUEST:
            return{
                ...state,
                loading:true,

            }
            case ADMIN_ORDER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    orders:action.payload

                }
                case ADMIN_ORDER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                        default:
                            return state
    }
}









export const deleteOrderReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return{
                ...state,
                loading:true,

            }
            case DELETE_ORDER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    success:action.payload

                }
                case DELETE_ORDER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                        default:
                            return state
    }
}












export const updateOrderReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true,

            }
            case UPDATE_ORDER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    success:action.payload

                }
                case UPDATE_ORDER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                        default:
                            return state
    }
}