import TestRepositoryPort from "../core/_TestRepositoryPort";
import TestResult from "../core/domain/TestResult";

export default class MockTestRepository implements TestRepositoryPort {
    private _testResultsInDatabase: { [key: string]: String} = {
        test1: "First test's result",
        test2: "Second test's result",
        test3: "Third test's result"
    };

    constructor() {
    }

    async selectByTestId(id: String): Promise<TestResult> {
        const resultRetrievedFromDb = this._testResultsInDatabase[id.toString()];
        if (resultRetrievedFromDb) {
            return new TestResult(resultRetrievedFromDb);
        } else throw new Error(`No results for id ${id}`);
    }
}