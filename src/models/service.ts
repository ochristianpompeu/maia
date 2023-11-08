import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    orgId: {
      type: ObjectId,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Service = models.Service || mongoose.model("Service", serviceSchema);
export { Service };

