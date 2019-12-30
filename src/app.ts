import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RestController from "./participantsModule/interface/RestController";
import ParticipantRepository from "./participantsModule/infrastructure/ParticipantRepository";
import ParticipantService from "./participantsModule/core/ParticipantService";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

//initialization of the example testModule
const participantRepo = new ParticipantRepository();
const participantService = new ParticipantService(participantRepo);
const participantsApi = new RestController(participantService);


//wiring up the routes
app.use("/api", participantsApi.router);
//app.use("/groups", participantsApi.router);
mongoose.Promise = global.Promise;


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
