import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, user } = await request.json();
  await connectMongoDB();
  await User.create({
    email,
    name,
    user,
  });
  return NextResponse.json(
    {
      message: "Usuario registrado",
    },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();

  return NextResponse.json({ users });
}
