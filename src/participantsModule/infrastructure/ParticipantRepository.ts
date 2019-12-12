import ParticipantRepositoryPort from "../core/_ParticipantRepositoryPort";
import Participant from "../core/domain/Participant";

export default class ParticipantRepository implements ParticipantRepositoryPort {

    constructor() {
    }

    selectByUuid(uuid: string): Participant {
        throw new Error("Method not implemented.");
    }
    selectByGroup(groupUuid: string): Participant[] {
        throw new Error("Method not implemented.");
    }
    selectByCity(cityName: string): Participant[] {
        throw new Error("Method not implemented.");
    }

    insertOne(participant: Participant): Participant {
        throw new Error("Method not implemented.");
    }
    insertMany(participants: Participant[]): number {
        throw new Error("Method not implemented.");
    }

    /**
     * Sets participant's group to specified value
     * @param uuid - UUID specifying target participant
     * @param groupUuid - UUID specifying target group
     * @param force - flag deciding whether the group can be overwritten
     * @returns participant's data after the operation
     */
    setGroup(uuid: string, groupUuid: string, force?: boolean | undefined): Participant {
        throw new Error("Method not implemented.");
    }

    /**
     * Removes participant's group association (if any)
     * @param uuid - UUID specifying target participant
     * @returns participant's data after the operation
     */
    unsetGroup(uuid: string): Participant {
        throw new Error("Method not implemented.");
    }
}