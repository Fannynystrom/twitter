import express from "express";
import User from "../models/userModel.js";
import TwitterPost from "../models/tweetModel.js";
import tweetRouter from "./tweetRoutes.js";

const router = express.Router();

router.use("/api/tweets", tweetRouter);

router.post("/", async (req, res) => {
  const { searchTerm } = req.body;

  try {
    // Sök efter användare baserat på användarnamn, förnamn, efternamn och e-post
    const users = await User.find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    });

    // Sök efter tweets baserat på innehåll och hashtags
    const tweets = await TwitterPost.find({
      $or: [
        { content: { $regex: searchTerm, $options: "i" } }, // Sökning på tweet-innehåll
        { hashtags: searchTerm }, // Sökning på hashtags
      ],
    });

    res.json({ users, tweets });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
