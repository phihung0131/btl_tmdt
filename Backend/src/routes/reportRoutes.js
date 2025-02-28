const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const reportController = require("../controllers/reportController");

// API báo cáo đơn hàng
router.get("/reports/orders/summary",
    [authMiddleware.verifyToken, (authMiddleware.isOwner || authMiddleware.isAdmin)],
    reportController.getOrdersSumary);

// API báo cáo doanh thu
router.get("/reports/revenue/:period",
    [authMiddleware.verifyToken, (authMiddleware.isOwner || authMiddleware.isAdmin)],
    reportController.getRevenue);
//Owner
/**
 * @swagger
 * /api/v1/reports/revenue-by-category/{period}:
 *   get:
 *     summary: OWNER - Báo cáo doanh thu theo danh muc san pham
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           default: 2024-10-14
 *         description: Nhóm kết quả theo ngày, tuần hoặc tháng (day/week/year/ngaycuthe)
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
    // phan tich doanh thu theo danh muc san pham
    router.get("/reports/revenue-by-category/:period",authMiddleware.verifyToken,authMiddleware.isAdminOrOwner,
        reportController.getRevenueByCategory);
/**
 * @swagger
 * /api/v1/reports/promotion-effectiveness/{period}:
 *   get:
 *     summary: OWNER - Báo cáo hieu qua chuong trinh khuyen mai
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           default: 2024-10-14
 *         description: Nhóm kết quả theo ngày, tuần hoặc tháng (day/week/year/ngaycuthe)
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
    // phan tich hieu qua cua chuong trinh khuyen mai
    router.get("/reports/promotion-effectiveness/:period",authMiddleware.verifyToken,authMiddleware.isAdminOrOwner,
        reportController.getPromotionEffectiveness);
    // tong quan kinh doanh
/**
 * @swagger
 * /api/v1/reports/business-overview/{period}:
 *   get:
 *     summary: OWNER - Báo cáo tai chinh tong quan
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           default: 2024-10-14
 *         description: Nhóm kết quả theo ngày, tuần hoặc tháng (day/week/year/ngaycuthe)
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
    router.get("/reports/business-overview/:period",authMiddleware.verifyToken,authMiddleware.isAdminOrOwner,
        reportController.getBusinessOverview);
module.exports = router;

/**
 * @swagger
 * /api/v1/reports/revenue/{period}:
 *   get:
 *     summary: ADMIN/OWNER - Báo cáo doanh thu
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *         description: Nhóm kết quả theo ngày, tuần hoặc tháng (day/week/year)
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
 * /api/v1/reports/orders/summary:
 *   get:
 *     summary: OWNER/ADMIN - Báo cáo đơn hàng (phân loại từng đơn hàng, số lượng và giá tri trung bình)
 *     tags:
 *       - Reports
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



