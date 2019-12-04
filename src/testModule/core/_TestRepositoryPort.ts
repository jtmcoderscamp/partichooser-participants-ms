import TestResult from "./domain/TestResult";

/**
 * An abstract class describing the expected behavior of TestRepository implementations
 */
export default interface TestRepositoryPort {
    selectByTestId(id: String): Promise<TestResult>;
}