import RepositoryPort from "../core/_ParticipantRepositoryPort";
import ParticipantResult from "../core/domain/ParticipantResult";

export default class ParticipantsTestRepository implements RepositoryPort {
    private _testResultsInDatabase: { [key: string]: String} = {
        participant1: "P1 test's result",
        participant2: "P2 test's result",
        participant3: "P3 test's result"
    };

    constructor() {
    }

    async selectByTestId(id: String): Promise<ParticipantResult> {
        const resultRetrievedFromDb = this._testResultsInDatabase[id.toString()];
        if (resultRetrievedFromDb) {
            return new ParticipantResult(resultRetrievedFromDb);
        } else throw new Error(`No results for id ${id}`);
    }
}