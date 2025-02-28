const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes");
const authRoutes = require("./authRoutes");
const cartRoutes = require("./cartRoutes");
const reviewRoutes = require("./reviewRoutes");
const promotionRoutes = require("./promotionRoutes");
const orderRoutes = require("./orderRoutes");
const paymentRoutes = require("./paymentRoutes");
const userRoutes = require("./userRoutes");
const supportRoutes = require("./supportRoutes");
const voucherRoutes = require("./voucherRoutes");
const reportRoutes = require("./reportRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/", productRoutes);
router.use("/", authRoutes);
router.use("/", cartRoutes);
router.use("/", reviewRoutes);
router.use("/", promotionRoutes);
router.use("/", orderRoutes);
router.use("/", paymentRoutes);
router.use("/", userRoutes);
router.use("/", supportRoutes);
router.use("/", voucherRoutes);
router.use("/", reportRoutes);
router.use("/", adminRoutes);

module.exports = router;
