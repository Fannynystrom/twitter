import axios from "axios";

const API_URL = "http://localhost:3000/api/tweets";

export const getTweets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Kunde inte hämta tweets:", error);
    throw error;
  }
};

// export const getOnlyFollowingsTweets = async () => {
//   try {
//     console.log(API_URL, "url");
//     const response = await axios.get(API_URL);
//     console.log("det funkar");
//     return response.data;
//   } catch (error) {
//     console.error("Kunde inte hämta tweets:", error);
//     throw error;
//   }
// };

export const createTweet = async (content, username) => {
  try {
    const response = await axios.post(API_URL, {
      content,
      createdBy: username,
    });
    return response.data;
  } catch (error) {
    console.error("Kunde inte skapa tweet:", error);
    throw error;
  }
};

export const likeTweet = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/likes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error liking tweet:", error);
    throw error;
  }
};

export const deleteTweet = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tweet:", error);
    throw error;
  }
};
