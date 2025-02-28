const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

// Xem thông tin cá nhân
router.get(
  "/users/profile",
  authMiddleware.verifyToken,
  userController.getPersonalInfo
);

// Cập nhật thông tin cá nhân
router.put(
  "/users/profile",
  authMiddleware.verifyToken,
  userController.updatePersonalInfo
);

// Đổi mật khẩu
router.put(
  "/users/change-password",
  authMiddleware.verifyToken,
  userController.changePassword
);

// Lấy danh sách ADMIN/CUSTOMER/OWNER
router.get(
  "/users/:role",
  [authMiddleware.verifyToken, authMiddleware.isOwner],
  userController.getUserList
);

module.exports = router;

/**
 * @swagger
 * /api/v1/users/{role}:
 *   get:
 *     summary: ADMIN/OWNER - Lấy danh sách người dùng theo vai trò
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         description: Vai trò của người dùng
 *         require: true
 *         example: ADMIN
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
 * /api/v1/users/profile:
 *   get:
 *     summary: OWNER/ADMIN/CUSTOMER - Xem thông tin cá nhân
 *     tags:
 *       - Users
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
 * /api/v1/users/profile:
 *   put:
 *     summary: OWNER/ADMIN/CUSTOMER - Sửa thông tin cá nhân
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
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
 * /api/v1/users/change-password:
 *   put:
 *     summary: OWNER/ADMIN/CUSTOMER - Thay đổi mật khẩu
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
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
