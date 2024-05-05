import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tweets';

export const LikeButton = ({ tweetId, onLike }) => {
  const handleLike = async () => {
    try {
      const response = await axios.post(`${API_URL}/${tweetId}/like`);
      onLike(response.data.likes); // Uppdatera likes i den överordnade komponenten
    } catch (error) {
      console.error('Det gick inte att gilla tweeten', error);
    }
  };

  return <button onClick={handleLike}>Like</button>;
};
