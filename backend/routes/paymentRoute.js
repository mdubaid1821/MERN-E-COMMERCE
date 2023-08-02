const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authentication");

router.route("/payment").post(isAuthenticatedUser, processPayment);

router.route("/stripeApiKey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;