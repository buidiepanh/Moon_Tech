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

export const getAllProducts = async () => {
  try {
    const res = await axios.get("/products");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
