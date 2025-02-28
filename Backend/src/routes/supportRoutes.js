const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const supportController = require("../controllers/supportController");

// Route for the customer-support page
// lay toan bo support ticket cua customer
/**
 * @swagger
 * /api/v1/customer/support-tickets:
 *   get:
 *     summary: Xem toan bo support ticket cua customer
 *     tags:
 *       - Support/Customer
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
  "/customer/support-tickets",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  supportController.getSupportCustomer
);
/**
 * @swagger
 * /api/v1/customer/support-tickets:
 *   post:
 *     summary: Tao support ticket moi
 *     tags:
 *       - Support/Customer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: ""
 *               description:
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
// tao support ticket moi
router.post(
  "/customer/support-tickets",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  supportController.createSupportTicket
);
/**
 * @swagger
 * /api/v1/customer/support-tickets/{id}:
 *   put:
 *     summary: Sua support ticket
 *     tags:
 *       - Support/Customer
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: ID cua support ticket can sua
 *        example: ""
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: ""
 *               description:
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
// sua support ticket
router.put(
  "/customer/support-tickets/:id",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  supportController.updateSupportTicket
);
/**
 * @swagger
 * /api/v1/customer/support-tickets/{id}:
 *   delete:
 *     summary: Xoa support ticket
 *     tags:
 *       - Support/Customer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: ID cua support ticket can xoa
 *        example: ""
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
// xoa support ticket
router.delete(
  "/customer/support-tickets/:id",
  [authMiddleware.verifyToken, authMiddleware.isCustomer],
  supportController.deleteSupportTicket
);

// Route for the admin-support page
/**
 * @swagger
 * /api/v1/admin/support-tickets:
 *   get:
 *     summary: Xem toan bo support ticket cua tat ca customer-admin
 *     tags:
 *       - Support/Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, finish, update]
 *         description: Trạng thái của support ticket (e.g., pending, finish, update)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *           default: newest
 *         description: Sắp xếp theo thời gian tạo mới nhất hoặc cũ nhất
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
// lay toan bo support ticket cua tat ca customer
router.get(
  "/admin/support-tickets",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  supportController.getSupportAdmin
);
/**
 * @swagger
 * /api/v1/admin/support-tickets/{id}:
 *   put:
 *     summary: Phan hoi support ticket
 *     tags:
 *       - Support/Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: ID cua support ticket can phan hoi
 *        example: ""
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               respond:
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
// phan hoi support ticket
router.put(
  "/admin/support-tickets/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  supportController.respondSupportTicket
);

module.exports = router;

