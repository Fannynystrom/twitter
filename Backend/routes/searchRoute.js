import express from "express";
import User from "../models/userModel.js";
import TwitterPost from "../models/tweetModel.js";
import tweetRouter from "./tweetRoutes.js";

const router = express.Router();

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

    const tweets = await TwitterPost.find({
      $or: [
        { hashtags: searchTerm },
        // Sök efter hashtags som innehåller söktermen
        { hashtags: { $regex: searchTerm, $options: "i" } },
      ],
    });

    res.json({ users, tweets });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
