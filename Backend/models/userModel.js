import mongoose from "mongoose";

const { Schema, Types: { ObjectId } } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  followers: [{ type: ObjectId, ref: "User" }], // Lista av användar-IDs som följer denna användare
  following: [{ type: ObjectId, ref: "User" }], // Lista av användar-IDs som denna användare följer
  about: { type: String }, 
  occupation: { type: String }, 
  hometown: { type: String }, 
  website: { type: String },
  registrationDate: { type: Date, default: Date.now } 
});

const User = mongoose.model("User", UserSchema);

export default User;
