import { ADD_TO_CART, DELETE_FROM_CART, SAVE_SHIPPING_INFO , CLEAR_CART} from "../constants/cartConstants";








export const cartReducer = (state = {cartItems:[]},action ) =>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;

            const itemExist = state.cartItems.find(
                (i) => i.product === item.product
            )

            if(itemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                    i.product === itemExist.product ? item : i)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

            case DELETE_FROM_CART:
                return{
                    ...state,
                    cartItems: state.cartItems.filter((i) => i.product !== action.payload)
                }

                case SAVE_SHIPPING_INFO:
                    return{
                        ...state,
                        shippingInfo:action.payload,
                    }

                    case CLEAR_CART:
                        return {
                          ...state,
                          cartItems: [],
                        };
                        default:
                            return state
    }
}




