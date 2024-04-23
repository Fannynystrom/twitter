// models/tweetModel.js
import mongoose from 'mongoose';

const twitterPostSchema = new mongoose.Schema({
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  hashtags: [{ type: String }],
  createdAt: {  
    type: Date,
    default: Date.now  
  }}, { timestamps: true });

  twitterPostSchema.statics.extractHashtags = function(tweetText) {
    const hashtagsRegex = /#(\w+)/g;
    const hashtags = tweetText.match(hashtagsRegex);
    return hashtags ? hashtags.map(tag => tag.slice(1)) : [];
  };

const TwitterPost = mongoose.model('TwitterPost', twitterPostSchema);

export default TwitterPost;
