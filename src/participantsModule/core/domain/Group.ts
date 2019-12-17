export default class Group {
    uuid?: string;
    mentors: string[];

    constructor(uuid: string|undefined, mentors: string[]){
        this.uuid = uuid;
        this.mentors = [...mentors];
    }

    static fromObject(base: Group) : Group {
        return new Group(base.uuid, base.mentors);
    }
}