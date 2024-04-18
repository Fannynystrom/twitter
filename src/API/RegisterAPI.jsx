import axios from 'axios';

const API_URL = 'http://localhost:3000/register';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};