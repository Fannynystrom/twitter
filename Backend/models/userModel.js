import mongoose from 'mongoose';

const { Schema } = mongoose;


const UserSchema = new Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
  }

 
});

const User = mongoose.model("User", UserSchema);

export default User;