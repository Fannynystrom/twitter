import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
