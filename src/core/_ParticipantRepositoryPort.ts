import ParticipantResult from "./domain/ParticipantResult";

/**
 * An abstract class describing the expected behavior of TestRepository implementations
 */
export default interface ParticipantRepositoryPort {
    selectByTestId(id: String): Promise<ParticipantResult>;
}