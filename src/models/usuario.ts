import mongoose, { Schema } from "mongoose";

const usuarioSchem = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
