import ParticipantResult from "./domain/ParticipantResult";

/**
 * An abstract class describing the expected behavior of TestService implementations
 */
export default interface TestServicePort {
    findTestResult(participantId: String): Promise<ParticipantResult>;
}