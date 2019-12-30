import mongoose from "mongoose";
import Participant from "../domain/Participant";

const ParticipantSchema: mongoose.Schema<Participant> = new mongoose.Schema(
  {
    uuid: { type: String, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    qualifyingPoints: { type: Number, required: true },
    description: [
      {
        type: String,
        required: true
      }
    ],
    mentorPreferences: { type: String, required: true },
    groupUuid: String
  },
  { timestamps: true }
);

export default mongoose.model("participant", ParticipantSchema);
