import { OrgProps, ServiceProps } from "@/lib/interfaces";
import { connectMongoDB } from "@/lib/mongodb";
import { Organization } from "@/models/organization";
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
  interface LoocalServices extends ServiceProps {
    org: OrgProps;
  }

  await connectMongoDB();
  const services = await Service.find();
  const localServices: LoocalServices[] = [];

  for (const service of services) {
    const res = await Organization.findById(service.orgId);
    localServices.push({
      _id: service._id,
      name: service.name,
      description: service.description,
      org: res,
    });
  }
  return NextResponse.json({
    localServices,
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
