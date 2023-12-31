import { ObjectId } from "mongodb";
import mongoose, { Schema, models } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    userAdmin: {
      type: ObjectId,
      required: false,
      ref: "User"
    },
  },
  { timestamps: true }
);

const Organization =
  models.Organization || mongoose.model("Organization", organizationSchema);
export { Organization };

