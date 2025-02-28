const sendResponse = require('../helper/sendResponse');
const User = require('../models/User');
require("dotenv").config();

const adminController = {
    // cap quyen admin
    grantAdmin: async (req, res) => {
        try {
            const mail = req.body.mail;
            const user = await User.findOne({ email: mail });
            if (!user) {
                return sendResponse(res, 400, "Không tìm thấy user", null);
            }
            user.role = "ADMIN";
            await user.save();
            sendResponse(res, 200, "Cấp quyền admin thành công", user);
        } catch (error) {
            sendResponse(res, 400, "Lỗi cấp quyền admin", error.toString());
        }
    },
    // xoa quyen admin
    revokeAdmin: async (req, res) => {
        try {
            const mail = req.body.mail;
            const user = await User.findOne({ email: mail });
            if (!user) {
                return sendResponse(res, 400, "Không tìm thấy user", null);
            }
            user.role = "CUSTOMER";
            await user.save();
            sendResponse(res, 200, "Thu hồi quyền admin thành công", user);
        } catch (error) {
            sendResponse(res, 400, "Lỗi thu hồi quyền admin", error.toString());
        }
    }       
};
module.exports = adminController;


