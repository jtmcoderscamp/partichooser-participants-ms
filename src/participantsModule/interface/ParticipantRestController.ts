import express, { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ParticipantServicePort from "../core/_ParticipantServicePort";

export default class ParticipantRestController {
    private _participantService: ParticipantServicePort;
    private _router: Router;

    constructor(testServiceImplementation: ParticipantServicePort) {
        this._participantService = testServiceImplementation;
        this._router = express.Router();

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        /**
         * A simplified route that finds a single participant specified by their UUID
         */
        this.router.get('/:userUuid', asyncHandler(async (req, res, next) => {
            const responseBody = await this._participantService.findParticipantByUuid(req.params.userUuid);
            res.status(200).send(responseBody);
        }));

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