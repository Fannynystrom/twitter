import express from "express";
import User from "../models/userModel.js";
import { useRadioGroup } from "@mui/material";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean();
    // Hantera fall där createdBy är null
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    // Hantera fall där createdBy är null
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/:id/follow
router.post("/:id/follow", async (req, res) => {
  const userId = req.body.userId; // Få användar-ID från request body istället
  const targetUserId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { following: targetUserId },
      },
      { new: true }
    ).populate("following", "username firstName"); // 'new: true' returnerar dokumentet efter uppdateringen

    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: userId },
    });

    res.status(200).json(updatedUser); // Skicka tillbaka den uppdaterade användaren
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).send("Error following user.");
  }
});

// POST /api/users/:id/unfollow
router.post("/:id/unfollow", async (req, res) => {
  const userId = req.body.userId; // Få användar-ID från request body istället
  const targetUserId = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { following: targetUserId },
      },
      { new: true }
    ).populate("following"); // 'new: true' returnerar dokumentet efter uppdateringen

    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: userId },
    });

    res.status(200).json(updatedUser); // Skicka tillbaka den uppdaterade användaren
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).send("Error unfollowing user.");
  }
});

// Route för inloggning
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hitta användaren i databasen
    const user = await User.findOne({
      username: username,
      password: password,
    })
      .select("username firstName following followers")
      .populate("following", "username firstName");
    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    // Kontrollera lösenordet (utan hash)
    if (user.password !== password) {
      // return res.status(401).json({ message: "Fel lösenord" });
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
