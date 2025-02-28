const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const reviewController = require("../controllers/reviewController");

// Add a new review
router.post(
  "/review",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  reviewController.create
);

// Update a review
router.put(
  "/review/:id",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  reviewController.update
);

// Delete a review
router.delete(
  "/review/:id",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  reviewController.del
);

module.exports = router;

/**
 * @swagger
 * /api/v1/review:
 *   post:
 *     summary: CUSTOMER - Tạo review sản phẩm
 *     tags:
 *       - Review
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
 *               comment:
 *                 type: string
 *                 example: tốt
 *               rating:
 *                 type: number
 *                 example: 4.5
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
 * /api/v1/review/{id}:
 *   put:
 *     summary: CUSTOMER - Sửa review sản phẩm
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id của review cần sửa
 *         require: true
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
 *               comment:
 *                 type: string
 *                 example: tốt
 *               rating:
 *                 type: number
 *                 example: 4.5
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
 * /api/v1/review/{id}:
 *   delete:
 *     summary: CUSTOMER - Xóa review sản phẩm
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: [] # Kết nối security scheme với API
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id của review cần xóa
 *         require: true
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
