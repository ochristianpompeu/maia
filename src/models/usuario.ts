import mongoose, { Schema, models } from "mongoose";

const usuarioSchema = new Schema(
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
    senha:{
      type: String,
      require: false
    }
  },
  { timestamps: true }
);

const Usuario = models.Usuario || mongoose.model("Usuario", usuarioSchema);
export default Usuario;
