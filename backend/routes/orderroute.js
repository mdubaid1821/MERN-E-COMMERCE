const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/ordercontrollers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/my").get(isAuthenticatedUser,myOrders);
router.route("/orders/all").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.route("/order/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder);
router.route("/order/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)

module.exports = router;
