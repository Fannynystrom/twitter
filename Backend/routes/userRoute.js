
import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// Route för inloggning
router.post('/login', async (req, res) => {
  try {
    // Läs in användardata från request body
    const { username, password } = req.body;

    // Hitta användaren i databasen
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Användaren hittades inte' });
    }

    // Kontrollera lösenordet
    if (user.password !== password) {
      return res.status(401).json({ message: 'Fel lösenord' });
    }

    res.status(200).json({ message: 'Inloggning lyckades' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Något gick fel vid inloggningen' });
  }
});



// Route för registrering av användare
router.post('/register', async (req, res) => {
    try {
      // Läs in användardata från request body
      const { username, password } = req.body;
  
      // Kontrollera om användarnamnet redan finns
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Användarnamnet är redan upptaget' });
      }
      // Skapa en ny användare
      const newUser = new User({ username, password });

      // Spara användaren i databasen
      await newUser.save();
  
      res.status(201).json({ message: 'Användaren skapades framgångsrikt' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Något gick fel vid registreringen' });
    }
  });
  


export default router;

