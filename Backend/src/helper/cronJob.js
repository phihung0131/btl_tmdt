const cron = require("node-cron");
const productController = require("../controllers/productController");

// Định nghĩa cron job để chạy mỗi giờ
const startCronJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Đang cập nhật giá khuyến mãi...");
    await productController.updatePromotionalPrices();
    console.log("Cập nhật giá khuyến mãi hoàn tất.");
  });
};

// Export hàm để sử dụng ở nơi khác
module.exports = { startCronJob };
