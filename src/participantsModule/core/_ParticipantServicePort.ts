import Participant from "./domain/Participant";

export default interface ParticipantServicePort{
    findAllParticipants(): Promise<Participant[]>;

    findParticipantByUuid(uuid: string): Promise<Participant>;
    findParticipantsByGroup(groupUuid: string): Promise<Participant[]>;
    findParticipantsByCity(cityName: string): Promise<Participant[]>;

    /**
     * Adds a single new participant.
     * @param participant - an object containing new participant's obligatory data
     * @returns - the data of Participant successfully saved into the database
     */
    addNewParticipant(participant: Participant): Promise<Participant>;

    /**
     * Adds new participants in bulk. 
     * @param participants - an array of objects describing particular participants
     * @returns - number of added participants
     */
    addNewParticipants(participants: Participant[]): Promise<number>;

    addParticipantToGroup( uuid: string, groupUuid: string, force?: boolean ): Promise<Participant>;
}