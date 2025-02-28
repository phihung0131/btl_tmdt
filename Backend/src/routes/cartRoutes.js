const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartController");

const authMiddleware = require("../middlewares/auth");
// xem san pham trong gio hang
// hiển thị tổng giá trị đơn hàng
/**
 * @swagger
 * /api/v1/carts:
 *   get:
 *     summary: Xem gio hang
 *     tags:
 *       - Cart
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
router.get(
  "/carts",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  cartsController.getCarts
);
/**
 * @swagger
 * /api/v1/carts:
 *   put:
 *     summary: Cap nhat gio hang
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartProductId:
 *                 type: string
 *                 example: ""
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               color:
 *                 type: string
 *                 example: "Black"
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
router.put('/carts', 
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  cartsController.updateCart
);
/**
 * @swagger
 * /api/v1/carts:
 *   delete:
 *     summary: Xoa san pham gio hang
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartProductId:
 *                 type: string
 *                 example: ""
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
router.delete('/carts',
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  cartsController.deleteCart
);
// thêm sản phẩm vào giỏ hàng
/**
 * @swagger
 * /api/v1/carts:
 *   post:
 *     summary: Them san pham vao gio hang
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: ""
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               color:
 *                 type: string
 *                 example: "Black"
 *               size:
 *                 type: integer
 *                 example: 48
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
router.post('/carts',
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  cartsController.addProductToCart
);
module.exports = router;