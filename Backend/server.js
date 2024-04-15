import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

// =============================MongoDB======================================================
    const mongoUri = process.env.MONGODB_URI;
      const twitterPostSchema = new mongoose.Schema({
              content: String,
            });
    const TwitterPost = mongoose.model('TwitterPost', twitterPostSchema);

    mongoose.connect(mongoUri)
        .then(() => console.log('Ansluten till MongoDB'))
        .catch(err => console.error('Kunde inte ansluta till MongoDB', err));



//==============================Routes===================================================== 
 app.get('/', (req, res) => {
 res.send('Hej Twitterrrrrr nu e vi på gång!');
 });



app.listen(PORT, () => {
console.log(`Servern körs på http://localhost:${PORT}`);
    });
