const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");
const authMiddleware = require("../middlewares/auth");
const upload = require("../config/multer");

// Lấy tất cả sản phẩm với phân trang
router.get("/products", productsController.getAllProducts);

// Tìm kiếm và lọc sản phẩm với phân trang
router.get("/products/search", productsController.searchAndFilterProducts);

// Lấy tất cả sản phẩm có khuyễn mãi
router.get("/products/promotional", productsController.getPromotionalProducts);

// Lấy chi tiết sản phẩm theo ID
router.get("/products/:id", productsController.getProduct);

// Tạo sản phẩm mới
router.post(
  "/products",
  [
    authMiddleware.verifyToken,
    authMiddleware.isAdminOrOwner,
    upload.array("images", 5),
  ],
  productsController.createProduct
);

// Cập nhật sản phẩm
router.put(
  "/products/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  productsController.updateProduct
);

// Xóa sản phẩm
router.delete(
  "/products/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdminOrOwner],
  productsController.deleteProduct
);

module.exports = router;

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: "ALL - Lấy tất cả sản phẩm với phân trang (Note: Product nào có khuyễn mãi sẽ có thêm thuộc tính promotionalPrice)"
 *     tags:
 *       - Products
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
 * /api/v1/products/search:
 *   get:
 *     summary: ALL - Tìm kiếm và lọc sản phẩm với phân trang
 *     tags:
 *       - Products
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Tên sản phẩm cần tìm
 *         example: Adizero Adios Pro 2
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Danh mục sản phẩm cần tìm
 *         example: Giày chạy bộ nam
 *       - in: query
 *         name: priceRange
 *         schema:
 *           type: string
 *         description: Khoảng giá sản phẩm cần tìm
 *         example: 1000-200000
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sắp xếp theo gì (name/prire/rating) => không điền thì xếp theo sản phẩm mới nhất
 *         example: name
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Giảm dần hay tăng dần (mặc định là tăng)
 *         example: desc
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: string
 *         description: Lọc theo rating
 *         example: 3
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
 * /api/v1/products/{id}:
 *   get:
 *     summary: "ALL - Lấy chi tiết sản phẩm theo ID (Note Product nào có khuyễn mãi sẽ có thêm thuộc tính promotionalPrice)"
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Id của sản phẩm cần xem
 *         require: true
 *         example: 66f6405f15cc467edadcd480
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
 * /api/v1/products:
 *   post:
 *     summary: "OWNER/ADMIN - Tạo sản phẩm mới"
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên của sản phẩm
 *                 required: true
 *                 example: "Giày Ultraboost 5"
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *                 required: true
 *                 example: "Được cải tiến nhằm mang lại cảm giác êm ái hơn, thoải mái hơn và nhẹ nhàng hơn cho buổi chạy hoàn toàn khác biệt, giày Ultraboost 5 khai phá năng lượng chạy bộ của bạn."
 *               price:
 *                 type: number
 *                 description: Giá của sản phẩm
 *                 required: true
 *                 example: 4000000
 *               categoryId:
 *                 type: string
 *                 description: ID của danh mục sản phẩm
 *                 required: true
 *                 example: "66f62476c8ffe5afc825e223"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Các file ảnh sản phẩm (tối đa 5 ảnh)
 *               infos:
 *                 type: array
 *                 description: "Thông tin chi tiết (chuỗi JSON ví dụ: [ {'color': 'Black', 'size': 42, 'quantity': 100},{'color': 'Pink', 'size': 45, 'quantity': 100}])"
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       example: "Black"
 *                     size:
 *                       type: number
 *                       example: 42
 *                     quantity:
 *                       type: number
 *                       example: 100
 *                 example: [
 *                   {"color": "Black", "size": 42, "quantity": 100},
 *                   {"color": "Pink", "size": 45, "quantity": 100}
 *                 ]
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
 * /api/v1/products/{id}:
 *   put:
 *     summary: "OWNER/ADMIN - Cập nhật sản phẩm"
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần cập nhật
 *         example: 66f6405f15cc467edadcd4a2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên mới của sản phẩm
 *                 example: "Giày Ultraboost 6"
 *               description:
 *                 type: string
 *                 description: Mô tả mới của sản phẩm
 *                 example: "Phiên bản cải tiến của Ultraboost 5, mang lại trải nghiệm chạy bộ tuyệt vời hơn."
 *               price:
 *                 type: number
 *                 description: Giá mới của sản phẩm
 *                 example: 4500000
 *               categoryId:
 *                 type: string
 *                 description: ID mới của danh mục sản phẩm
 *                 example: "66f62476c8ffe5afc825e224"
 *               infos:
 *                 type: array
 *                 description: "Thông tin chi tiết mới (chuỗi JSON)"
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: string
 *                       example: "White"
 *                     size:
 *                       type: number
 *                       example: 43
 *                     quantity:
 *                       type: number
 *                       example: 150
 *                 example: [
 *                   {"color": "White", "size": 43, "quantity": 150},
 *                   {"color": "Blue", "size": 44, "quantity": 120}
 *                 ]
 *     responses:
 *       '200':
 *         description: Sản phẩm đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Sản phẩm đã được cập nhật thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5ecb74f3e6468c7187f1a"
 *                     name:
 *                       type: string
 *                       example: "Giày Ultraboost 6"
 *                     description:
 *                       type: string
 *                       example: "Phiên bản cải tiến của Ultraboost 5, mang lại trải nghiệm chạy bộ tuyệt vời hơn."
 *                     price:
 *                       type: number
 *                       example: 4500000
 *                     promotionalPrice:
 *                       type: number
 *                       example: null
 *                     imageUrl:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *                     category:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Giày chạy bộ"
 *                     totalRate:
 *                       type: number
 *                       example: 4.5
 *                     colorSummary:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           color:
 *                             type: string
 *                             example: "White"
 *                           sizes:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 size:
 *                                   type: number
 *                                   example: 43
 *                                 quantity:
 *                                   type: number
 *                                   example: 150
 *                           totalQuantity:
 *                             type: number
 *                             example: 150
 *                     totalQuantity:
 *                       type: number
 *                       example: 270
 *                     totalColors:
 *                       type: number
 *                       example: 2
 *                     totalSizes:
 *                       type: number
 *                       example: 2
 *       '400':
 *         description: Lỗi dữ liệu không hợp lệ
 *       '404':
 *         description: Không tìm thấy sản phẩm
 *       '500':
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: "OWNER/ADMIN - Xóa sản phẩm"
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần xóa
 *     responses:
 *       '200':
 *         description: Sản phẩm đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Sản phẩm đã được xóa thành công"
 *       '404':
 *         description: Không tìm thấy sản phẩm
 *       '500':
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/products/promotional:
 *   get:
 *     summary: "ALL - Lấy tất cả sản phẩm có khuyễn mãi"
 *     tags:
 *       - Products
 *     responses:
 *       'XXX':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
