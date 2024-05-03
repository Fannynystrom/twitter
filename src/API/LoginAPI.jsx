import axios from "axios";

const API_URL = "http://localhost:3000/api/users/login";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response;
  } catch (error) {
    throw error;
  }
};
