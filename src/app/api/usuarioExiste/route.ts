import { connectMongoDB } from "@/lib/mongodb";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { email } = await request.json();
    const usuario = await Usuario.findOne({ email: email }).select("_id");
    return NextResponse.json({ usuario });
  } catch (error) {
    return NextResponse.json({
      message:
        "Ocorreu erro na rota /api/usuarioExiste, não foi possível identificar o usuario",
      erro: error,
    });
  }
}
