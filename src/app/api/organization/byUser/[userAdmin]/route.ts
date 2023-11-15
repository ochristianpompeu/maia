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
  const orgs = await Organization.find({
    userAdmin: userAdmin,
  });
  if (!orgs) {
    return NextResponse.json(
      {
        orgs: [
          {
            _id: "",
            name: "",
            description: "",
            userAdmin: "",
            createdAt: "",
            updatedAt: "",
            __v: 0,
          },
        ],
      },
      { status: 200 }
    );
  }
  return NextResponse.json({ orgs }, { status: 200 });
}
