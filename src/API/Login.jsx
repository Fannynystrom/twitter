import axios from 'axios';

const API_URL = 'http://localhost:3000/api/login';

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}users/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

console.log('Carro är bäst <3333')
console.log('Carro är sämst<33333')