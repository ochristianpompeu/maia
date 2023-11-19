import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";
 
const HourIntervalSchema = new Schema({
  start: { type: Date, required: false },
  end: { type: Date, required: false },
  status: {
    type: String,
    required: false,
    default: "free",
  },
  clientId: {
    type: ObjectId,
    required: false,
    ref: "User",
    default: null,
  },
  client: {
    type: Object,
    required: false,
    default: {
      _id: null,
      email: null,
      name: null,
      user: null,
      password: null,
      createdAt: null,
      updatedAt: null,
      __v: 0,
    },
  },
});

const hourSchema = new Schema(
  {
    day: {
      type: Date,
      required: true,
    },
    interval: [HourIntervalSchema],
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
  },
  {
    timestamps: true,
  }
);

const Hour = models.Hour || mongoose.model("Hour", hourSchema);
export { Hour };

