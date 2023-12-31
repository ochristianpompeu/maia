import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Conectado com mongoDB");
  } catch (error) {
    console.log("Erro ao conectar mongoDB: ", error);
  }
}
