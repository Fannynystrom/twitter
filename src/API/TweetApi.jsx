

import axios from 'axios';
// TweetApi.js
const API_BASE_URL = "http://localhost:3000/api/tweets";

export const getTweets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);  // Använder korrekt URL
    return response.data;
  } catch (error) {
    console.error('Kunde inte hämta tweets:', error);
    throw error;
  }
};

export const createTweet = async (content) => {
  try {
    const response = await axios.post(API_BASE_URL, { content });  // Använder korrekt URL
    return response.data;
  } catch (error) {
    console.error('Kunde inte skapa tweet:', error);
    throw error;
  }
};
