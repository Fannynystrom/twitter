import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.send('Hej Twitterrrrrr!');
  });
  
  app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
  });
