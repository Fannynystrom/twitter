import express from "express";
import TwitterPost from "../models/tweetModel.js";
import Hashtag from "../models/hashtagModel.js";

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
      hashtags: TwitterPost.extractHashtags(content),
    });
    await newTweet.save();
    await saveHashtags(newTweet.hashtags);
    await newTweet.populate("createdBy");

    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// test
const saveHashtags = async (hashtags) => {
  try {
    for (const tag of hashtags) {
      const existingHashtag = await Hashtag.findOne({ tag });
      if (existingHashtag) {
        existingHashtag.count++;
        await existingHashtag.save();
      } else {
        const newHashtag = new Hashtag({ tag, count: 1 });
        await newHashtag.save();
      }
    }
  } catch (error) {
    console.error("Error saving hashtag:", error);
  }
};

const getTopHashtags = async () => {
  try {
    const hashtags = await Hashtag.find({}).sort({ count: -1 }).limit(5); // Sortera efter count och ta de 5 mest använda hashtaggar
    return hashtags;
  } catch (error) {
    console.error("Error fetching top hashtags:", error);
    return [];
  }
};

router.get("/", async (req, res) => {
  try {
    const tweets = await TwitterPost.find({}).sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/hashtags", async (req, res) => {
  try {
    const topHashtags = await getTopHashtags();
    res.status(200).json(topHashtags);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
