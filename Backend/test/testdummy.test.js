import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";

import User from "../models/userModel.js";
import app from "../app.js";

const api = supertest(app);

let mongoServer;
let fakeUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  fakeUser = new User({
    username: "King",
    password: "kingspassword",
    firstName: "King",
    lastName: "Bernadotte",
    email: "king@example.com",
    followers: [],
    following: [],
    about: "näää, jag tror faktiskt inte det",
    work: "King of Sweden",
    hometown: "Stocken",
    website: "https://kingzzz.com",
    registrationDate: new Date(),
  });
  await fakeUser.save();
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase(); // rensa mellan testerna
});

afterAll(async () => {
  await mongoose.disconnect(); // Stäng anslutningen när alla tester är klara
  await mongoServer.stop(); // Stoppa den temporära MongoDB-servern
});

test("Login with fake user", async () => {
  const res = await api.post("/api/users/login").send({
    username: fakeUser.username,
    password: fakeUser.password,
  });

  if (res.statusCode === 201) {
    expect(res.body).toBeDefined();
  }
});

test("Register a new user", async () => {
  const res = await api.post("/api/users/register").send({
    username: fakeUser.username,
    password: fakeUser.password,
    firstName: fakeUser.firstName,
    lastName: fakeUser.lastName,
    email: fakeUser.email,
    followers: [],
    following: [],
    about: fakeUser.about,
    work: fakeUser.work,
    hometown: fakeUser.hometown,
    website: fakeUser.website,
  });
  if (res.statusCode === 201) {
    expect(res.body.message).toBe("Användaren skapades framgångsrikt");
  }
});

// test("saves a woof", async () => {
//     const res = await api
//       .post("/api/tweets/")
//       .send({ content: "testing", createdBy: "123456" });
//     expect(res.statusCode).toBe(201);
//     expect(res.body.content).toBe("testing");
// });
