import { Schema } from "mongoose";

const professionalSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        }
    }
)