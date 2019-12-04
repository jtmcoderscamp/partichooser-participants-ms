import TestServicePort from "./_TestServicePort";
import TestRepositoryPort from "./_TestRepositoryPort";

export default class TestService implements TestServicePort {
    private _repository: TestRepositoryPort;

    constructor(testRepository: TestRepositoryPort) {
        this._repository = testRepository;
    }

    async findTestResult(testId: String) {
        const result = await this._repository.selectByTestId(testId);
        return result;
    }
}