import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TestRestController from "./testModule/interface/TestRestController";
import MockTestRepository from "./testModule/infrastructure/MockTestRepository";
import TestService from "./testModule/core/TestService";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//initialization of the example testModule
const testRepositoryImplementation = new MockTestRepository();
const testServiceImplementation = new TestService(testRepositoryImplementation);
const testApi = new TestRestController(testServiceImplementation);

mongoose.Promise = global.Promise;

//wiring up the test routes
app.use("/tests", testApi.router);

dotenv.config();

if (!process.env.DB_URI) {
  throw new Error("DB is needed!!!");
}

mongoose
  .connect(
    process.env.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("db connected"))
  .catch((err: any) => console.error("ERR", err));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
