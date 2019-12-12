import Participant from "./domain/Participant";

export default interface ParticipantServicePort{
    findParticipantByUuid(uuid: string): Participant;
    findParticipantsByGroup(groupUuid: string): Participant[];
    findParticipantsByCity(cityName: string): Participant[];

    /**
     * Adds a single new participant.
     * @param participant - an object containing new participant's obligatory data
     * @returns - the data of Participant successfully saved into the database
     */
    addNewParticipant(participant: Participant): Participant;

    /**
     * Adds new participants in bulk. 
     * @param participants - an array of objects describing particular participants
     * @returns - number of added participants
     */
    addNewParticipants(participants: Participant[]): number;
}