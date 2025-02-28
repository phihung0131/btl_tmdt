const jwt = require('jsonwebtoken');
const sendResponse = require("../helper/sendResponse");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return sendResponse(res, 401, "Không có token, quyền truy cập bị từ chối");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      sendResponse(res, 401, "Token không hợp lệ");
    }
  },

  isCustomer: (req, res, next) => {
    // console.log(req.user);

    if (req.user && req.user.role == "CUSTOMER") {
      return next();
    }
    sendResponse(res, 403, "Không có quyền truy cập, yêu cầu quyền CUSTOMER");
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
      return next();
    }
    sendResponse(res, 403, "Không có quyền truy cập, yêu cầu quyền ADMIN");
  },

  isOwner: (req, res, next) => {
    if (req.user && req.user.role === "OWNER") {
      return next();
    }
    sendResponse(res, 403, "Không có quyền truy cập, yêu cầu quyền OWNER");
  },

  isAdminOrOwner: (req, res, next) => {
    if (req.user && (req.user.role === "ADMIN" || req.user.role === "OWNER")) {
      return next();
    }
    sendResponse(res, 403, "Không có quyền truy cập, yêu cầu quyền ADMIN hoặc OWNER");
  },
};

module.exports = authMiddleware;