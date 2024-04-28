import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import tweetRoutes from "./routes/tweetRoutes.js";
import hashtagRoutes from "./routes/hashtagRoutes.js";
import searchRoute from "./routes/searchRoute.js";

const app = express();
app.use(express.json());
// app.use(cors());

// Set up CORS
const corsOptions = {
  origin: "http://localhost:5173", // Your client's host address
  credentials: true, // This allows session cookies to be sent back and forth
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use CORS options here

dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 3000; 

// =============================MongoDB======================================================
const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Ansluten till MongoDB"))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB", err));

//==============================Routes=====================================================
app.get("/", (req, res) => {
  res.send("Hej Twitterrrrrr nu e vi på gång!");
});

app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoutes);
app.use("/api/hashtags", hashtagRoutes);
app.use("/api/search", searchRoute);
app.use(tweetRoutes);  

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
