import TestResult from "./domain/TestResult";

/**
 * An abstract class describing the expected behavior of TestService implementations
 */
export default interface TestServicePort {
    findTestResult(testId: String): Promise<TestResult>;
}