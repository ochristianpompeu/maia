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
    professionals: [{ type: ObjectId, required: false, ref: "Professional" }],
  },
  {
    timestamps: true,
  }
);

const Service = models.Service || mongoose.model("Service", serviceSchema);
export { Service };

