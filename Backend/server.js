import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";

dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 3000;

// =============================MongoDB======================================================
const mongoUri = process.env.MONGODB_URI;
//const mongoUri = "mongodb+srv://carroadmin:GhjcrJ6oN5nOj5Ge@cluster0.ob6sik0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

console.log("MONGODB_URI:", process.env.MONGODB_URI);


mongoose
  .connect(mongoUri)
  .then(() => console.log("Ansluten till MongoDB"))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB", err));

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
