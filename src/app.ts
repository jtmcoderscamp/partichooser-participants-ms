import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TestRestController from "./testModule/interface/TestRestController";
import MockTestRepository from "./testModule/infrastructure/MockTestRepository";
import TestService from "./testModule/core/TestService";
import RestController from "./interface/RestController";
import Service from "./core/Service";
import ParticipantsTestRepository from "./infrastructure/ParticipantsRepository"
import ParticipantResult from "core/domain/ParticipantResult";

const mongoose = require('mongoose');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//initialization of the example testModule
const partiTest = new ParticipantsTestRepository();

const paritcipantService = new Service(partiTest);

const participantsApi = new RestController(paritcipantService);


//wiring up the routes
app.use("/api", participantsApi.router);
//app.use("/groups", participantsApi.router);
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
