import { connectMongoDB } from "@/lib/mongodb";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, nome, usuario } = await request.json();
  await connectMongoDB();
  await Usuario.create({
    email,
    nome,
    usuario,
  });
  return NextResponse.json(
    {
      message: "Usuario registrado",
    },
    { status: 201 }
  );
}
