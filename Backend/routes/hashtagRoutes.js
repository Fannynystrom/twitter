import express from 'express';
import Hashtag from '../models/hashtagModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hashtags = await Hashtag.find({}).sort({ count: -1 }); // Sortera hashtags efter antal poster
    res.status(200).json(hashtags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { tag } = req.body;
    const existingHashtag = await Hashtag.findOne({ tag });
    if (existingHashtag) {
      existingHashtag.count++;
      await existingHashtag.save();
    } else {
      const newHashtag = new Hashtag({ tag, count: 1 });
      await newHashtag.save();
    }
    res.status(201).json({ message: 'Hashtag saved successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
