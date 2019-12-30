import express, { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ServicePort from "../core/_ServicePort";
import dbHandler from "../core/dbHandler";
import Participant from "../core/domain/Participant";
import ParticipantsTestRepository from "infrastructure/ParticipantsRepository";

export default class RestController {
    private _testService: ServicePort;
    private _router: Router;
    private _dbHandler: dbHandler;

    constructor(testServiceImplementation: ServicePort) {
        this._testService = testServiceImplementation;
        this._router = express.Router();
        this._dbHandler = new dbHandler("mongodb://localhost/partichooser");

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        
    
        //handling requests 

         //get participant by uuid
        this.router.get('/participants/:participantId', asyncHandler(async (req, res) => {
            const myResponseBody = await this._dbHandler.findParticipant(req.params.participantId);
            res.status(200).send(myResponseBody);
        }));

        //get all participants
        this.router.get('/participants', asyncHandler(async (req, res) => {
            const myResponseBody = await this._dbHandler.getAllParticipants();
            res.status(200).send(myResponseBody);
        }))
       

        //add participant to database
        this.router.post('/participants', asyncHandler(async (req, res) => {
            let x  = new Participant(req.body.uuid, req.body.name, req.body.surename, req.body.city, req.body.email, req.body.  qualifyingPoints, req.body.description, req.body.mentorPreferences, req.body.groupUuid);
            const myResponseBody = await this._dbHandler.addParticipant(x);
            res.status(200).send(myResponseBody);
        }))

        //update participant's group
        this.router.put('/participants/:participantId', asyncHandler(async (req, res) => {
            const myResponseBody = await this._dbHandler.udpateGroup(req.params.participantId, req.body.group);
            res.status(200).send(myResponseBody);
        }))

        //get group by id
        this.router.get('/groups/:groupId', asyncHandler(async (req, res) => {
            const myResponseBody = await this._dbHandler.findGroup(req.params.groupId);
            res.status(200).send(myResponseBody);
        }))

        //get participants from city by city name
        this.router.get('/cities/:cityName', asyncHandler(async (req, res) => {
            const myResponseBody = await this._dbHandler.findCity(req.params.cityName);
            res.status(200).send(myResponseBody);
        }))

        /**
         * Simple error-handling that always just sends the error message with code 500
         */
        this.router.use('/', (error: Error, req: Request, res: Response, next: NextFunction) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                next();
            }
        });
    }

    get router() {
        return this._router;
    }
}