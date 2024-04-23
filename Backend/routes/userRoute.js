import express from "express";
import User from "../models/userModel.js";
import { useRadioGroup } from "@mui/material";

const router = express.Router();

// Route för inloggning
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hitta användaren i databasen
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    // Kontrollera lösenordet (utan hash)
    if (user.password !== password) {
      return res.status(401).json({ message: "Fel lösenord" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel vid inloggningen" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, firstName, lastName, email } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "Användarnamnet eller e-postadressen är redan upptagen",
      });
    }

    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    await newUser.save();

    res.status(201).json({ message: "Användaren skapades framgångsrikt" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Något gick fel vid registreringen" });
  }
});

export default router;
