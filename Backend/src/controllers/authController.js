const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendResponse = require("../helper/sendResponse");
const User = require("../models/User");
const transporter = require("../services/sendEmail");
require("dotenv").config();
const generateToken = (user) => {
  return jwt.sign({ ...user._doc }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const authController = {
  register: async (req, res) => {
    try {
      const { name, address, username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        address,
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      const token = generateToken(user);

      const redirectUrl = `/auth-redirect?token=${token}`;
      res.redirect(redirectUrl);
    } catch (error) {
      sendResponse(res, 500, `Lỗi đăng kí người dùng mới`, {
        error: error.toString(),
        stack: error.stack,
      });
    }
  },

  loginSuccess: (req, res) => {
    const token = generateToken(req.user);
    const redirectUrl = `/auth-redirect?token=${token}`;
    // console.log("oke");
    res.redirect(redirectUrl);
  },

  getUserInfos: (req, res) => {
    sendResponse(res, 200, "Đăng nhập lấy thông tin User thành công", {
      user: req.user,
    });
  },

  forgotPassword: async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(res, 404, "Không tìm thấy người dùng");
    }
    const newPassword = Math.random().toString(36).substring(2, 15);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ username }, { password: hashedPassword });

    const mailOptions = {
      from: "phihung0131@gmail.com",
      to: user.email,
      subject: "Lấy lại mật khẩu - Đóm Store",
      html: `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lấy lại mật khẩu - Đóm Store</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; text-align: center; padding: 10px; }
            .content { background-color: #f4f4f4; padding: 20px; border-radius: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Đóm Store</h1>
            </div>
            <div class="content">
              <h2>Xin chào ${user.name},</h2>
              <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại Đóm Store.</p>
              <p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>
              <p>Vui lòng đăng nhập và thay đổi mật khẩu này ngay sau khi bạn truy cập vào tài khoản.</p>
              <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
              <p>Trân trọng,<br>Đội ngũ Đóm Store</p>
            </div>
            <div class="footer">
              <p>© 2023 Đóm Store. Tất cả các quyền được bảo lưu.</p>
              <p>Địa chỉ: 123 Đường ABC, Quận XYZ, Thành phố HCM</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    sendResponse(res, 200, "Lấy lại mật khẩu thành công", {
      user: req.user,
    });
  },
};

module.exports = authController;
