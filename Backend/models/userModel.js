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
<<<<<<< HEAD
  about: { type: String }, 
  occupation: { type: String }, 
  hometown: { type: String }, 
  website: { type: String },
  registrationDate: { type: Date, default: Date.now } 
=======
  about: String,
  work: String,
  hometown: String,
  website: String,
  registrationDate: { type: Date, default: Date.now },
>>>>>>> a2fe2cfe4e08565ae157deeede8060f8fbcd712a
});

const User = mongoose.model("User", UserSchema);

export default User;
