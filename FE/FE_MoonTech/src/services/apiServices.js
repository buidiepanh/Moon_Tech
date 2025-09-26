import axios from "../util/axios.customize";

//========================USER API============================
export const loginFunction = async (payload) => {
  try {
    const res = await axios.post("/authen/login", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerFunction = async (payload) => {
  try {
    const res = await axios.post("/authen/register", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const res = await axios.get("/users/authenticatedUser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserAddresses = async () => {
  try {
    const res = await axios.get("/shippingAddress");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewAddress = async (payload) => {
  try {
    const res = await axios.post("/shippingAddress", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDefaultAddress = async (id, payload) => {
  try {
    const res = await axios.put(`/shippingAddress/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddress = async (id) => {
  try {
    const res = await axios.delete(`/shippingAddress/${id}`);
    return res.data;
  } catch (error) {
    console.groupEnd(error);
  }
};

export const updateUserInfo = async (id, payload) => {
  try {
    const res = await axios.put(`/users/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get("/products");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const isPaidProduct = async (id) => {
  try {
    const res = await axios.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductComments = async (id) => {
  try {
    const res = await axios.get("/comments", { params: { product: id } });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewComment = async (payload) => {
  try {
    const res = await axios.post("/comments", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (id, payload) => {
  try {
    const res = await axios.put(`/comments/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (id) => {
  try {
    const res = await axios.delete(`/comments/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserCart = async () => {
  try {
    const res = await axios.get("/carts");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (payload) => {
  try {
    const res = await axios.post("/carts", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateItemQuantity = async (itemId, payload) => {
  try {
    const res = await axios.put(`/carts/${itemId}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (itemId) => {
  try {
    const res = await axios.delete(`/carts/${itemId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewOrder = async (payload) => {
  try {
    const res = await axios.post("/orders", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (id, payload) => {
  try {
    console.log("Test", id);
    const res = await axios.put(`/orders/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserOrders = async () => {
  try {
    const res = await axios.get("/orders");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get("/categories");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrands = async () => {
  try {
    const res = await axios.get("/brands");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const paymentFunction = async (payload) => {
  try {
    const res = await axios.post("/orders/create-payment", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const paymentCallBack = async (url) => {
  try {
    const res = await axios.get(`/orders/vnpay-return${url}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//=========================ADMIN API==============================

export const addNewProduct = async (payload) => {
  try {
    const res = await axios.post("/products", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const res = await axios.put(`/products/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/users");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
