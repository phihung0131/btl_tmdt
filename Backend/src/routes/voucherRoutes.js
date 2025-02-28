const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");
const authMiddleware = require("../middlewares/auth");

// Tạo voucher
router.post(
  "/vouchers",
  // [authMiddleware.verifyToken, authMiddleware.isOwner],
  voucherController.addVoucher
);

// Sửa voucher
router.put(
  "/vouchers/:id",
  // [authMiddleware.verifyToken, authMiddleware.isOwner],
  voucherController.updateVoucher
);

// Xóa voucher
router.delete(
  "/vouchers/:id",
  [authMiddleware.verifyToken, authMiddleware.isOwner],
  voucherController.deleteVoucher
);

// Lấy tất cả voucher
router.get(
  "/vouchers",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  voucherController.getAllVouchers
);

// Lấy một voucher cụ thể
router.get(
  "/vouchers/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  voucherController.getVoucher
);

// Thống kê số liệu voucher
router.get(
  "/vouchers/:id/stats",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  voucherController.getVoucherStats
);

// Xóa các voucher hết hạn
router.post(
  "/vouchers/deactivate-expired",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  voucherController.deactivateExpiredVouchers
);

module.exports = router;
/**
 * @swagger
 * /api/v1/vouchers:
 *   post:
 *     summary: OWNER - Tạo voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: CODEDUIDUI
 *               discountPercent:
 *                 type: number
 *                 example: 10
 *               expirationDate:
 *                 type: date
 *                 example: 2024-10-20
 *               quantity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /api/v1/vouchers:
 *   get:
 *     summary: OWNER/ADMIN - Lấy tất cả voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /api/v1/vouchers/{id}:
 *   put:
 *     summary: OWNER - Sửa voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discountPercent:
 *                 type: number
 *                 example: 10
 *               expirationDate:
 *                 type: date
 *                 example: 2024-10-20
 *               quantity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /api/v1/vouchers/{id}:
 *   delete:
 *     summary: OWNER - Xóa voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /api/v1/vouchers/{id}:
 *   get:
 *     summary: OWNER/ADMIN - Lấy một voucher cụ thể
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /api/v1/vouchers/{id}/stats:
 *   get:
 *     summary: OWNER/AMDIN - Thống kê số liệu voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
/**
 * @swagger
 * /api/v1/vouchers/deactivate-expired:
 *   post:
 *     summary: OWNER/ADMIN - Xóa các voucher hết hạn
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
