import GroupRepositoryPort from "../core/_GroupRepositoryPort";
import Group from "../core/domain/Group";
import GroupDocumentModel from "./models/GroupDocumentModel";

export default class GroupRepository implements GroupRepositoryPort{
    async selectByMentorUuid(uuid: string): Promise<Group> {
        throw new Error("Method not implemented.");
    }

    async insertOne(group: Group): Promise<Group> {
        await GroupDocumentModel.init();

        const groupDocument = new GroupDocumentModel(group);
        const result = await groupDocument.save();
        return Group.fromObject(result);
    }

    async deleteByUuid(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async updateOne(group: Group): Promise<Group> {
        throw new Error("Method not implemented.");
    }
}