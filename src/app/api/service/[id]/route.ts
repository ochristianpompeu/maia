import { connectMongoDB } from "@/lib/mongodb";
import { Service } from "@/models/service";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    newName: name,
    newDescription: description,
    newOrgId: orgId,
  } = await request.json();
  await connectMongoDB();

  await Service.findByIdAndUpdate(id, {
    name: name,
    description: description,
    orgId: orgId,
  });
  return NextResponse.json(
    {
      message: "Serviço atualizado.",
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
  const service = await Service.findOne({
    _id: id,
  });
  return NextResponse.json({ service }, { status: 200 });
}
