import express, { Router, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import ServicePort from "../core/_ServicePort";

export default class RestController {
    private _testService: ServicePort;
    private _router: Router;

    constructor(testServiceImplementation: ServicePort) {
        this._testService = testServiceImplementation;
        this._router = express.Router();

        //use the built-in json middleware to parse json requests
        this.router.use('/', express.json());

        /**
         * A simple route that returns the body of a request (if it had any) with an added testResult field
         * Note the use of express-async-handler library for simple error handling syntax with async/await
         */
    

        this.router.get('/:participantId', asyncHandler(async (req, res, next) => {
            const myResponseBody = await this._testService.findTestResult(req.params.participantId);
            res.status(200).send(myResponseBody);
        }));

        this.router.delete('/:participantId', asyncHandler(async (req, res, next) => {
            const myResponseBody = await this._testService.findTestResult(req.params.participantId);
            res.status(200).send(myResponseBody);
        }))

        this.router.post('/', asyncHandler(async (req, res, next) => {
            const myResponseBody = {s:"dziala"};
            res.status(200).send(myResponseBody);
        }))

        this.router.put('/:participantId', asyncHandler(async (req, res, next) => {
            const myResponseBody = await this._testService.findTestResult(req.params.participantId);
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