const CryptoJS = require("crypto-js");
const sendResponse = require("../helper/sendResponse");
const Order = require("../models/Order");
const CartProduct = require("../models/CartProduct");
const Cart = require("../models/Cart");
const OrderProduct = require("../models/OrderProduct");
const OrderVoucher = require("../models/OrderVoucher");
const Voucher = require("../models/Voucher");
const Payment = require("../models/Payment");
const Product = require("../models/Product");
const CustomerVoucher = require("../models/CustomerVoucher");
const PaymentAPI = require("../services/paymentService");

const orderController = {
  create: async (req, res) => {
    try {
      const { products, codeVoucher, paymentMethod, name, phone, address } =
        req.body;

      // Validate products and check availability
      for (const item of products) {
        const product = await Product.findById(item.id);

        if (!product) {
          return sendResponse(
            res,
            404,
            `Sản phẩm ID ${item.id} không được tìm thấy`
          );
        }

        const matchingInfo = product.infos.find(
          (info) =>
            info.color.toLowerCase() == item.color.toLowerCase() &&
            info.size === item.size
        );

        if (!matchingInfo) {
          return sendResponse(
            res,
            400,
            `Sản phẩm ID ${item.id} không có màu hoặc kích cỡ này`
          );
        }

        if (matchingInfo.quantity < item.quantity) {
          return sendResponse(
            res,
            400,
            `Sản phẩm ID ${item.id} màu và size này không có đủ số lượng`
          );
        }
      }

      // Tạo đơn hàng mới
      const order = new Order({
        customerId: req.user._id,
        status: "Failure",
        name,
        phone,
        address,
      });

      // Tính tổng giá trị đơn hàng
      let totalPrice = 0;

      for (const product of products) {
        // Tìm sản phẩm trong bảng Product
        const dbProduct = await Product.findById(product.id);

        // Kiểm tra nếu có promotionalPrice thì dùng, không thì dùng price
        const price =
          dbProduct.promotionalPrice !== null
            ? dbProduct.promotionalPrice
            : dbProduct.price;

        // Tính giá trị đơn hàng cho sản phẩm hiện tại
        const productTotal = price * product.quantity;

        // Cộng vào tổng giá trị đơn hàng
        totalPrice += productTotal;

        // Lưu thông tin sản phẩm vào OrderProduct
        const orderProduct = new OrderProduct({
          orderId: order._id,
          productId: product.id,
          quantity: product.quantity,
          color: product.color,
          size: product.size,
        });

        const matchingInfoIndex = dbProduct.infos.findIndex(
          (info) =>
            info.color.toLowerCase() == product.color.toLowerCase() &&
            info.size === product.size
        );

        if (matchingInfoIndex !== -1) {
          // Cập nhật mảng với giá trị mới
          let newQuantity =
            +dbProduct.infos[matchingInfoIndex].quantity - product.quantity;
          dbProduct.infos[matchingInfoIndex].quantity = newQuantity;

          // Lưu cập nhật vào database
          await dbProduct.save();
        }

        await orderProduct.save();
      }

      // Áp voucher
      if (codeVoucher) {
        const voucher = await Voucher.findOne({ code: codeVoucher });
        if (!voucher) {
          return sendResponse(res, 404, "Không tìm thấy voucher");
        }
        if (voucher.quantity <= 0) {
          return sendResponse(res, 400, "Số lượng voucher đã hết");
        }
        if (new Date() > voucher.expirationDate) {
          return sendResponse(res, 400, "Voucher đã hết hạn");
        }

        const usedVoucher = await CustomerVoucher.findOne({
          voucherId: voucher._id,
        });
        if (usedVoucher) {
          return sendResponse(
            res,
            400,
            "Người dùng đã sử dụng voucher này trước đây"
          );
        }

        const orderVoucher = new OrderVoucher({
          orderId: order._id,
          voucherId: voucher._id,
        });
        await orderVoucher.save();
        totalPrice *= 1 - voucher.discountPercent / 100;
        voucher.quantity--;
        await voucher.save();
      }

      order.totalPrice = totalPrice;
      await order.save();

      // Tạo thanh toán
      const payment = new Payment({
        orderId: order._id,
        method: paymentMethod,
        status: "failure",
      });
      await payment.save();

      // Initialize payment based on the chosen method
      let paymentUrl = "";
      switch (paymentMethod) {
        case "MOMO":
          paymentUrl = await PaymentAPI.createMomoPayment(
            order._id,
            totalPrice
          );
          break;
        case "ZALO":
          paymentUrl = await PaymentAPI.createZaloPayment(
            order._id,
            totalPrice
          );
          break;
        case "COD":
          payment.status = "success";
          await payment.save();
          order.status = "Order successful";
          await order.save();
          break;
      }

      const orderData = {
        createdAt: order.createdAt,
        orderID: order._id,
        customerID: order.customerId,
        totalPrice: order.totalPrice,
        status: order.status,
        name: order.name,
        phone: order.phone,
        address: order.address,
        payment: {
          paymentID: payment._id,
          method: payment.method,
          status: payment.status,
          paymentUrl,
        },
      };

      const cart = await Cart.findOne({ customer_id: req.user._id });
      await CartProduct.deleteMany({ cart_id: cart._id });

      sendResponse(res, 200, "Tạo đơn hàng thành công", {
        order: orderData,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống tạo đơn hàng", {
        error: error.toString(),
      });
    }
  },

  handleMomoPaymentCallback: async (req, res) => {
    try {
      // console.log(req.body);
      const { orderId, resultCode } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return sendResponse(res, 404, "Không tìm thấy đơn hàng");
      }

      const payment = await Payment.findOne({ orderId });

      if (resultCode == 0) {
        order.status = "Order successful";
        payment.status = "success";
      } else {
        order.status = "Failure";
        payment.status = "failure";
      }
      await order.save();
      await payment.save();

      // console.log("ORDER: \n", order._doc);
      // console.log("PAYMENT: \n", payment._doc);

      res.send("Thenkiu");
      // sendResponse(res, 200, "Cập nhật trạng thái đơn hàng thành công", {
      //   order: order._doc,
      //   payment: payment._doc,
      // });
    } catch (error) {
      console.error(error);
      sendResponse(
        res,
        500,
        "Lỗi API callback thanh toán MOMO",
        error.toString()
      );
    }
  },

  handleZaloPaymentCallback: async (req, res) => {
    try {
      let result = {};
      // console.log(req.body);
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(
        dataStr,
        "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz"
      ).toString();
      // console.log("mac =", mac);

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng ở đây
        let dataJson = JSON.parse(dataStr, "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz");
        const orderId = dataJson["app_trans_id"].split("_")[1];

        // console.log(orderId);
        const order = await Order.findById(orderId);
        if (!order) {
          return sendResponse(res, 404, "Không tìm thấy đơn hàng");
        }

        const payment = await Payment.findOne({ orderId });

        order.status = "Order successful";
        payment.status = "success";

        await order.save();
        await payment.save();

        // console.log("ORDER: \n", order._doc);
        // console.log("PAYMENT: \n", payment._doc);

        result.return_code = 1;
        result.return_message = "success";
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      sendResponse(
        res,
        500,
        "Lỗi API callback thanh toán MOMO",
        error.toString()
      );
    }
  },

  getAllOrdersForCustomer: async (req, res) => {
    try {
      const customerId = req.user._id;
      const orders = await Order.find({ customerId })
        .sort({ createdAt: -1 })
        .select("_id status totalPrice name phone address ");

      const ordersWithDetails = await Promise.all(
        orders.map(async (order) => {
          // const orderProducts = await OrderProduct.find({
          //   orderId: order._id,
          // }).populate("productId", "_id name price imageUrl promotionalPrice");

          // orderProducts.forEach((orderProduct) => {
          //   orderProduct.productId.imageUrl =
          //     orderProduct.productId.imageUrl[0];
          // });

          // const orderVoucher = await OrderVoucher.findOne({
          //   orderId: order._id,
          // }).populate("voucherId");

          const totalProduct = await OrderProduct.countDocuments({
            orderId: order._id,
          });
          return {
            ...order._doc,
            totalProduct,
            // products: orderProducts,
            // voucher: orderVoucher,
          };
        })
      );

      sendResponse(res, 200, "Lấy danh sách đơn hàng thành công", {
        orders: ordersWithDetails,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi lấy danh sách đơn hàng", {
        error: error.toString(),
      });
    }
  },

  getAOrderForCustomer: async (req, res) => {
    try {
      const orderId = req.params.id;
      const customerId = req.user._id;

      const order = await Order.findOne({ _id: orderId, customerId }).select(
        "-deleted -updatedAt -__v"
      );

      if (!order) {
        return sendResponse(res, 404, "Không tìm thấy đơn hàng");
      }

      const orderProducts = await OrderProduct.find({ orderId })
        .populate({
          path: "productId",
          select: "_id name price imageUrl promotionalPrice",
          options: { withDeleted: true },
        })
        .select("-orderId -createdAt -updatedAt -__v")
        .lean();

      orderProducts.forEach((orderProduct) => {
        orderProduct.productId.imageUrl =
          orderProduct.productId.imageUrl[0] || "";
      });

      const orderVoucher = await OrderVoucher.findOne({ orderId })
        .populate({
          path: "voucherId",
          select: "_id code discountPercent",
          options: { withDeleted: true },
        })
        .select("_id ");

      const orderDetails = {
        ...order._doc,
        products: orderProducts,
        voucher: orderVoucher,
      };

      sendResponse(res, 200, "Lấy thông tin đơn hàng thành công", {
        order: orderDetails,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi lấy thông tin đơn hàng", {
        error: error.toString(),
      });
    }
  },

  getAllOrdersForAdmin: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        search,
        startDate,
        endDate,
        minTotal,
        maxTotal,
      } = req.query;
      const sortOrder = req.query.sortOrder === "desc" ? 1 : -1;
      const skip = (page - 1) * limit;

      // Build the query object
      let query = {};

      // Status filter
      if (status) {
        query.status = status;
      }

      // Date range filter
      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
      }

      // Total price range filter
      if (minTotal || maxTotal) {
        query.totalPrice = {};
        if (minTotal) query.totalPrice.$gte = parseFloat(minTotal);
        if (maxTotal) query.totalPrice.$lte = parseFloat(maxTotal);
      }

      // Search functionality
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ];
      }

      const orders = await Order.find(query)
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate({ path: "customerId", select: "name _id" })
        .select("-updatedAt -__v -deleted ");

      const totalOrders = await Order.countDocuments(query);
      const currentPage = parseInt(page);
      const totalPages = Math.ceil(totalOrders / limit);

      sendResponse(res, 200, "Lấy danh sách đơn hàng thành công", {
        totalOrders,
        currentPage,
        totalPages,
        orders: orders,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi lấy danh sách đơn hàng", {
        error: error.toString(),
      });
    }
  },

  getAOrderForAdmin: async (req, res) => {
    try {
      const orderId = req.params.id;

      const order = await Order.findOne({ _id: orderId }).select(
        "-deleted -updatedAt -__v"
      );

      if (!order) {
        return sendResponse(res, 404, "Không tìm thấy đơn hàng");
      }

      const orderProducts = await OrderProduct.find({ orderId })
        .populate({
          path: "productId",
          select: "_id name price promotionalPrice",
          options: { withDeleted: true },
        })
        .select("-deleted -updatedAt -__v -createdAt -orderId");

      const orderVoucher = await OrderVoucher.findOne({ orderId })
        .populate({
          path: "voucherId",
          select: "-deleted -updatedAt -createdAt -__v",
          options: { withDeleted: true },
        })
        .select("-deleted -updatedAt -__v -createdAt -orderId");

      const payment = await Payment.findOne({ orderId }).select(
        "_id method status"
      );

      const orderDetails = {
        ...order._doc,
        products: orderProducts,
        voucher: orderVoucher,
        payment,
      };

      sendResponse(res, 200, "Lấy thông tin đơn hàng thành công", {
        order: orderDetails,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi lấy thông tin đơn hàng", {
        error: error.toString(),
      });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      if (!status) {
        return sendResponse(res, 400, "Trạng thái đơn hàng là bắt buộc");
      }

      const order = await Order.findById(orderId);

      if (!order) {
        return sendResponse(res, 404, "Không tìm thấy đơn hàng");
      }

      const validStatuses = [
        "Success",
        "Failure",
        "Delivering",
        "Order successful",
        "Preparing goods",
        "Waiting for payment",
      ];

      if (!validStatuses.includes(status)) {
        return sendResponse(res, 400, "Trạng thái đơn hàng không hợp lệ");
      }

      order.status = status;
      await order.save();

      const orderData = {
        _id: order._id,
        customerId: order.customerId,
        status: order.status,
        totalPrice: order.totalPrice,
        name: order.name,
        phone: order.phone,
        address: order.address,
        createdAt: order.createdAt,
      };
      sendResponse(res, 200, "Cập nhật trạng thái đơn hàng thành công", {
        order: orderData,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi cập nhật trạng thái đơn hàng", {
        error: error.toString(),
      });
    }
  },
};

module.exports = orderController;
