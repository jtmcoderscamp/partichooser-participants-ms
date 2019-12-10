export default class Participant {
    uuid?: string;
    name: string;
    surname: string;
    city: string;
    email: string;
    qualifyingPoints: number;
    description: string[];
    mentorPreferences: string;

    constructor(
        uuid: string | undefined,
        name: string,
        surname: string,
        city: string,
        email: string,
        qualifyingPoints: number,
        description: string[],
        mentorPreferences: string
    ) {
        this.uuid = uuid;
        this.name = name;
        this.surname = surname;
        this.city = city;
        this.email = email;
        this.qualifyingPoints = qualifyingPoints;
        this.description = [...description];
        this.mentorPreferences = mentorPreferences;
    }

    static clone(base: Participant): Participant {
        return new Participant(
            base.uuid,
            base.name,
            base.surname,
            base.city,
            base.email,
            base.qualifyingPoints,
            base.description,
            base.mentorPreferences
        );
    }
}