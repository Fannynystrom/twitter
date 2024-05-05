import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";

dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 3000;

// =============================MongoDB======================================================
// const mongoUri = process.env.MONGODB_URI;

// console.log("MONGODB_URI:", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
