import express from "express";
import TwitterPost from "../models/tweetModel.js";

const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const { content } = req.body;
//     const newTweet = new TwitterPost({ content });
//     await newTweet.save();
//     res.status(201).json(newTweet);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const tweets = await TwitterPost.find({})
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .lean();
    // Hantera fall där createdBy är null

    const modifiedTweets = tweets.map((tweet) => ({
      ...tweet,
      createdBy: tweet.createdBy ? tweet.createdBy : " okänd användare",
    }));

    res.status(200).json(modifiedTweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { content, createdBy } = req.body;
    // if (!createdBy) {
    //   return res
    //     .status(400)
    //     .json({ message: "createdBy (userId) is required." });
    // }

    const newTweet = new TwitterPost({
      content,
      createdBy, // createdBy fylls med det userId som skickas från klienten
    });
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/likes/:id", async (req, res) => {
  try {
    const tweet = await TwitterPost.findById(req.params.id);
    tweet.likes += 1; // ökar likeeees
    await tweet.save();
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await TwitterPost.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send("Tweet not found");
    }
    res.status(200).send("Tweet deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
