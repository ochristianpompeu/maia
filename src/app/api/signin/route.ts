import { connectMongoDB } from "@/lib/mongodb";
import Usuario from "@/models/usuario";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json();
    const senhaEncriptada = await bcrypt.hash(senha, 10);
    await connectMongoDB();
    await Usuario.create({
      nome: nome,
      email: email,
      usuario: email,
      senha: senhaEncriptada,
    });

    return NextResponse.json(
      {
        message: " Usuário cadastrado com sucesso",
        data: {
          nome: nome,
          email: email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Um erro ocorreu ao cadastrar o usuário", error },
      { status: 500 }
    );
  }
}
