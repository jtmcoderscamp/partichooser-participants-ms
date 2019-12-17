import Group from "./domain/Group";

export default interface GroupRepositoryPort {
    selectByMentorUuid(uuid: string) : Promise<Group>;

    insertOne(group: Group) : Promise<Group>;

    deleteByUuid(uuid: string) : Promise<boolean>;

    updateOne(group: Group) : Promise<Group>;
}