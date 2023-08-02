const Product = require("../models/product models");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary")

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
});

//get admin products

exports.getAdminProducts = catchAsyncErrors(async(req,res,next) => {
  const products= await Product.find()

  res.status(200).json({
    success: true,
    products,
  })
})

// Update product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }


  product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product - Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // /delete image for cloudinary

  let images = product.images

  for (let i = 0; i < images.length; i++) {
    
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product has been deleted successfully",
  });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});







// create or update product review


exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

  const {rating,comment,productId}= req.body;
  const review = {
    user:req.user_id,
    name:req.user.name,
    rating: Number(rating),
    comment,

  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
  product.reviews.forEach((rev) => {
    if (rev.user.toString() === req.user._id.toString()) {
      rev.rating = rating,
      rev.comment = comment;
    }
  });
} else {
  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;
}




const avg = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
product.ratings = avg / product.reviews.length;

  
  
  product.ratings =avg/product.reviews.length;

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
    message:"Rated successfully"

  });
});



// get all reviews of a product

exports.getAllReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
      return next("Product not found",404);
    }
    
    res.status(200).json({
      success:true,
      reviews: product.reviews,
    });

});
  








