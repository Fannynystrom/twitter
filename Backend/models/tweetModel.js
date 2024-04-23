// models/tweetModel.js
import mongoose from "mongoose";

const twitterPostSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TwitterPost = mongoose.model("TwitterPost", twitterPostSchema);

export default TwitterPost;
