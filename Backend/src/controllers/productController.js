const sendResponse = require("../helper/sendResponse");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Review = require("../models/Review");
const Promotion = require("../models/Promotion");

const transformProductData = (product) => {
  const colorSummary = {};
  let totalQuantity = 0;

  product.infos.forEach((info) => {
    if (!colorSummary[info.color]) {
      colorSummary[info.color] = {
        sizes: {},
        totalQuantity: 0,
      };
    }

    colorSummary[info.color].sizes[info.size] = info.quantity;
    colorSummary[info.color].totalQuantity += info.quantity;
    totalQuantity += info.quantity;
  });

  return {
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    promotionalPrice: product.promotionalPrice,
    imageUrl: product.imageUrl,
    category: product.category,
    totalRate: product.totalRate,
    colorSummary: Object.entries(colorSummary).map(([color, data]) => ({
      color,
      sizes: Object.entries(data.sizes).map(([size, quantity]) => ({
        size: Number(size),
        quantity,
      })),
      totalQuantity: data.totalQuantity,
    })),
    totalQuantity,
    totalColors: Object.keys(colorSummary).length,
    totalSizes: [...new Set(product.infos.map((info) => info.size))].length,
  };
};

const productsController = {
  // Lấy danh sách tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Get products with all fields
      const products = await Product.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({ path: "category", select: "name -_id" });

      // Transform product data using the shared function
      const transformedProducts = products.map(transformProductData);

      const total = await Product.countDocuments();

      sendResponse(res, 200, "Lấy dữ liệu Product thành công", {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        products: transformedProducts,
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        `Có lỗi xảy ra khi lấy dữ liệu Product: ${error.message}`,
        {
          error: error.toString(),
          stack: error.stack,
        }
      );
    }
  },

  // Tìm kiếm và lọc sản phẩm theo các tiêu chí
  searchAndFilterProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const searchQuery = req.query.search || "";
      const category = req.query.category || null;
      const priceRange = req.query.priceRange || null;
      const sortBy = req.query.sortBy || "createdAt";
      const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
      const minRating = parseFloat(req.query.minRating) || 0;

      let query = { name: { $regex: searchQuery, $options: "i" } };

      if (category) {
        const categoryTemp = await Category.findOne({
          name: { $regex: category, $options: "i" },
        });
        if (categoryTemp) {
          query.category = categoryTemp._id;
        }
      }

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-");
        query.price = { $gte: minPrice, $lte: maxPrice };
      }

      if (minRating > 0) {
        query.totalRate = { $gte: minRating };
      }

      let sort = {};
      if (sortBy === "price") {
        sort.price = sortOrder;
      } else if (sortBy === "rating") {
        sort.totalRate = sortOrder;
      } else if (sortBy === "name") {
        sort.name = sortOrder;
      } else {
        sort.createdAt = sortOrder;
      }

      const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate({ path: "category", select: "name -_id" });

      const transformedProducts = products.map(transformProductData);

      const total = await Product.countDocuments(query);

      sendResponse(res, 200, "Tìm kiếm dữ liệu Product thành công", {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        products: transformedProducts,
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        `Có lỗi xảy ra khi lấy tìm kiếm Product: ${error.message}`,
        {
          error: error.toString(),
          stack: error.stack,
        }
      );
    }
  },

  // Lấy thông tin chi tiết của một sản phẩm
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate({
        path: "category",
        select: "name -_id",
      });

      if (!product) {
        return sendResponse(res, 404, "Sản phẩm không tồn tại");
      }

      const reviews = await Review.find({ product: req.params.id })
        .select("-deleted -__v")
        .populate({ path: "customer", select: "name _id" });

      const currentDate = new Date();
      const activePromotions = await Promotion.find({
        product: req.params.id,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      }).select("-deleted -__v");

      const transformedProduct = transformProductData(product);

      const productDetails = {
        ...transformedProduct,
        reviews,
        activePromotions,
      };

      sendResponse(
        res,
        200,
        "Lấy dữ liệu chi tiết Product thành công",
        productDetails
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        `Có lỗi xảy ra khi lấy dữ liệu Product: ${error.message}`,
        {
          error: error.toString(),
          stack: error.stack,
        }
      );
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      // Kiểm tra xem category có tồn tại không (giả sử bạn có model Category)
      const category = await Category.findById(productData.categoryId);
      if (!category) {
        return sendResponse(res, 400, "Danh mục không tồn tại");
      }
      productData.category = category._id;
      // Xử lý các file đã tải lên
      if (req.files && req.files.length > 0) {
        productData.imageUrl = req.files.map((file) => file.path);
      }
      productData.infos = JSON.parse(productData.infos);
      // Tạo sản phẩm mới
      const newProduct = new Product(productData);

      // Lưu sản phẩm vào database
      await newProduct.save();

      // const newProductData = {
      //   productID: newProduct._id,
      //   name: newProduct.name,
      //   description: newProduct.description,
      //   price: newProduct.price,
      //   imageUrl: newProduct.imageUrl,
      //   category: newProduct.category,
      //   totalRate: newProduct.totalRate,
      //   infos: newProduct.infos,
      //   createdAt: newProduct.createdAt,
      // };

      // Transform the updated product data
      const transformedProduct = transformProductData(newProduct);

      return sendResponse(res, 201, "Sản phẩm đã được tạo thành công", {
        product: transformedProduct,
      });
    } catch (error) {
      console.error(error);

      return sendResponse(res, 500, "Có lỗi xảy ra khi tạo sản phẩm", {
        error: error.toString(),
      });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validate category if it's being updated
      if (updateData.categoryId) {
        const category = await Category.findById(updateData.categoryId);
        if (!category) {
          return sendResponse(res, 400, "Danh mục không tồn tại");
        }
        updateData.category = category._id;
        delete updateData.categoryId;
      }

      // Parse infos if it's a string
      if (typeof updateData.infos === "string") {
        updateData.infos = JSON.parse(updateData.infos);
      }

      // Find the product and update it
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).populate({ path: "category", select: "name -_id" });

      if (!updatedProduct) {
        return sendResponse(res, 404, "Sản phẩm không tồn tại");
      }

      // Transform the updated product data
      const transformedProduct = transformProductData(updatedProduct);

      return sendResponse(res, 200, "Sản phẩm đã được cập nhật thành công", {
        product: transformedProduct,
      });
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Có lỗi xảy ra khi cập nhật sản phẩm", {
        error: error.toString(),
      });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Use the soft delete method provided by mongoose-delete
      const deletedProduct = await Product.delete({ _id: id });

      if (!deletedProduct) {
        return sendResponse(res, 404, "Sản phẩm không tồn tại");
      }

      return sendResponse(res, 200, "Sản phẩm đã được xóa thành công");
    } catch (error) {
      console.error(error);
      return sendResponse(res, 500, "Có lỗi xảy ra khi xóa sản phẩm", {
        error: error.toString(),
      });
    }
  },

  updateProductTotalRate: async (productId) => {
    const reviews = await Review.find({ product: productId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    await Product.findByIdAndUpdate(productId, { totalRate: averageRating });
  },

  updatePromotionalPrices: async () => {
    const currentDate = new Date();

    // Find all active promotions
    const activePromotions = await Promotion.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    for (const promotion of activePromotions) {
      const product = await Product.findById(promotion.product);
      if (product) {
        const discountedPrice =
          product.price * (1 - promotion.discountPercent / 100);
        await Product.findByIdAndUpdate(product._id, {
          promotionalPrice: discountedPrice,
        });
      }
    }

    // Reset promotional prices for products without active promotions
    await Product.updateMany(
      {
        _id: { $nin: activePromotions.map((p) => p.product) },
        promotionalPrice: { $ne: null },
      },
      { promotionalPrice: null }
    );
  },

  getPromotionalProducts: async (req, res) => {
    try {
      const products = await Product.find({ promotionalPrice: { $ne: null } });

      const transformedProducts = products.map(transformProductData);
      return sendResponse(
        res,
        200,
        "Lấy dữ liệu sản phẩm khuyễn mãi thành công",
        { products: transformedProducts }
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        "Có lỗi xảy ra khi lấy dữ liệu sản phẩm khuyễn mãi",
        {
          error: error.toString(),
        }
      );
    }
  },
};

module.exports = productsController;
