const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");

// Tạo đơn hàng
router.post(
  "/orders",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  orderController.create
);

// Xem tất cả đơn hàng dành cho customer
router.get(
  "/orders",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  orderController.getAllOrdersForCustomer
);

// Xem 1 đơn hàng cụ thể
router.get(
  "/orders/:id",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  orderController.getAOrderForCustomer
);

// Xem tất cả đơn hàng dành cho admin/owner
router.get(
  "/admin/orders",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  orderController.getAllOrdersForAdmin
);

// Xem 1 đơn hàng cụ thể cho admin/owner
router.get(
  "/admin/orders/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  orderController.getAOrderForAdmin
);

// Cập nhật trạng thái đơn hàng
router.put(
  "/admin/orders/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  orderController.updateOrderStatus
);

// Cập nhật trạng thái đơn hàng
module.exports = router;

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: CUSTOMER - Tạo đơn hàng
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: paymentMethod - COD/MOMO/ZALO
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "66f6405f15cc467edadcd4a2"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     color:
 *                       type: string
 *                       example: "Black"
 *                     size:
 *                       type: integer
 *                       example: 48
 *               codeVoucher:
 *                 type: string
 *                 example: ""
 *               paymentMethod:
 *                 type: string
 *                 enum: [ZALO, MOMO, COD]
 *                 example: "COD"
 *               name:
 *                 type: string
 *                 example: "Hùng"
 *               phone:
 *                 type: string
 *                 example: "0345812804"
 *               address:
 *                 type: string
 *                 example: "HCM"
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
 * /api/v1/orders:
 *   get:
 *     summary: CUSTOMER - Lấy tất cả lấy đơn đã tạo
 *     tags:
 *       - Orders
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
 * /api/v1/orders/{id}:
 *   get:
 *     summary: CUSTOMER - Get a specific order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
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
 * /api/v1/admin/orders:
 *   get:
 *     summary: ADMIN/OWNER - Xem tất cả đơn hàng dành
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Vị trí trang (không có thì mặc định 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số sản phẩm trong 1 trang (không có thì mặc định 10)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Lọc theo trạng thái (Success, Failure, Delivering, Order successful, Preparing goods, Waiting for payment)
 *         example: Order successful
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: tìm kiếm trong các thuộc tính name, phone, address của đơn hàng
 *         example: 0345999999
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Lấy các đơn sau start date
 *         example: 2024-10-20
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: Lấy các đơn trước end date
 *         example: 2024-10-20
 *       - in: query
 *         name: minTotal
 *         schema:
 *           type: string
 *         description: Lấy các đơn trên minTotal
 *         example: 500000
 *       - in: query
 *         name: maxTotal
 *         schema:
 *           type: string
 *         description: Lấy các đơn dưới maxTotal
 *         example: 500000000
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
 * /api/v1/admin/orders/{id}:
 *   get:
 *     summary: ADMIN/OWNER - Xem 1 đơn hàng cụ thể
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
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
 * /api/v1/admin/orders/{id}:
 *   put:
 *     summary: ADMIN/OWNER - Cập nhật trạng thái của đơn hàng
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       description: status - (Success, Failure, Delivering, Order successful, Preparing goods, Waiting for payment)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Success"
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
