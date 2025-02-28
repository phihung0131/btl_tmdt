const sendResponse = require("../helper/sendResponse");
const Order = require("../models/Order");
const OrderProduct = require("../models/OrderProduct");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Promotion = require("../models/Promotion");
const { response } = require("express");
const { mongo, default: mongoose } = require("mongoose");
const { get } = require("mongoose");

function getDateRange(period) {
  const now = new Date();
  let startDate, endDate;

  switch (period) {
    case "day":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      break;
    case "week":
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay()
      );
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() + 7
      );
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear() + 1, 0, 0);
      break;
    default:
      // Check if the period is a specific date in the format YYYY-MM-DD
      const specificDate = new Date(period);
      if (!isNaN(specificDate)) {
        startDate = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate());
        endDate = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate() + 1);
      } else {
        throw new Error("Invalid period");
      }
  }

  return { startDate, endDate };
}
const reportController = {
  getRevenue: async (req, res) => {
    try {
      const { period } = req.params;
      const { startDate, endDate } = getDateRange(period);

      const pipeline = [
        {
          $match: {
            createdAt: { $gte: startDate, $lt: endDate },
            status: "Success",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalPrice" },
            orders: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
            orders: {
              $map: {
                input: "$orders",
                as: "order",
                in: {
                  _id: "$$order._id",
                  customerId: "$$order.customerId",
                  totalPrice: "$$order.totalPrice",
                  name: "$$order.name",
                  phone: "$$order.phone",
                  address: "$$order.address",
                  createdAt: "$$order.createdAt",
                },
              },
            },
          },
        },
      ];

      const result = await Order.aggregate(pipeline);

      const response = {
        period,
        startDate,
        endDate,
        totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
        orders: result.length > 0 ? result[0].orders : [],
      };
      sendResponse(res, 200, "Lấy báo cáo doanh thu thành công", {
        revenue: response,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống lấy doanh thu", {
        error: error.toString(),
      });
    }
  },

  getOrdersSumary: async (req, res) => {
    try {
      const orderSummary = await Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            averageValue: { $avg: "$totalPrice" },
          },
        },
      ]);

      const totalOrders = orderSummary.reduce(
        (sum, status) => sum + status.count,
        0
      );
      const overallAverageValue =
        orderSummary.reduce(
          (sum, status) => sum + status.averageValue * status.count,
          0
        ) / totalOrders;

      sendResponse(res, 200, "Lấy báo cáo tóm tắt đơn hàng thành công", {
        ordersSumary: {
          totalOrders,
          overallAverageValue,
          statusBreakdown: orderSummary,
        },
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống lấy tóm tắt đơn hàng", {
        error: error.toString(),
      });
    }
  },
  // phan tich doanh thu theo danh muc san pham
  getRevenueByCategory: async (req, res) => {
    try {
      const { period } = req.params ;
      const { startDate, endDate } = getDateRange(period);
      /**
      lấy danh sách tất cả order trong khoảng thời gian startDate và endDate có status là  "success", gom thong tin: totalprice 
      lấy danh sách tất cả orderProduct trong khoảng thời gian startDate và endDate theo id của sanh sách order trên
      lấy danh sách tất cả product trong orderProduct trên
      lấy danh sách tất cả category trong product trên
      tính tổng tiễn mỗi category là tổng của totalPrice của các order của từng category trên
      sap xep theo thu tu tien giam dan
      trả ve data là:
      Danh mục sản phẩm: category name
      tong doanh thu: totalPrice
      */
      const pipeline = [
        {
          $match: {
            createdAt: { $gte: startDate, $lt: endDate },
            status: "Success",
          },
        },
        {
          $lookup: {
            from: "orderproducts",
            localField: "_id",
            foreignField: "orderId",
            as: "orderProducts",
          },
        },
        {
          $unwind: "$orderProducts",
        },
        {
          $lookup: {
            from: "products",
            localField: "orderProducts.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "categories",
            localField: "product.category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $group: {
            _id: "$category._id",
            name: { $first: "$category.name" },
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
        {
          $sort: { totalRevenue: -1 },
        },
      ];
      const result = await Order.aggregate(pipeline);
      sendResponse(res, 200, "Lấy báo cáo doanh thu theo danh mục thành công", {
        "thời gian báo cáo": period,
        revenueByCategory: result,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống lấy doanh thu theo danh mục", {
        error: error.toString(),
      });
    }
  },
  // phan tich hieu qua cua cac chuong trinh khuyen mai
  getPromotionEffectiveness: async (req, res) => {
    try {
      const { period } = req.params;
      const { startDate, endDate } = getDateRange(period);
      /**
      1.lấy danh sách tất cả promotion có thời gian khuyến mãi trong khoảng thời gian startDate và endDate
      2.lấy danh sách tất cả order trong khoảng thời gian startDate và endDate có status là  "success"
      3.lấy danh sách tất cả orderProduct trong khoảng thời gian startDate và endDate theo id của sanh sách order trên
      4.lấy danh sách tất cả product trong orderProduct trên
      5.lấy danh sách tất cả product trong promotion trên
      6. lấy danh sách product trong product trên có id nằm trong danh sách product của promotion trên
      7. trả về data là:
       danh sach chuong trinh khuyen mai
          chuong trình khuyen mai - duoc/ khong duoc su dung - so hang ban voi khuyen mai nay
          vd
          1. chuong trinh khuyen mai 1 - duoc su dung - 10 san pham
          2. chuong trinh khuyen mai 2 - khong duoc su dung - 0 san pham
       số sản phẩm được mua trong thời gian startDate và endDate
       so san pham ban co promotion
      */
      const promotions = await Promotion.find({
        endDate: { $gte: startDate },
        startDate: { $lt: endDate },
      });
      const orderIds = await Order.find({
        createdAt: { $gte: startDate, $lt: endDate },
        status: "Success",
      }).distinct("_id");
      const orderProducts = await OrderProduct.find({
        orderId: { $in: orderIds },
      });
      const productIds = orderProducts.map((orderProduct) => orderProduct.productId);
      const productPromotions = await Promotion.find({
        endDate: { $gte: startDate },
        startDate: { $lt: endDate },
        product: { $in: productIds },
      });
      //tong so khuyen mai
      const totalPromotions = promotions.length;
      // so promotion duoc su dung
      const totalPromotionsUsed = productPromotions.length;
      const listPromotions = promotions.map((promotion) => {
        const used = productPromotions.some(
          (productPromotion) => productPromotion._id.equals(promotion._id)
        );
        return {
          name: promotion.name,
          DuocSuDung: used, 
        };
      });
      // ket qua bao gom  totalPromotions totalPromotionsUsed listPromotions
      sendResponse(res, 200, "Lấy báo cáo hiệu quả chương trình khuyến mãi thành công", {
        "thời gian báo cáo": period,
        "Tong So Khuyen Mai " : totalPromotions,
        "So Khuyen mai duoc su dung" : totalPromotionsUsed,
        "So san pham da ban duoc co khuyen mai": totalPromotionsUsed, 
        "Chi tiet" :listPromotions,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống lấy hiệu quả chương trình khuyến mãi", {
        error: error.toString(),
      });
    }
  },
  // tong quan kinh doanh
  getBusinessOverview: async (req, res) => {
    try {
      const { period } = req.params;
      const { startDate, endDate } = getDateRange(period);
      const orders = await Order.find({
        createdAt: { $gte: startDate, $lt: endDate },
        status: "Success",
      });
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      );
      const totalCustomers = orders.reduce((customers, order) => {
        if (!customers.some((customer) => customer._id.equals(order.customerId))) {
          customers.push({ _id: order.customerId });
        }
        return customers;
      }, []).length;
      sendResponse(res, 200, "Lấy báo cáo tổng quan kinh doanh", {
        "thời gian báo cáo": period,
        totalOrders,
        totalRevenue,
        totalCustomers,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống lấy tổng quan kinh doanh", {
        error: error.toString(),
      });
    }
  },
};

module.exports = reportController;
