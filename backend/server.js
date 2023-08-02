const app = require("./app.js");
const connectDatabase = require("./config/database.js")
const cloudinary = require("cloudinary");


//handling uncaught exceptions

process.on("uncaughtException", err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejections`);
    process.exit(1);
});




//connecting config


    require("dotenv").config({ path: "backend/config/config.env" });
  



//databse connecting
connectDatabase();




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });







app.listen(process.env.PORT,()=>{

    console.log(`server is working on http://localhost:${process.env.PORT}`)
});





//unhandled promise rejections

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejections`);

    Server.close(()=>{
        process.exit(1);
    });
});

