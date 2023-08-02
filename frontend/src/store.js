import { configureStore , combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, updateProductReducer } from "./reducers/ProductReducer";
import { allUserReducer, deleteUserReducer, updateUserReducer, userReducer } from "./reducers/userReducer";
import { forgotPasswordReducer, profileReducer } from "./reducers/profileReducers";
import { cartReducer } from "./reducers/cartReducers";
import { SingleOrderReducer, allOrderReducer, createOrderReducer, deleteOrderReducer, myOrdersReducer, updateOrderReducer } from "./reducers/orderReducers";

const middleware = [thunk];

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};


const allReducers = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  order:createOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails: SingleOrderReducer,
  newReview: newReviewReducer,
  createProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  adminOrders: allOrderReducer,
  deleteOrder: deleteOrderReducer,
  updateOrder: updateOrderReducer,
  allUsers: allUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  
  

  
  
  
  
  
  
  
})

const store = configureStore({
  reducer: allReducers,
  preloadedState:initialState,
  middleware,
  
  // Add any other store configurations if needed
});

export default store;
