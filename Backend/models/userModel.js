import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }
});

const User = mongoose.model("users", UserSchema);

export default User;
