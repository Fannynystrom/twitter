import express from 'express';
import TwitterPost from '../models/tweetModel.js'; 

const router = express.Router();



router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const newTweet = new TwitterPost({ content });
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  

  router.get('/', async (req, res) => {
    try {
      const tweets = await TwitterPost.find({}).sort({ createdAt: -1 });  
      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  




export default router;
