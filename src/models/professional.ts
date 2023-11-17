import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

const professionalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orgId: {
      type: ObjectId,
      required: false,
      ref: "Organization",
    },
    bio: { type: String, required: false },
    email: {
      type: String,
      required: false,
    },
    function: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    services: [{ type: ObjectId, required: false, ref: "Service" }],
    completeServices: [{ type: Object, require: false }],
  },
  {
    timestamps: true,
  }
);

const Professional =
  models.Professional || mongoose.model("Professional", professionalSchema);
export { Professional };

