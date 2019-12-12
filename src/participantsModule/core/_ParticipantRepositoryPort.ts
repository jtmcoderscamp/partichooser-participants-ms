import Participant from "./domain/Participant";

export default interface ParticipantRepositoryPort{
    selectByUuid(uuid: string): Participant;
    selectByGroup(groupUuid: string): Participant[];
    selectByCity(cityName: string): Participant[];

    insertOne(participant: Participant): Participant;
    insertMany(participants: Participant[]): number;

    /**
     * Sets participant's group to specified value
     * @param uuid - UUID specifying target participant
     * @param groupUuid - UUID specifying target group
     * @param force - flag deciding whether the group can be overwritten
     * @returns participant's data after the operation
     */
    setGroup(uuid: string, groupUuid: string, force?: boolean): Participant;

    /**
     * Removes participant's group association (if any)
     * @param uuid - UUID specifying target participant
     * @returns participant's data after the operation
     */
    unsetGroup(uuid: string): Participant;
}