const Product = require("../models/product models");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Order = require("../models/ordermodels"); // Changed the variable name to Order

// create order
exports.newOrder = catchAsyncErrors(async(req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  const newOrder = await Order.create({ // Changed the variable name to newOrder
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    order: newOrder, // Changed the variable name to newOrder
    success: true,
    message: "order placed successfully",
  });
});


// get single order

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
  const singleOrder = await Order.findById(req.params.id).populate("user","name email",)

  if(!singleOrder){
    return next(new ErrorHandler("order not found",404))
  };

  res.status(200).json({
    success:true,
    message:"order details fetched successfully",
    singleOrder,
  });
});






//logged in users - order

exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.find({user: req.user._id})


  res.status(200).json({
    success:true,
    message:"order details ",
    order,
  });
});




// GET ALL ORDERS -- admin

exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.find()

  let totalamount = 0;

  order.forEach((order)=>{
    totalamount+= order.totalPrice
  });


  res.status(200).json({
    success:true,
    message:"All orders details ",
    count:order.length,
    totalamount,
    order,
  });
});







// update order status -- admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}


// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message:"order has been deleted",
  });
});
