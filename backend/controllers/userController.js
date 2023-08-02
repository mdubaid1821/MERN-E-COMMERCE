const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/usermodels");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const dotenv = require("dot-env")

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale"},
    function(error, result) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Result:", result);
      }
    });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});


//login user

exports.loginUser = catchAsyncErrors (async(req,res,next)=>{
    const{email,password} = req.body;

    //checking if user has given email and password

    if (!email||!password){
        return next (new ErrorHandler("please enter e-mail and password",400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid e-mail or password",401));

    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid e-mail or password",401));
    }

    sendToken(user,200,res);


    });


    //logout user

    exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
       
      
        res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        });
      
        res.status(200).json({
          success: true,
          message: "Logged out successfully",
        });
      });
      


    //forgot password

    exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
        const user = await User.findOne({email:req.body.email});

        if (!user){
            return next(new ErrorHandler("user not found",404));
        };


        //get reset password token
        const resetToken = user.getResetPasswordToken();

        await user.save({validateBeforeSave:false});

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`

        const message = `your reset token is a :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

        try{

            await sendEmail({

                email:user.email,
                subject:`E-commerce password recovery`,
                message,

            });

            res.status(200).json({
                success:true,
                message:`E-mail sent to ${user.email} successfully`,
            });

        }catch (error){
            user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined,

            await user.save({validateBeforeSave:false});

            return next(new ErrorHandler(error.message,500));

        }
        
    });


    //reset password

    exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

        //creating hash token

    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt:Date.now()},
    });

    if (!user){
        return next(new ErrorHandler("reset password token is invalid or has been expired",400));
    };

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));

    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;


    await user.save();


    sendToken(user,200,res);


    });


    //get user details

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);


    res.status(200).json({
        success:true,
        user,
    });
});

//UPDATE user password

exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Password does not match", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  
    const message = "Password updated successfully.";
  
    res.status(200).json({
      success: true,
      message,
      user,
    });
  });




  //UPDATE USER PROFILE

  exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if(req.body.avatar!==""){
      const user = await User.findById(req.user.id)

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId)

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"})

        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        }
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false });
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: user,
    });
  });
  


  //get all users

  exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{

    const users = await User.find();


    res.status(200).json({
      success:true,
      users,
    });
  });



   //get single user

   exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    };


    res.status(200).json({
      success:true,
      user,
    });
  });





    //UPDATE USER ROLE -- admin

    exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
      };
    
      const user = await User.findById(req.user.id);
    
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
    
      user.name = newUserData.name;
      user.email = newUserData.email;
    
      await user.save();
    
      res.status(200).json({
        success: true,
        message: "role updated successfully",
        
      });
    });






      //delete USER-- admin

  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
   
  
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, ));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId)
  
  
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message:"User deleted successfully"
      
    });
  });