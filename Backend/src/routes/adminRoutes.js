const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const adminController = require("../controllers/adminController");

// swager
/**
 * @swagger
 * /api/v1/owner/grant-admin:
 *   post:
 *     summary: OWNER-Cap quyen admin
 *     tags:
 *       - Admin Manage
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 example: "abc@gmail.com"
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
// cap quyen admin
router.post(
    "/owner/grant-admin",
    [authMiddleware.verifyToken, authMiddleware.isOwner],
    adminController.grantAdmin
);
/**
 * @swagger
 * /api/v1/owner/revoke-admin:
 *   post:
 *     summary: OWNER-Xoa quyen admin
 *     tags:
 *       - Admin Manage
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 example: "abc@gmail.com"
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
// xoa quyen admin
router.post(
    "/owner/revoke-admin",
    [authMiddleware.verifyToken, authMiddleware.isOwner],
    adminController.revokeAdmin
);
 module.exports = router;