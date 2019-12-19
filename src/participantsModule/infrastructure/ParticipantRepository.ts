import ParticipantRepositoryPort from "../core/_ParticipantRepositoryPort";
import Participant from "../core/domain/Participant";

export default class ParticipantRepository implements ParticipantRepositoryPort {

    constructor() {
    }

    async selectByUuid(uuid: string): Promise<Participant> {
        throw new Error("Method not implemented.");
    }
    async selectByGroup(groupUuid: string): Promise<Participant[]> {
        throw new Error("Method not implemented.");
    }
    async selectByCity(cityName: string): Promise<Participant[]> {
        throw new Error("Method not implemented.");
    }

    async insertOne(participant: Participant): Promise<Participant> {
        throw new Error("Method not implemented.");
    }
    async insertMany(participants: Participant[]): Promise<number> {
        throw new Error("Method not implemented.");
    }

    /**
     * Sets participant's group to specified value
     * @param uuid - UUID specifying target participant
     * @param groupUuid - UUID specifying target group
     * @param force - flag deciding whether the group can be overwritten
     * @returns participant's data after the operation
     */
    async setGroup(uuid: string, groupUuid: string, force?: boolean | undefined): Promise<Participant> {
        throw new Error("Method not implemented.");
    }

    /**
     * Removes participant's group association (if any)
     * @param uuid - UUID specifying target participant
     * @returns participant's data after the operation
     */
    async unsetGroup(uuid: string): Promise<Participant> {
        throw new Error("Method not implemented.");
    }
}