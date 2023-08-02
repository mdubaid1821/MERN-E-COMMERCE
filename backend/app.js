const express = require("express");
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");









//connecting config


  require("dotenv").config({ path: "backend/config/config.env" });


// Your other routes and middleware go here



const errorMiddleware = require("./middlewares/error")

app.use(express.json());
app.use(cookieParser());
// Enable CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// middleware for error

app.use(errorMiddleware);





//route imports

const product= require("./routes/productroute");
const error = require("./middlewares/error");
const user = require("./routes/userRoutes");
const order = require("./routes/orderroute");
const payment = require("./routes/paymentRoute")

app.use("/api/v1",product);

app.use("/api/v1",user);

app.use("/api/v1",order);

app.use("/api/v1", payment);




app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
 });




module.exports=app