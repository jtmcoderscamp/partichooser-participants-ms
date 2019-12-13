import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    birthDate: String,
    city: String,
    email: String,
    qualifyingPoints: Number,
    description: [
      {
        type: String
      }
    ],
    mentorPreferences: String,
    groupUuid: String
  },
  { timestamps: true }
);

export default mongoose.model("Participant", ParticipantSchema);
