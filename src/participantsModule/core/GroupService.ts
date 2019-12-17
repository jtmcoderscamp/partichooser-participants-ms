import GroupServicePort from "./_GroupServicePort";
import Group from "./domain/Group";
import GroupRepositoryPort from "./_GroupRepositoryPort";

export default class GroupService implements GroupServicePort {
    private _groupRepository : GroupRepositoryPort;

    constructor(groupRepositoryImplementation: GroupRepositoryPort){
        this._groupRepository = groupRepositoryImplementation;
    }

    async findMentoredGroup(mentorUuid: string) : Promise<Group> {
        const result = this._groupRepository.selectByMentorUuid(mentorUuid);
        return result;
    }    
    
    async declareNewGroup(mentorsUuids: string[]) : Promise<Group> {
        throw new Error("Method not implemented.");
    }

    async deleteGroup(groupUuid: string) : Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async moveMentor(mentorUuid: string, removeIfEmpty: boolean, newGroupUuid?: string | undefined) : Promise<Group> {
        throw new Error("Method not implemented.");
    }
}