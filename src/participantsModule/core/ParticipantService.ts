import ParticipantServicePort from "./_ParticipantServicePort";
import ParticipantRepositoryPort from "./_ParticipantRepositoryPort";
import Participant from "./domain/Participant";
import uuid4 from "uuid/v4";

export default class ParticipantService implements ParticipantServicePort {
  private _participantRepository: ParticipantRepositoryPort;

  constructor(participantRepository: ParticipantRepositoryPort) {
    this._participantRepository = participantRepository;
  }

  async findAllParticipants(): Promise<Participant[]> {
    return await this._participantRepository.selectAll();
  }

  async findParticipantByUuid(uuid: string): Promise<Participant> {
    return await this._participantRepository.selectByUuid(uuid);
  }

  async findParticipantsByGroup(groupUuid: string): Promise<Participant[]> {
    return await this._participantRepository.selectByGroup(groupUuid);
  }

  async findParticipantsByCity(cityName: string): Promise<Participant[]> {
    return await this._participantRepository.selectByCity(cityName);
  }

  async addParticipantToGroup( uuid: string, groupUuid: string, force?: boolean ): Promise<Participant> {
    return await this._participantRepository.setGroup(uuid, groupUuid, force);
  }

  async unsetParticipantFromGroup(uuid: string): Promise<Participant> {
    return await this._participantRepository.unsetGroup(uuid);
  }

  /**
   * Adds a single new participant.
   * @param participant - an object containing new participant's obligatory data
   * @returns - the data of Participant successfully saved into the database
   */
  async addNewParticipant(participant: Participant): Promise<Participant> {
    participant.uuid = uuid4();
    console.log(participant);
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
