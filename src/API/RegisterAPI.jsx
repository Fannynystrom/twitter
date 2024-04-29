import axios from "axios";

const API_URL = "http://localhost:3000/api/users/register";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
