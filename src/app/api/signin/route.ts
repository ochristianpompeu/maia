import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const encryptedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      name: name,
      email: email,
      user: email,
      password: encryptedPassword,
    });

    return NextResponse.json(
      {
        message: " Usuário cadastrado com sucesso",
        data: {
          name: name,
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
