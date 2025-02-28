import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Ticket, Wallet } from "lucide-react";
import Header from "../components/customer/common/Header";
import Footer from "../components/customer/common/Footer";
import apiService from "../services/api";

const Cart = () => {
  const navigate = useNavigate();

  const [carts, setCarts] = useState({});
  const [temp, setTemp] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [codeVoucher, setCodeVoucher] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Tiệm Giày Đóm | Giỏ Hàng";
    apiService
      .getCarts()
      .then((res) => {
        // console.log(res.data.data.cart);
        setCarts(res.data.data.cart);
        setTemp(1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [temp]);

  const handleUpdate = (id, quantity, color) => {
    apiService
      .putCarts(id, quantity, color)
      .then((res) => {
        // alert(res.data.message);
        setTemp(temp + 1);
      })
      .catch((err) => {
        alert(err.response.data.data);
        // console.log(err);
      });
  };

  const handleRemove = (id) => {
    apiService
      .deleteCarts(id)
      .then((res) => {
        alert(res.data.message);
        setTemp(temp + 1);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCheckout = () => {
    const products = carts.productInfo.map((product) => {
      return {
        id: product.product_id,
        quantity: product.quantity,
        color: product.color,
        size: product.size,
      };
    });

    apiService
      .postOrder(products, codeVoucher, paymentMethod, name, phone, address)
      .then((res) => {
        if (res?.data?.data?.order?.payment?.paymentUrl) {
          window.location.href = res?.data?.data?.order?.payment?.paymentUrl;
        } else {
          console.log(res.data.data.order);
          alert(res.data.message);

          navigate(`/orders/${res.data.data.order.orderID}`);
        }

        setTemp(temp + 1);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="static mt-[72px]">
      <div className="mx-auto my-20 max-w-5xl bg-white py-10 max-md:max-w-xl">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Giỏ hàng của bạn
        </h1>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {carts?.productInfo?.map((product) => (
              <>
                <div className="grid grid-cols-3 items-start gap-4">
                  <div className="col-span-2 flex items-start gap-4">
                    <div className="h-28 w-28 shrink-0 rounded-md bg-gray-100 p-2 max-sm:h-24 max-sm:w-24">
                      <img
                        src={product.imageUrl[0]}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-gray-500">
                        {product.color} - {product.size}
                      </p>

                      <button
                        onClick={() => handleRemove(product.cartProductId)}
                        type="button"
                        className="mt-6 flex shrink-0 items-center gap-1 text-xs font-semibold text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline w-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        XÓA
                      </button>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <h4 className="text-lg font-bold text-gray-800 max-sm:text-base">
                      {formatPrice(
                        product.promotionalPrice
                          ? product.promotionalPrice
                          : product.price,
                      )}{" "}
                      đ
                    </h4>

                    <button
                      type="button"
                      className="mt-6 flex items-center rounded-md border border-gray-300 bg-transparent px-3 py-1.5 text-xs text-gray-800 outline-none"
                    >
                      <svg
                        onClick={() =>
                          handleUpdate(
                            product.cartProductId,
                            product.quantity - 1,
                            product.color,
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>

                      <span className="mx-3 font-bold">{product.quantity}</span>
                      <svg
                        onClick={() =>
                          handleUpdate(
                            product.cartProductId,
                            product.quantity + 1,
                            product.color,
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <hr className="border-gray-300" />
              </>
            ))}

            {carts?.productInfo?.length === 0 && (
              <div className="mt-16 flex flex-col items-center">
                <img
                  src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg"
                  alt="Empty Cart"
                  className="h-40 w-40"
                />
                <h2 className="mt-6 text-lg font-bold text-gray-800">
                  Giỏ hàng của bạn đang trống
                </h2>
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="mt-6 rounded-md bg-[#FF3D00] px-4 py-2.5 font-semibold text-white"
                >
                  Tiếp tục mua hàng
                </button>
              </div>
            )}
          </div>

          <div className="h-max rounded-md bg-gray-100 p-4">
            <h3 className="border-b border-gray-300 pb-2 text-lg font-bold text-gray-800 max-sm:text-base">
              Đơn hàng của bạn
            </h3>

            <form className="mt-6">
              <div>
                <div className="space-y-3">
                  {/* Name Input */}
                  <div className="relative flex items-center">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full rounded-md border-b bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-800"
                    />
                    <User className="absolute right-4 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Phone Input */}
                  <div className="relative flex items-center">
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="w-full rounded-md border-b bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-800"
                    />
                    <Phone className="absolute right-4 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Address Input */}
                  <div className="relative flex items-center">
                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      name="address"
                      placeholder="Delivery Address"
                      className="w-full rounded-md border-b bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-800"
                    />
                    <MapPin className="absolute right-4 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Voucher Code Input */}
                  <div className="relative flex items-center">
                    <input
                      onChange={(e) => setCodeVoucher(e.target.value)}
                      type="text"
                      name="codeVoucher"
                      placeholder="Voucher Code"
                      className="w-full rounded-md border-b bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-800"
                    />
                    <Ticket className="absolute right-4 h-4 w-4 text-gray-400" />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-800">
                        Payment Method
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex cursor-pointer items-center space-x-2 rounded-md border p-2 hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          defaultChecked
                          className="text-gray-800"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="text-sm">COD</span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-2 rounded-md border p-2 hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="MOMO"
                          className="text-gray-800"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="text-sm">Momo</span>
                      </label>
                      <label className="flex cursor-pointer items-center space-x-2 rounded-md border p-2 hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ZALO"
                          className="text-gray-800"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="text-sm">ZaloPay</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <ul className="mt-6 space-y-3 text-gray-800">
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Tổng{" "}
                <span className="ml-auto">{formatPrice(carts.total)} đ</span>
              </li>
            </ul>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => handleCheckout()}
                type="button"
                className="w-full rounded-md bg-[#FF3D00] px-4 py-2.5 text-sm font-semibold tracking-wide text-white hover:bg-[#ffc2b0]"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="fixed left-0 top-0 w-full">
        <Header />
      </div>
    </div>
  );
};

export default Cart;
