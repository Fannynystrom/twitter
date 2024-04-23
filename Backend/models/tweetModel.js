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
    hashtags: [{ type: String }],
    createdAt: {  
      type: Date,
      default: Date.now  
    }
  }, { timestamps: true });

twitterPostSchema.statics.extractHashtags = function(tweetText) {
    const hashtagsRegex = /#(\w+)/g;
    const hashtags = tweetText.match(hashtagsRegex);
    return hashtags ? hashtags.map(tag => tag.slice(1)) : [];
};

const TwitterPost = mongoose.model('TwitterPost', twitterPostSchema);

export default TwitterPost;
