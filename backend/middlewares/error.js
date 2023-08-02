const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");


module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message =  err.message || "Internal Server Error";

    //wrong mongodb id error
    if(err.name==="castError"){
        const message=`Resource not found. Invalid:${err.path}`;
        err= new ErrorHandler(message,400);
    }


    //mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} found`;
        err= new ErrorHandler(message,400);
    }


    //wrong JWt error
    if(err.name === "JsonWebTokenError"){
        const message = `json web token is invalid , try again`;
        err= new ErrorHandler(message,400);
    }


    //jWT expire error
    if(err.name === "TokenExpiredError"){
        const message = `json web token is invalid , try again`;
        err= new ErrorHandler(message,400);
    }



    res.status(err.statuscode).json({
        success:false,
        Error:err.message,

    });
    };

