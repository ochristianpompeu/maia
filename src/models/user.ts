import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export { User };

