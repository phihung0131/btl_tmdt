const sendResponse = require("../helper/sendResponse");
const Promotion = require("../models/Promotion");
const Product = require("../models/Product");

const promotionController = {
  create: async (req, res) => {
    try {
      const {
        product,
        name,
        description,
        discountPercent,
        startDate,
        endDate,
      } = req.body;

      const productExist = await Product.findById(product);
      if (!productExist) {
        return sendResponse(res, 404, "Sản phẩm không tồn tại");
      }

      const newPromotion = new Promotion({
        product,
        name,
        description,
        discountPercent,
        startDate,
        endDate,
      });

      const newPromotionData = {
        _id: newPromotion._id,
        productID: newPromotion.product,
        name: newPromotion.name,
        description: newPromotion.description,
        discountPercent: newPromotion.discountPercent,
        startDate: newPromotion.startDate,
        endDate: newPromotion.endDate,
        createdAt: newPromotion.createdAt,
      };

      await newPromotion.save();
      sendResponse(res, 201, "Tạo khuyến mãi thành công", {
        promotion: newPromotionData,
      });
    } catch (error) {
      sendResponse(res, 400, "Lõi tạo khuyến mãi", error.toString());
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;

      const promotion = await Promotion.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      }).select("-deleted -updatedAt -__v");
      if (!promotion) {
        return sendResponse(res, 404, "Khuyến mãi không tồn tại");
      }

      sendResponse(res, 200, "Sửa khuyễn mãi thành công", { promotion });
    } catch (error) {
      sendResponse(res, 400, "Lõi sửa khuyến mãi", error.toString());
    }
  },

  del: async (req, res) => {
    try {
      const { id } = req.params;

      const promotion = await Promotion.findById(id);
      if (!promotion) {
        return sendResponse(res, 404, "Khuyến mãi không tồn tại");
      }

      await promotion.delete(); // Soft delete
      sendResponse(res, 200, "Xóa khuyễn mãi thành công");
    } catch (error) {
      sendResponse(res, 400, "Lõi xóa khuyến mãi", error.toString());
    }
  },

  getAllPromotions: async (req, res) => {
    try {
      // Tìm tất cả các khuyến mãi và sắp xếp theo startDate tăng dần (sớm trước, muộn sau)
      const promotions = await Promotion.find()
        .populate("product", "name _id")
        .sort({ startDate: 1, endDate: 1 })
        .select("-deleted -updatedAt -__v"); // 1 là tăng dần, -1 là giảm dần

      sendResponse(res, 200, "Lấy tất cả khuyến mãi thành công", {
        promotions,
      });
    } catch (error) {
      sendResponse(res, 500, "Lỗi lấy tất cả khuyến mãi", error.toString());
    }
  },

  getPromotionForAProduct: async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await Product.findById(productId);
      if (!product) {
        return sendResponse(res, 404, "Sản phẩm không tồn tại");
      }

      // Tìm các khuyến mãi của sản phẩm và sắp xếp theo startDate tăng dần
      const promotions = await Promotion.find({ product: productId })
        .sort({
          startDate: 1,
          endDate: 1,
        })
        .select("-__v -updatedAt -deleted");

      sendResponse(res, 200, "Lấy khuyến mãi của một sản phẩm thành công", {
        promotions,
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        "Lỗi lấy khuyến mãi của một sản phẩm",
        error.toString()
      );
    }
  },
};

module.exports = promotionController;
