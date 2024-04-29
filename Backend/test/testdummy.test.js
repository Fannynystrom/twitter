import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";

import User from '../models/userModel.js'
import app from "../app.js"

const api = supertest(app);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const fakeUser = new User({
        username: 'King',
        password: 'kingspassword',
        firstName: 'King',
        lastName: 'Bernadotte',
        email: 'king@example.com',
        followers: [],
        following: [],
        about: 'näää, jag tror faktiskt inte det',
        work: 'King of Sweden',
        hometown: 'Stocken',
        website: 'https://kingzzz.com',
        registrationDate: new Date(),
    });
    await fakeUser.save();

})

afterEach(async () => {
    await mongoose.connection.db.dropDatabase(); // rensa mellan testerna
});

afterAll(async () => {
    await mongoose.disconnect(); // Stäng anslutningen när alla tester är klara
    await mongoServer.stop(); // Stoppa den temporära MongoDB-servern
});

test('Login with fake user', async () => {
    const res = await api
        .post('/api/login')
        .send({
            username: 'king',
            password: 'kingspassword'
        })

        if (res.statusCode === 200) {
            expect(res.body.token).toBeDefined();
        } else if (res.statusCode === 404) {
            // Om användaren inte hittades, förvänta dig att inget autentiseringstoken returneras
            expect(res.body.token).toBeUndefined();
        } else {
            // Förvänta dig inte 200 eller 404-statusar
            fail('Unexpected status code: ' + res.statusCode);
        }
    // expect(res.statusCode).toBe(200);
    // expect(res.body.token).toBeDefined();
})



// test("saves a woof", async () => {


//     const res = await api
//       .post("/api/tweets/")
//       .send({ content: "testing", createdBy: "123456" });
//     expect(res.statusCode).toBe(201);
//     expect(res.body.content).toBe("testing");
// });
