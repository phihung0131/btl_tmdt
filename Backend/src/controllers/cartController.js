const { get } = require("mongoose");
const sendResponse = require("../helper/sendResponse");
const Cart = require("../models/Cart");
const CartProduct = require("../models/CartProduct");
const Product = require("../models/Product");
require("dotenv").config();
const getCartInfo = async (customerID) => {
  const cart = await Cart.findOne({ customer_id: customerID }).select("customer_id _id total ");
  
  if (!cart) {
    newCart = new Cart({
      customer_id: customerID,
    });
    // Tạo giỏ hàng mới
    await newCart.save();
    cart = newCart;
  }

  let cartProducts = await CartProduct.find({ cart_id: cart._id }).select(
    "product_id quantity color size _id"
  ).sort({ createdAt: -1 });

  // Get product details
  const productIds = cartProducts.map((cp) => cp.product_id);
  const products = await Product.findWithDeleted({ _id: { $in: productIds } }).select(
    "name price imageUrl _id promotionalPrice"
  );

  const productInfo = cartProducts.map((cp) => {
    const product = products.find(
      (p) => p._id.toString() === cp.product_id.toString()
    );
    return {
      cartProductId: cp._id,
      product_id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      promotionalPrice: product.promotionalPrice,
      quantity: cp.quantity,
      color: cp.color,
      size: cp.size,
    };
  });

  // Calculate total product
  const total = productInfo.reduce((acc, cur) => {
    const price = cur.promotionalPrice || cur.price;
    return acc + price * cur.quantity;
  }, 0);

  cart.total = total;
  await cart.save();

  return { cart: { ...cart._doc, productInfo } };
};

const cartsController = {
  getCarts: async (req, res) => {
    try {
      const customerID = req.user._id;
      const cartInfo = await getCartInfo(customerID);
      sendResponse(res, 200, "Lấy dữ liệu Cart thành công", cartInfo);
    } catch (error) {
      sendResponse(res, 500, "Lỗi lấy dữ liệu Cart", error.toString());
    }
  },
  // thay doi so luong san pham trong cart
  updateCart: async (req, res) => {
    const { cartProductId, quantity , color , size } = req.body;
    try {
      const customerID = req.user._id;

      // Tìm cart có customer_id là customerID
      let cart = await Cart.findOne({ customer_id: customerID });
      if (!cart) {
        newCart = new Cart({
          customer_id: customerID,
        });
        // Tạo giỏ hàng mới
        await newCart.save();
        cart = newCart;
      }

      const cartProduct = await CartProduct.findOne({_id: cartProductId });
      if (!cartProduct) {
        return sendResponse(res, 404, 'Product not found in cart');
      }
      // Update only the fields that are provided
      if (quantity !== undefined) {
        cartProduct.quantity = quantity;
      }
      if (color !== undefined) {
        cartProduct.color = color;
      }
      if (size !== undefined) {
        cartProduct.size = size;
      }
      cartProduct.quantity = quantity;
      await cartProduct.save();
      const cartInfo = await getCartInfo(customerID);
      sendResponse(res, 200, 'Cart updated successfully', cartInfo);
    } catch (error) {
      sendResponse(res, 500, 'Error updating cart', error.toString());
    }
  },
  //xoa san pham trong cart
  deleteCart: async (req, res) => {
    const { cartProductId } = req.body;
    try {
      const customerID = req.user._id;

      // Tìm cart có customer_id là customerID
      let cart = await Cart.findOne({ customer_id: customerID });
      if (!cart) {
        newCart = new Cart({
          customer_id: customerID,
        });
        // Tạo giỏ hàng mới
        await newCart.save();
        cart = newCart;
      }
      const cartProduct = await CartProduct.findOne({ _id: cartProductId });
      if (!cartProduct) {
        return sendResponse(res, 404, 'Product not found in cart', {cart});
      }
      await cartProduct.delete();
      
      const cartInfo = await getCartInfo(customerID);
      
      sendResponse(res, 200, 'Product removed from cart successfully',cartInfo);
    } catch (error) {
      sendResponse(res, 500, 'Error removing product from cart', error.toString());
    }
  },
  // them san pham vao cart
  addProductToCart: async (req, res) => {
    let { product_id, quantity, color, size } = req.body;
    try {
      const customerID = req.user._id;
      let cartInfo = await getCartInfo(customerID);
      // Tìm cart có customer_id là customerID
      let cart = await Cart.findOne({ customer_id: customerID });
      if (!cart) {
        let newCart = new Cart({
          customer_id: customerID,
        });
        // Tạo giỏ hàng mới
        await newCart.save();
        cart = newCart;
      }
      const product = await Product.findById(product_id);
      if (!product) {
        return sendResponse(res, 404, 'Product not found');
      }

      // Set default values if not provided
      quantity = quantity || 1;
      if (!color || !size) {
        const defaultInfo = product.infos[0];
        color = color || defaultInfo.color;
        size = size || defaultInfo.size;
      }
      // Validate color
      const colorExists = product.infos.some(info => info.color === color);
      if (!colorExists) {
        return sendResponse(res, 400, 'Not have this color',cartInfo);
      }
      // Validate size for the given color
      const sizeExists = product.infos.some(info => info.color === color && info.size === size);
      if (!sizeExists) {
        const availableSizes = product.infos
          .filter(info => info.color === color)
          .map(info => info.size);
        return sendResponse(res, 400, `Available sizes for color ${color}: ${availableSizes.join(', ')}`,cartInfo);
      }
      const productInfo = product.infos.find(info => info.color === color && info.size === size);
      if (quantity > productInfo.quantity) {
        return sendResponse(res, 400, 'Quantity exceeds available stock',cartInfo);
      }
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      let cartProduct = await CartProduct.findOne({
        cart_id: cart._id,
        product_id,
        color,
        size,
      });
      if (cartProduct) {
        // check tong quantity
        const totalQuantity = cartProduct.quantity + quantity;
        if (totalQuantity > productInfo.quantity) {
          return sendResponse(res, 400, 'Quantity exceeds available stock',cartInfo);
        }
        cartProduct.quantity += quantity;
      } else {
        // Nếu chưa có thì tạo mới
        cartProduct = new CartProduct({
          cart_id: cart._id,
          product_id,
          quantity,
          color,
          size,
        });
      }
      await cartProduct.save();
      cartInfo = await getCartInfo(customerID);
      sendResponse(res, 200, 'Product added to cart successfully', cartInfo);
    } catch (error) {
      sendResponse(res, 500, 'Error adding product to cart', error.toString());
    }
  },
};  

module.exports = cartsController;
