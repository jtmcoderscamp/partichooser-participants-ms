import express from "express";
import dotenv from "dotenv";
import RestController from "./interface/RestController";
import Service from "./core/Service";
import ParticipantsRepository from "./infrastructure/ParticipantsRepository"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//initialization of the example testModule
const partiTest = new ParticipantsRepository();
const myService = new Service(partiTest);
const myApi = new RestController(myService);

//wiring up the routes
app.use("/participants", myApi.router);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});