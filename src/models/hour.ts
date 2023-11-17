import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

const hourSchema = new Schema({
  day: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  orgId: {
    type: ObjectId,
    required: false,
    ref: "Organization",
  },
  org: {
    type: Object,
    required: false,
  },
  serviceId: {
    type: ObjectId,
    required: false,
    ref: "Service",
  },
  service: {
    type: Object,
    required: false,
  },
  professionalId: {
    type: ObjectId,
    required: false,
    ref: "Professional",
  },
  professional: {
    type: Object,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: "free",
  },
  clientId: {
    type: ObjectId,
    required: false,
    ref: "User",
  },
  client: {
    type: Object,
    required: false,
  },
});

const Hour = models.Hour || mongoose.model("Hour", hourSchema);
export { Hour };

