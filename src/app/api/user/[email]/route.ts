import { connectMongoDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { email: string };
  }
) {
  const { email } = params;

  await connectMongoDB();
  
  const user = await User.findOne({
    email: email,
  });

  return NextResponse.json(
    { user },
    {
      status: 200,
    }
  );
}
