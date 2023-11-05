import mongoose, { Schema, models } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // userAdmin: {
    //   type: ObjectId,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Organization =
  models.Organization || mongoose.model("Organization", organizationSchema);
export { Organization };

