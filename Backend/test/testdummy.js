import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../../src/App";
const api = supertest(app);

let mongoServer;
let fakeUser;

beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });
  
  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });