import { connectMongoDB } from "@/lib/mongodb";
import { Service } from "@/models/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, description, orgId } = await request.json();

  await connectMongoDB();

  await Service.create({
    name: name,
    description: description,
    orgId: orgId,
  });

  return NextResponse.json(
    {
      message: "Serviço cadastrado.",
    },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const services = await Service.find();
  return NextResponse.json({
    services,
  });
}

export async function DELETE(request: NextRequest) {
  const serviceId = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Service.findByIdAndDelete(serviceId);
  return NextResponse.json(
    {
      message: "Serviço removido.",
    },
    { status: 200 }
  );
}
