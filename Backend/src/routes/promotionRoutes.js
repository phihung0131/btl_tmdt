const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const promotionController = require("../controllers/promotionController");

// Add a new promotion
router.post(
  "/promotion",
  [authMiddleware.verifyToken, authMiddleware.isOwner],
  promotionController.create
);

// Update a promotion
router.put(
  "/promotion/:id",
  [authMiddleware.verifyToken, authMiddleware.isOwner],
  promotionController.update
);

// Delete a promotion (soft delete)
router.delete(
  "/promotion/:id",
  [authMiddleware.verifyToken, authMiddleware.isOwner],
  promotionController.del
);

// Get all promotions
router.get(
  "/promotion",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  promotionController.getAllPromotions
);

// Get promotions for a specific product
router.get(
  "/promotion/product/:productId",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  promotionController.getPromotionForAProduct
);

module.exports = router;

/**
 * @swagger
 * /api/v1/promotion:
 *   post:
 *     summary: OWNER - Tạo khuyễn mãi cho sản phẩm
 *     tags:
 *       - Promotion
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 example: 66f6405f15cc467edadcd4a2
 *               name:
 *                 type: string
 *                 example: Khuyễn mãi 1
 *               description:
 *                 type: string
 *                 example: Đây là khuyễn mãi 1
 *               discountPercent:
 *                 type: number
 *                 example: 20
 *               startDate:
 *                 type: string
 *                 example: 2024-10-01
 *               endDate:
 *                 type: string
 *                 example: 2024-10-07
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
 * /api/v1/promotion/{id}:
 *   put:
 *     summary: OWNER - Sửa khuyễn mãi cho sản phẩm
 *     tags:
 *       - Promotion
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id của promotion cần sửa
 *         required: true
 *         example: 66fd0fb811458de3be726305
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 example: 66f6405f15cc467edadcd4a2
 *               name:
 *                 type: string
 *                 example: Khuyễn mãi 1
 *               description:
 *                 type: string
 *                 example: Đây là khuyễn mãi 1
 *               discountPercent:
 *                 type: number
 *                 example: 100
 *               startDate:
 *                 type: string
 *                 example: 2024-10-01
 *               endDate:
 *                 type: string
 *                 example: 2024-10-07
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
 * /api/v1/promotion:
 *   delete:
 *     summary: OWNER - Xóa khuyễn mãi cho sản phẩm
 *     tags:
 *       - Promotion
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id của promotion cần xóa
 *         required: true
 *         example: 66fd0fb811458de3be726305
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
 * /api/v1/promotion:
 *   get:
 *     summary: OWNER/ADMIN - Xem khuyễn mãi cho tất cả sản phẩm
 *     tags:
 *       - Promotion
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
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
 * /api/v1/promotion/product/{productId}:
 *   get:
 *     summary: OWNER/ADMIN - Lấy khuyễn mãi của 1 sản phẩm
 *     tags:
 *       - Promotion
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         description: Id của sản phẩm cần lấy khuyến mãi
 *         required: true
 *         example: 66fd0fb811458de3be726305
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
