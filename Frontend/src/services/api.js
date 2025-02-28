import axiosInstance from "../axios/axios";

export const apiService = {
  // Products
  getProduct: (page = 1, limit = 10) =>
    axiosInstance.get(`/products?page=${page}&limit=${limit}`),
  getSearchProducts: (
    page = 1,
    limit = 10,
    search = "",
    category = "",
    priceRange = "",
    sortBy = "",
    sortOrder = "",
    minRating = 0,
  ) => {
    // Tạo query string thủ công
    const queryString = `page=${page}&limit=${limit}&search=${search}&category=${category}&priceRange=${priceRange}&sortBy=${sortBy}&sortOrder=${sortOrder}&minRating=${minRating}`;

    // Gửi request với query string tự tạo
    return axiosInstance.get(`/products/search?${queryString}`);
  },
  getPromotionProducts: () => axiosInstance.get("/products/promotional"),
  getAProduct: (id) => axiosInstance.get(`/products/${id}`),

  // Auth
  login: (username, password) =>
    axiosInstance.post("/login", {
      username,
      password,
    }),
  register: (username, password, name, address, email) =>
    axiosInstance.post("/register", {
      username,
      password,
      name,
      address,
      email,
    }),
  forgetPassword: (username) =>
    axiosInstance.post("/forgot-password", { username }),

  // Users
  getProfile: (token) => axiosInstance.get("/users/profile", { token }),
  putProfile: (name, address) =>
    axiosInstance.put("/users/profile", { name, address }),
  changePassword: (currentPassword, newPassword) =>
    axiosInstance.put("/users/change-password", {
      currentPassword,
      newPassword,
    }),
  getUsers: (role) => axiosInstance.get(`/users/${role}`),
  postGrantAdmin: (mail) => axiosInstance.post("/owner/grant-admin", { mail }),
  postRevokeAdmin: (mail) =>
    axiosInstance.post("/owner/revoke-admin", { mail }),

  // Support
  getSupportTickers: () => axiosInstance.get("/customer/support-tickets"),
  postSupportTicket: (subject, description) =>
    axiosInstance.post("/customer/support-tickets", { subject, description }),
  putSupportTicket: (id, subject, description) =>
    axiosInstance.put(`/customer/support-tickets/${id}`, {
      subject,
      description,
    }),
  deleteSupportTicket: (id) =>
    axiosInstance.delete(`/customer/support-tickets/${id}`),

  // Reviews
  postReview: (product, comment, rating) =>
    axiosInstance.post(`/review`, { product, comment, rating }),
  putReview: (reviewId, product, comment, rating) =>
    axiosInstance.put(`/review/${reviewId}`, { product, comment, rating }),
  deleteReview: (reviewId) => axiosInstance.delete(`/review/${reviewId}`),

  // Carts
  postCarts: (product_id, quantity, color, size) =>
    axiosInstance.post("/carts", { product_id, quantity, color, size }),
  getCarts: () => axiosInstance.get("/carts"),
  putCarts: (cartProductId, quantity, color) =>
    axiosInstance.put("/carts", { cartProductId, quantity, color }),
  deleteCarts: (cartProductId) =>
    axiosInstance.delete("/carts", { data: { cartProductId } }),

  // Orders
  postOrder: (products, codeVoucher, paymentMethod, name, phone, address) =>
    axiosInstance.post("/orders", {
      products,
      codeVoucher,
      paymentMethod,
      name,
      phone,
      address,
    }),
  getOrders: () => axiosInstance.get("/orders"),
  getOrder: (id) => axiosInstance.get(`/orders/${id}`),

  // Admin
  // Orders
  getAdminOrders: (
    page = 1,
    limit = 10,
    status = "",
    search = "",
    startDate = "",
    endDate = "",
    minTotal = 0,
    maxTotal = 0,
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status }),
      ...(search && { search }),
      ...(startDate && { startDate: new Date(startDate).toISOString() }),
      ...(endDate && { endDate: new Date(endDate).toISOString() }),
      ...(minTotal > 0 && { minTotal: minTotal.toString() }),
      ...(maxTotal > 0 && { maxTotal: maxTotal.toString() }),
    });

    return axiosInstance.get(`/admin/orders?${params.toString()}`);
  },
  getAdminAOrder: (id) => axiosInstance.get(`/admin/orders/${id}`),
  putAdminOrder: (id, status) =>
    axiosInstance.put(`/admin/orders/${id}`, { status }),

  // Products
  putProduct: (id, name, description, price, infos) =>
    axiosInstance.put(`/products/${id}`, {
      name,
      description,
      price,
      infos,
    }),
  deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
  postProduct: (formData) =>
    axiosInstance.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Promotions
  postPromotion: (
    product,
    name,
    description,
    discountPercent,
    startDate,
    endDate,
  ) =>
    axiosInstance.post("/promotion", {
      product,
      name,
      description,
      discountPercent,
      startDate,
      endDate,
    }),
  getPromotionsForProduct: (productId) =>
    axiosInstance.get(`/promotion/product/${productId}`),
  deletePromotion: (id) => axiosInstance.delete(`/promotion/${id}`),
  putPromotion: (
    id,
    product,
    name,
    description,
    discountPercent,
    startDate,
    endDate,
  ) =>
    axiosInstance.put(`/promotion/${id}`, {
      product,
      name,
      description,
      discountPercent,
      startDate,
      endDate,
    }),
  getPromotions: () => axiosInstance.get("/promotion"),

  // Support Admin
  getAdminSupportTickets: () => axiosInstance.get("/admin/support-tickets"),
  putAdminSupportTicket: (id, respond) =>
    axiosInstance.put(`/admin/support-tickets/${id}`, { respond }),

  // Vouchers
  getVouchers: () => axiosInstance.get("/vouchers"),
  getVoucherStats: (id) => axiosInstance.get(`/vouchers/${id}/stats`),
  putVoucher: (id, discountPercent, expirationDate, quantity) =>
    axiosInstance.put(`/vouchers/${id}`, {
      discountPercent,
      expirationDate,
      quantity,
    }),
  postVoucher: (code, discountPercent, expirationDate, quantity) =>
    axiosInstance.post("/vouchers", {
      code,
      discountPercent,
      expirationDate,
      quantity,
    }),
  postDeactivateExpired: () =>
    axiosInstance.post("/vouchers/deactivate-expired"),
  deleteVoucher: (id) => axiosInstance.delete(`/vouchers/${id}`),

  // Reports
  getReportOrdersSummary: () => axiosInstance.get("/reports/orders/summary"),
  getReportRevenue: (period) => axiosInstance.get("/reports/revenue/" + period),
  getReportOverview: (period) =>
    axiosInstance.get("/reports/business-overview/" + period),
  getReportPromotion: (period) =>
    axiosInstance.get("/reports/promotion-effectiveness/" + period),
  getReportCategory: (period) =>
    axiosInstance.get("/reports/revenue-by-category/" + period),
};

export default apiService;
