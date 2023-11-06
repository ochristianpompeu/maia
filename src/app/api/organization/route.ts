import { connectMongoDB } from "@/lib/mongodb";
import { Organization } from "@/models/organization";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();

  await connectMongoDB();

  await Organization.create({
    name: name,
  });

  return NextResponse.json(
    {
      message: "Empresa cadastrada",
    },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const orgs = await Organization.find();
  return NextResponse.json({
    orgs
  });
}

export async function DELETE(request: NextRequest) {
  const orgId = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Organization.findByIdAndDelete(orgId);
  return NextResponse.json(
    {
      message: "Organização removida",
    },
    { status: 200 }
  );
}
