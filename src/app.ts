import express from "express";
import dotenv from "dotenv";
import RestController from "./interface/RestController";
import Service from "./core/Service";
import ParticipantsTestRepository from "./infrastructure/ParticipantsRepository"
import ParticipantResult from "core/domain/ParticipantResult";

const mongoose = require('mongoose');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;



//initialization of the example testModule
const partiTest = new ParticipantsTestRepository();

const paritcipantService = new Service(partiTest);

const participantsApi = new RestController(paritcipantService);


//wiring up the routes
app.use("/api", participantsApi.router);
//app.use("/groups", participantsApi.router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
