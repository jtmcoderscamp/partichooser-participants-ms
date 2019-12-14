import ParticipantResult from "./domain/ParticipantResult";
import GroupResult from "./domain/GroupResult";

/**
 * An abstract class describing the expected behavior of TestService implementations
 */
export default interface TestServicePort {
    findTestResult(participantId: String): Promise<ParticipantResult>;
    findTestResult(groupId: String): Promise<GroupResult>;
}