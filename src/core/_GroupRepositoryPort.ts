import GroupResult from "./domain/GroupResult";

/**
 * An abstract class describing the expected behavior of TestRepository implementations
 */
export default interface GroupRepositoryPort {
    selectByTestId(id: String): Promise<GroupResult>;
}