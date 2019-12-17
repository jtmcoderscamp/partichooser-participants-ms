import mongoose, { Schema, Document } from "mongoose";
import Group from "../../core/domain/Group";

interface GroupDocument extends Document, Group {

}

const groupSchemaDefinition = {
    uuid:{
        type:String,
        unique:true,
        required:true
    },
    mentors: [
        {
            type: String,
            unique: true
        }
    ]
}

const groupSchema = new Schema(groupSchemaDefinition,{strict: false});

const GroupDocumentModel = mongoose.model<GroupDocument>("Group",groupSchema);

export default GroupDocumentModel;