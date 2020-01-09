import express, { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Participant from "../core/domain/Participant";
import ParticipantServicePort from "participantsModule/core/_ParticipantServicePort";

export default class RestController {
    private _router: Router;
    private _participantService: ParticipantServicePort;

    constructor(participantServiceImplementation: ParticipantServicePort) {
        this._participantService = participantServiceImplementation;
        this._router = express.Router();

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        
    
        //handling requests 

         //get participant by uuid
        this.router.get('/participants/:participantId', asyncHandler(async (req, res) => {
            const myResponseBody = await this._participantService.findParticipantByUuid(req.params.participantId);
            res.status(200).send(myResponseBody);
        }));

        //get all participants
        this.router.get('/participants', asyncHandler(async (req, res) => {
            const myResponseBody = await this._participantService.findAllParticipants();
            res.status(200).send(myResponseBody);
        }))
       

        //add participant to database
        this.router.post('/participants', asyncHandler(async (req, res) => {
            let x  = new Participant(req.body.uuid, req.body.name, req.body.surname, req.body.city, req.body.email, req.body.  qualifyingPoints, req.body.description, req.body.mentorPreferences, req.body.groupUuid);
            const myResponseBody = await this._participantService.addNewParticipant(x);
            res.status(200).send(myResponseBody);
        }))

        //update participant's group
        this.router.patch('/participants/:participantId', asyncHandler(async (req, res) => {
            const groupUuid = req.body.groupUuid;
            let myResponseBody: Participant;
            if(typeof groupUuid === "string"){
                myResponseBody = await this._participantService.addParticipantToGroup(req.params.participantId, req.body.groupUuid);
            }
            else if (groupUuid === null) {
                myResponseBody = await this._participantService.unsetParticipantFromGroup(req.params.participantId);
            }
            else throw new TypeError("Invalid request received.");
            res.status(200).send(myResponseBody);
        }))

        //get group by id
        this.router.get('/groups/:groupId/participants', asyncHandler(async (req, res) => {
            const myResponseBody = await this._participantService.findParticipantsByGroup(req.params.groupId);
            res.status(200).send(myResponseBody);
        }))

        //get participants from city by city name
        this.router.get('/cities/:cityName/participants', asyncHandler(async (req, res) => {
            const myResponseBody = await this._participantService.findParticipantsByCity(req.params.cityName);
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