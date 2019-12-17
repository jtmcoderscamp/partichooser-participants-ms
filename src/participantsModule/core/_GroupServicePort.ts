import Group from "./domain/Group";

export default interface GroupServicePort {
    findMentoredGroup(mentorUuid: string) : Promise<Group>;
    declareNewGroup(mentorsUuids: string[]) : Promise<Group>;
    deleteGroup(groupUuid: string) : Promise<boolean>;
    moveMentor(mentorUuid: string, removeIfEmpty: boolean, newGroupUuid?: string) : Promise<Group>;
}