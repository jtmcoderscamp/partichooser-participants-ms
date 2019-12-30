import databaseHandler from "./_databaseHandler";
import Participant from "./domain/Participant";
import { type } from "os";
const mongoose = require("mongoose");

export default class dbHandler implements databaseHandler{

    constructor(connectionUrl: String){
        mongoose.connect(connectionUrl) //default url mongodb://localhost/partichooser
	.then(() => console.log("connected to mognodb"))
	.catch((err: any) => console.error("couldnt connect to mongo", err));

    };

    
    participantSchema = new mongoose.Schema({
	
        uuid: String,
        name: String,
        surname: String,
        city: String,
        email: String,
        qualifyingPoints: Number,
        description: String,
        mentorPreferences: String,
        groupUuid: String
})

    Parti = new mongoose.model('Participant', this.participantSchema);

    
    
    async addParticipant(parti: Participant): Promise<String> {
        const participantObject = new this.Parti({
            uuid: parti.uuid,
            name: parti.name, 
            surname: parti.surname, 
            city:parti.city,
            email: parti.email,
            qualifyingPoints: parti.qualifyingPoints, 
            description: parti.description,
            mentorPreferences: parti.mentorPreferences,
            groupUuid: parti.groupUuid
        });
        const result = await participantObject.save();
        return result;
        
    }

    async udpateGroup(participantId:String, groupId:String){
        
        const result = await this.Parti.update({uuid: participantId}, {
            $set: {
                groupUuid: groupId
            }
        });
        return result;
    }

    async findParticipant(id: String){
        let partic = await this.Parti.find({uuid: id});
        return partic;
    }
   
    async getAllParticipants() {
        let participants = await this.Parti.find();
        return participants;
    }

    async findGroup(groupId: string){
        let participants = await this.Parti.find({groupUuid:groupId});
        return participants;
    }

    async findCity(cityName: string){
        let participants = await this.Parti.find({city:cityName});
        return participants;
    }
}