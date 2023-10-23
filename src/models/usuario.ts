import mongoose, { Schema, models } from "mongoose";

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

const Usuario = models.Usuario || mongoose.model("Usuario", usuarioSchem);
export default Usuario;
