import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
  tag: String,
  count: {
    type: Number,
    default: 0,
  },
});

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

export default Hashtag;
