import { connectMongoDB } from "@/lib/mongodb";
import { Organization } from "@/models/organization";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { newName: name } = await request.json();
  await connectMongoDB();

  await Organization.findByIdAndUpdate(id, {
    name: name,
  });
  return NextResponse.json(
    {
      message: "Organização atualizada",
    },
    {
      status: 200,
    }
  );
}

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  await connectMongoDB();
  const org = await Organization.findOne({
    _id: id,
  });
  return NextResponse.json({ org }, { status: 200 });
}
