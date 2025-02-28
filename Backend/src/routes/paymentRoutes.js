const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post(
  "/payment/momo/callback",
  orderController.handleMomoPaymentCallback
);

router.post(
    "/payment/zalopay/callback",
    orderController.handleZaloPaymentCallback
  );

module.exports = router;
