import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoute from "./routes/userRoute.js";
import tweetRoutes from './routes/tweetRoutes.js'; 

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 3000; 

// =============================MongoDB======================================================
    const mongoUri = process.env.MONGODB_URI;


    mongoose.connect(mongoUri)
        .then(() => console.log('Ansluten till MongoDB'))
        .catch(err => console.error('Kunde inte ansluta till MongoDB', err));



//==============================Routes===================================================== 
 app.get('/', (req, res) => {
 res.send('Hej Twitterrrrrr nu e vi på gång!');
 });


  
app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoutes); 

app.listen(PORT, () => {
console.log(`Servern körs på http://localhost:${PORT}`);
    });



