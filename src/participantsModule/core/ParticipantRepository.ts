import ParticipantRepositoryPort from "./_ParticipantRepositoryPort";
import Participant from "./domain/Participant";
import ParticipantModel from "./models/Participant";

const mapDocumentToParticipant = (
  document: Record<string, any>
): Participant => {
  if (
    !document._id ||
    !document.name ||
    !document.surname ||
    !document.city ||
    !document.qualifyingPoints ||
    !document.description ||
    !document.mentorPreferences
  ) {
    throw new Error(
      `created participant has missing fields, ${JSON.stringify(document)}`
    );
  }
  return {
    uuid: document._id,
    name: document.name,
    surname: document.surname,
    city: document.city,
    email: document.email,
    qualifyingPoints: document.qualifyingPoints,
    description: document.description,
    mentorPreferences: document.mentorPreferences,
    groupUuid: document.groupUuid
  };
};

export default class ParticipantRepository
  implements ParticipantRepositoryPort {
  constructor() {}

  async selectByUuid(uuid: string): Promise<Participant> {
    const result = await ParticipantModel.find({ uuid });
    return mapDocumentToParticipant(result);
  }

  async selectByGroup(groupUuid: string): Promise<Participant[]> {
    const result = await ParticipantModel.find({ groupUuid });
    return result.map(mapDocumentToParticipant);
  }

  async selectByCity(cityName: string): Promise<Participant[]> {
    const result = await ParticipantModel.find({ city: cityName });
    return result.map(mapDocumentToParticipant);
  }

  /**
   * Adds a single new participant.
   * @param participant - an object containing new participant's obligatory data
   * @returns - the data of Participant successfully saved into the database
   */
  async insertOne(participant: Participant): Promise<Participant> {
    return await ParticipantModel.findOne({
      email: participant.email
    }).then(async (existingParticipant) => {
      if (existingParticipant) {
        throw new Error(
          `Participant with email: ${participant.email} already exists`
        );
      } else {
        const newParticipant = new ParticipantModel({
          name: participant.name,
          surname: participant.surname,
          city: participant.city,
          email: participant.email,
          qualifyingPoints: participant.qualifyingPoints,
          description: participant.description,
          mentorPreferences: participant.mentorPreferences
        });
        const result = await newParticipant.save();
        return mapDocumentToParticipant(result);
      }
    });
  }

  /**
   * Adds new participants in bulk.
   * @param participants - an array of objects describing particular participants
   * @returns - number of added participants
   */
  async insertMany(participants: Participant[]): Promise<number> {
    let numOfCreatedParticipants = 0;
    for (const participant of participants) {
      await ParticipantModel.findOne({
        email: participant.email
      }).then(async (existingParticipant) => {
        if (existingParticipant) {
          throw new Error(
            `Participant with email: ${participant.email} already exists`
          );
        } else {
          const newParticipant = new ParticipantModel({
            name: participant.name,
            surname: participant.surname,
            city: participant.city,
            email: participant.email,
            qualifyingPoints: participant.qualifyingPoints,
            description: participant.description,
            mentorPreferences: participant.mentorPreferences
          });
          await newParticipant.save();
          numOfCreatedParticipants += 1;
        }
      });
    }
    return numOfCreatedParticipants;
  }

  /**
   * Sets participant's group to specified value
   * @param uuid - UUID specifying target participant
   * @param groupUuid - UUID specifying target group
   * @param force - flag deciding whether the group can be overwritten
   * @returns participant's data after the operation
   */
  async setGroup(
    uuid: string,
    groupUuid: string,
    force?: boolean
  ): Promise<Participant> {
    return await ParticipantModel.findOne({
      _id: uuid
    }).then(async (existingParticipant: any) => {
      if (!existingParticipant) {
        throw new Error(`Could not find participant with uuid: ${uuid}`);
      }
      if (
        !existingParticipant.groupUuid ||
        (existingParticipant.groupUuid && force)
      ) {
        existingParticipant.groupUuid = groupUuid;
      }
      const result = await existingParticipant.save();
      return mapDocumentToParticipant(result);
    });
  }

  /**
   * Removes participant's group association (if any)
   * @param uuid - UUID specifying target participant
   * @returns participant's data after the operation
   */
  async unsetGroup(uuid: string): Promise<Participant> {
    return await ParticipantModel.findOne({
      _id: uuid
    }).then(async (existingParticipant: any) => {
      if (!existingParticipant) {
        throw new Error(`Could not find participant with uuid: ${uuid}`);
      }
      existingParticipant.groupUuid = "";
      const result = await existingParticipant.save();
      return mapDocumentToParticipant(result);
    });
  }
}
