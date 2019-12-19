import ParticipantServicePort from "./_ParticipantServicePort";
import ParticipantRepositoryPort from "./_ParticipantRepositoryPort";
import Participant from "./domain/Participant";

export default class ParticipantService implements ParticipantServicePort {
  private _participantRepository: ParticipantRepositoryPort;

  constructor(participantRepository: ParticipantRepositoryPort) {
    this._participantRepository = participantRepository;
  }

  async findParticipantByUuid(uuid: string): Promise<any> {
    return await this._participantRepository.selectByUuid(uuid);
  }

  async findParticipantsByGroup(groupUuid: string): Promise<any> {
    return await this._participantRepository.selectByGroup(groupUuid);
  }

  async findParticipantsByCity(cityName: string): Promise<any> {
    return await this._participantRepository.selectByCity(cityName);
  }

  async setParticipantToGroup(
    uuid: string,
    groupUuid: string,
    force: boolean
  ): Promise<any> {
    return await this._participantRepository.setGroup(uuid, groupUuid, force);
  }

  async unsetParticipantFromGroup(uuid: string): Promise<any> {
    return await this._participantRepository.unsetGroup(uuid);
  }

  /**
   * Adds a single new participant.
   * @param participant - an object containing new participant's obligatory data
   * @returns - the data of Participant successfully saved into the database
   */
  async addNewParticipant(participant: Participant): Promise<any> {
    return await this._participantRepository.insertOne(participant);
  }

  /**
   * Adds new participants in bulk.
   * @param participants - an array of objects describing particular participants
   * @returns - number of added participants
   */
  async addNewParticipants(participants: Participant[]): Promise<number> {
    return await this._participantRepository.insertMany(participants);
  }
}
