import { connectMongoDB } from "@/lib/mongodb";
import { Organization } from "@/models/organization";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { userAdmin: string };
  }
) {
  const { userAdmin } = params;
  await connectMongoDB();
  // if (userAdmin === undefined) {
  //   return NextResponse.json({ orgs: {} }, { status: 200 });
  // }
  const orgs = await Organization.find({
    userAdmin: userAdmin,
  });
  return NextResponse.json({ orgs }, { status: 200 });
}
