// models/tweetModel.js
import mongoose from 'mongoose';

const twitterPostSchema = new mongoose.Schema({
  content: String,
  // lägg till fler fält här efter behov, t.ex. createdAt, createdBy etc.
}, { timestamps: true });

const TwitterPost = mongoose.model('TwitterPost', twitterPostSchema);

export default TwitterPost;
