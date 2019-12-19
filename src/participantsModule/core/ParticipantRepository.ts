import ParticipantRepositoryPort from "./_ParticipantRepositoryPort";
import Participant from "./domain/Participant";
import ParticipantModel from "./models/Participant";

// Question to mentor => mongoose always return Document type how to handle that it returns
// participant

export default class ParticipantRepository
  implements ParticipantRepositoryPort {
  constructor() {}

  async selectByUuid(uuid: string): Promise<any> {
    return await ParticipantModel.find({ uuid });
  }

  async selectByGroup(groupUuid: string): Promise<any> {
    return await ParticipantModel.find({ groupUuid });
  }

  async selectByCity(cityName: string): Promise<any> {
    return await ParticipantModel.find({ city: cityName });
  }

  /**
   * Adds a single new participant.
   * @param participant - an object containing new participant's obligatory data
   * @returns - the data of Participant successfully saved into the database
   */
  async insertOne(participant: Participant): Promise<any> {
    return await ParticipantModel.findOne({
      email: participant.email
    }).then(async existingParticipant => {
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
        return await newParticipant.save();
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
      }).then(async existingParticipant => {
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
    throw new Error("Method not implemented.");
  }

  /**
   * Removes participant's group association (if any)
   * @param uuid - UUID specifying target participant
   * @returns participant's data after the operation
   */
  unsetGroup(uuid: string): Promise<Participant> {
    throw new Error("Method not implemented.");
  }
}
