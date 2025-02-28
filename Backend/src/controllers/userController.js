const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendResponse = require("../helper/sendResponse");

const userController = {
  // Xem thông tin cá nhân
  getPersonalInfo: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).select(
        "-password -socialAccounts -updatedAt -__v -deleted"
      );

      if (!user) {
        return sendResponse(res, 404, "Không tìm thấy người dùng");
      }

      sendResponse(res, 200, "Lấy thông tin cá nhân thành công", { user });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi lấy thông tin cá nhân", {
        error: error.toString(),
      });
    }
  },

  // Cập nhật thông tin cá nhân
  updatePersonalInfo: async (req, res) => {
    try {
      const userId = req.user._id;
      const { name, address } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, address },
        { new: true, runValidators: true }
      ).select("-password -socialAccounts -updatedAt -__v -deleted");

      if (!updatedUser) {
        return sendResponse(res, 404, "Không tìm thấy người dùng");
      }

      sendResponse(res, 200, "Cập nhật thông tin cá nhân thành công", {
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi cập nhật thông tin cá nhân", {
        error: error.toString(),
      });
    }
  },

  // Đổi mật khẩu
  changePassword: async (req, res) => {
    try {
      const userId = req.user._id;
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return sendResponse(res, 404, "Không tìm thấy người dùng");
      }

      // Verify current password
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return sendResponse(res, 400, "Mật khẩu hiện tại không đúng");
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update password
      user.password = hashedPassword;
      await user.save();

      sendResponse(res, 200, "Thay đổi mật khẩu thành công");
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi thay đổi mật khẩu", {
        error: error.toString(),
      });
    }
  },

  // Lấy danh sách ADMIN
  getUserList: async (req, res) => {
    const { role } = req.params;
    try {
      const users = await User.find({ role }).select(
        "-password -__v -updatedAt -deleted -socialAccounts"
      );
      sendResponse(res, 200, `Lấy danh sách ${role} thành công`, {
        users,
      });
    } catch (error) {
      console.error(error);
      sendResponse(res, 500, "Lỗi hệ thống khi lấy danh sách người dùng", {
        error: error.toString(),
      });
    }
  },
};

module.exports = userController;
