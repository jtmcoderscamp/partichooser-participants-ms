import ServicePort from "./_ServicePort";
import RepositoryPort from "./_RepositoryPort";

export default class Service implements ServicePort {
    private _repository: RepositoryPort;

    constructor(testRepository: RepositoryPort) {
        this._repository = testRepository;
    }

    async findTestResult(participantId: String) {
        const result = await this._repository.selectByTestId(participantId);
        return result;
    }
}