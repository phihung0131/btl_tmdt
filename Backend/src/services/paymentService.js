const axios = require("axios");
const crypto = require("crypto");
const CryptoJS = require("crypto-js"); // npm install crypto-js
const moment = require("moment"); // npm install moment
const qs = require("qs");

require("dotenv").config();

class PaymentAPI {
  static async createMomoPayment(orderId, amount) {
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const orderInfo = `Thanh toan don hang ${orderId} tai DomStore`;
    const partnerCode = "MOMO";
    const redirectUrl = process.env.HOSTNAME_FE + "/orders/" + orderId;
    const ipnUrl = process.env.HOSTNAME_BE + "/api/v1/payment/momo/callback";
    const requestType = "payWithMethod";
    const requestId = orderId;
    const extraData = "";
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";
    const orderExpireTime = "10";

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //signature
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      orderExpireTime,
      amount,
      orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });

    // options for axios
    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    // Send the request and handle the response
    let response;
    try {
      response = await axios(options);
      return response.data.payUrl;
    } catch (error) {
      console.error("Error creating MoMo payment:", error.toString());
    }
  }

  static async createZaloPayment(orderId, amount) {
    const config = {
      app_id: "2553",
      key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
      key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
      endpoint: "https://sb-openapi.zalopay.vn/v2/create",
    };
    const redirecturl = process.env.HOSTNAME_FE + "/orders/" + orderId;
    // const redirecturl = "https://www.youtube.com/watch?v=Bo5wSwq7ajg";
    const callback_url =
      process.env.HOSTNAME_BE + "/api/v1/payment/zalopay/callback";

    const embed_data = {
      //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
      redirecturl,
    };

    const items = [];
    const transID = orderId;

    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount,
      //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
      //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
      callback_url,
      description: `DOMSTORE - Payment for the order #${transID}`,
      bank_code: "",
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const result = await axios.post(config.endpoint, null, { params: order });

      return result.data.order_url;
    } catch (error) {
      console.error("Error creating ZaloPay payment:", error);
      throw new Error("Failed to create ZaloPay payment");
    }
  }

}

module.exports = PaymentAPI;
