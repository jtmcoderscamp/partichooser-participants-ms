import Participant from "./domain/Participant";

export default interface ParticipantRepositoryPort{
    selectByUuid(uuid: string): Promise<Participant>;
    selectByGroup(groupUuid: string): Promise<Participant[]>;
    selectByCity(cityName: string): Promise<Participant[]>;

    insertOne(participant: Participant): Promise<Participant>;
    insertMany(participants: Participant[]): Promise<number>;

    /**
     * Sets participant's group to specified value
     * @param uuid - UUID specifying target participant
     * @param groupUuid - UUID specifying target group
     * @param force - flag deciding whether the group can be overwritten
     * @returns participant's data after the operation
     */
    setGroup(uuid: string, groupUuid: string, force?: boolean): Promise<Participant>;

    /**
     * Removes participant's group association (if any)
     * @param uuid - UUID specifying target participant
     * @returns participant's data after the operation
     */
    unsetGroup(uuid: string): Promise<Participant>;
}