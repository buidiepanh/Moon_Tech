import axios from "../util/axios.customize";

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
