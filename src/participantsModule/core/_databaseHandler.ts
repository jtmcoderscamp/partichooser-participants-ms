import Participant from "./domain/Participant";


export default interface databaseHandler {
    
    addParticipant(parti: Participant): Promise<String>;
    findParticipant(id: String): Promise<String>;  
    getAllParticipants(): Promise<Participant>;
    findCity(cityName: String): Promise<Participant>;
    
}
