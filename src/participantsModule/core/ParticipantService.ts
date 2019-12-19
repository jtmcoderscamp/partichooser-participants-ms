import ParticipantServicePort from "./_ParticipantServicePort";
import ParticipantRepositoryPort from "./_ParticipantRepositoryPort";
import Participant from "./domain/Participant";

export default class ParticipantService implements ParticipantServicePort {
    private _participantRepository: ParticipantRepositoryPort;

    constructor(participantRepository: ParticipantRepositoryPort) {
        this._participantRepository = participantRepository;
    }

    async findParticipantByUuid(uuid: string): Promise<Participant> {
        throw new Error("Method not implemented.");
    }

    async findParticipantsByGroup(groupUuid: string): Promise<Participant[]> {
        throw new Error("Method not implemented.");
    }

    async findParticipantsByCity(cityName: string): Promise<Participant[]> {
        throw new Error("Method not implemented.");
    }

    /**
     * Adds a single new participant.
     * @param participant - an object containing new participant's obligatory data
     * @returns - the data of Participant successfully saved into the database
     */
    async addNewParticipant(participant: Participant): Promise<Participant> {
        throw new Error("Method not implemented.");
    }

    /**
     * Adds new participants in bulk. 
     * @param participants - an array of objects describing particular participants
     * @returns - number of added participants
     */
    async addNewParticipants(participants: Participant[]): Promise<number> {
        throw new Error("Method not implemented.");
    }
}