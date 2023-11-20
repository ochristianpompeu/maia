import { connectMongoDB } from "@/lib/mongodb";
import { Hour } from "@/models/hour";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  const { userId } = params;
  await connectMongoDB();

  const hours = await Hour.find({
    userAdmin: userId,
  }).sort({
    orgId: 1,
    day: 1,
    professionalId: 1,
    serviceId: 1,
  });

  return NextResponse.json({ hours }, { status: 200 });
}
