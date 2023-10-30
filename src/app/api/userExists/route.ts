import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { email } = await request.json();
    const user = await User.findOne({ email: email }).select("_id");
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({
      message:
        "Ocorreu erro na rota /api/userExists, não foi possível identificar o user",
      erro: error,
    });
  }
}
